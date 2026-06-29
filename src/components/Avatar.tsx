import { useState } from "react";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  className?: string;
}

export function Avatar({ src, alt, name, className = "w-12 h-12" }: AvatarProps) {
  const [error, setError] = useState(false);

  const initial = (name || alt || "?").charAt(0).toUpperCase();

  if (!src || error) {
    return (
      <div
        className={`${className} rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold flex items-center justify-center shadow-sm select-none flex-shrink-0`}
        title={alt}
      >
        {initial !== "?" ? (
          <span className="text-sm leading-none">{initial}</span>
        ) : (
          <User className="w-1/2 h-1/2" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`${className} rounded-full object-cover flex-shrink-0`}
      loading="lazy"
    />
  );
}
