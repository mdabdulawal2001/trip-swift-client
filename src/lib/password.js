
import bcrypt from "bcryptjs";

import {
  createHash,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";

import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

const SCRYPT_CONFIG = {
  N: 16384,
  r: 16,
  p: 1,
  maxmem: 128 * 16384 * 16 * 2,
};

const BCRYPT_ROUNDS = 12;
const BCRYPT_SHA256_PREFIX = "bcrypt-sha256:";

// Normalize passwords consistently.
function normalizePassword(password) {
  return password.normalize("NFKC");
}

// Pre-hash with SHA-256 to avoid bcrypt's 72-byte input limit.
// bcrypt still performs the password hashing.
function prepareBcryptInput(password) {
  return createHash("sha256")
    .update(normalizePassword(password), "utf8")
    .digest("hex");
}

// New passwords are stored using bcrypt.
export async function hashPassword(password) {
  if (typeof password !== "string") {
    throw new Error("Password must be a string");
  }

  const preparedPassword = prepareBcryptInput(password);
  const bcryptHash = await bcrypt.hash(
    preparedPassword,
    BCRYPT_ROUNDS
  );

  return `${BCRYPT_SHA256_PREFIX}${bcryptHash}`;
}

// Verify passwords stored using Better Auth's default scrypt format.
async function verifyLegacyScrypt({ hash, password }) {
  try {
    const parts = hash.split(":");

    if (parts.length !== 2) {
      return false;
    }

    const [salt, keyHex] = parts;

    // Better Auth's existing format uses a 16-byte salt
    // represented as 32 hexadecimal characters and a
    // 64-byte derived key represented as 128 characters.
    if (
      !/^[0-9a-f]{32}$/i.test(salt) ||
      !/^[0-9a-f]{128}$/i.test(keyHex)
    ) {
      return false;
    }

    const expectedKey = Buffer.from(keyHex, "hex");

    const derivedKey = await scrypt(
      normalizePassword(password),
      salt,
      64,
      SCRYPT_CONFIG
    );

    const actualKey = Buffer.from(derivedKey);

    return (
      expectedKey.length === actualKey.length &&
      timingSafeEqual(expectedKey, actualKey)
    );
  } catch {
    return false;
  }
}

// Better Auth calls verify with { hash, password }.
export async function verifyPassword({ hash, password }) {
  if (
    typeof hash !== "string" ||
    typeof password !== "string"
  ) {
    return false;
  }

  // New bcrypt-SHA256 hashes.
  if (hash.startsWith(BCRYPT_SHA256_PREFIX)) {
    const bcryptHash = hash.slice(
      BCRYPT_SHA256_PREFIX.length
    );

    try {
      if (!/^\$2[aby]\$/.test(bcryptHash)) {
        return false;
      }

      return await bcrypt.compare(
        prepareBcryptInput(password),
        bcryptHash
      );
    } catch {
      return false;
    }
  }

  // Support standard bcrypt hashes too, if any were created
  // before adopting the prefixed format.
  if (/^\$2[aby]\$/.test(hash)) {
    try {
      return await bcrypt.compare(password, hash);
    } catch {
      return false;
    }
  }

  // Existing Better Auth scrypt hashes.
  return verifyLegacyScrypt({ hash, password });
}
