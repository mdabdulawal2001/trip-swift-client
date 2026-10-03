"use client";

import Image from "next/image";
import { useState } from "react";

const UserAvatar = ({ user, size = "sm" }) => {
  const [failedImage, setFailedImage] = useState(null);
  const sizeClasses = {
    sm: "h-9 w-9 text-sm",
    md: "h-11 w-11 text-base",
    lg: "h-16 w-16 text-xl",
  };

  const firstLetter = user?.name?.trim().charAt(0)?.toUpperCase() || "U";
  const showImage = user?.image && user.image !== failedImage;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#238FD7] to-[#55A9D8] font-bold text-white ${sizeClasses[size]}`}
    >
      {showImage ? (
        <Image
          referrerPolicy="no-referrer"
          src={user?.image}
          key={user.image}
          alt={user?.name || "User"}
          fill
          unoptimized
          onError={() => setFailedImage(user.image)}
          className="object-cover"
        />
      ) : (
        <span>{firstLetter}</span>
      )}
    </div>
  );
};

export default UserAvatar;