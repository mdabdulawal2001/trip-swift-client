export const getSafeCallbackUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "/";
  }

  // Prevent protocol-relative URLs
  if (url.startsWith("//")) {
    return "/";
  }

  // Relative internal URL
  if (url.startsWith("/")) {
    return url;
  }

  // Absolute URL
  try {
    const parsedUrl = new URL(url);

    // Only allow same-origin-style path
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch {
    return "/";
  }
};