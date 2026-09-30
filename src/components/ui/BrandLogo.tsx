import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function BrandLogo({
  size = "md",
  href = "/products",
  className = "",
}: BrandLogoProps) {
  const dimensions =
    size === "sm"
      ? { width: 36, height: 36, className: "w-8 h-8 sm:w-9 sm:h-9" }
      : size === "lg"
        ? { width: 64, height: 64, className: "w-16 h-16 sm:w-20 sm:h-20" }
        : {
            width: 56,
            height: 56,
            className:
              "w-10 h-10 min-[425px]:w-12 min-[425px]:h-12 sm:w-[52px] sm:h-[52px]",
          };

  const content = (
    <div className={`flex items-center shrink-0 ${className}`}>
      <div
        className={`relative ${dimensions.className} shrink-0 flex items-center justify-center transition-transform hover:scale-105 duration-200`}
      >
        <Image
          src="/Images/logo.png"
          alt="V-Store"
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="shrink-0 flex items-center"
        aria-label="V-Store Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

