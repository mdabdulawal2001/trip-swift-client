"use client";

import Image from "next/image";
import { useState } from "react";

const UserAvatar = ({ user, size = "sm" }) => {
  const [imageError, setImageError] = useState(false);
  const sizeClasses = {
    sm: "h-9 w-9 text-sm",
    md: "h-11 w-11 text-base",
    lg: "h-16 w-16 text-xl",
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const showImage = user?.image && !imageError;


  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-cyan-400 to-blue-600 font-bold text-white ${sizeClasses[size]}`}
    >
      {showImage ? (
        <Image
          referrerPolicy="no-referrer"
          src={user?.image}
          alt={user?.name || "User"}
          fill
          onError={() => setImageError(true)}
          className="object-cover"
        />
      ) : (
        <span>{firstLetter}</span>
      )}
    </div>
  );
};

export default UserAvatar;