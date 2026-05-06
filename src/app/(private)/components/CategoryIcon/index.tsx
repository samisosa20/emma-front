"use client";
import React from "react";

interface CategoryIconProps {
  icon?: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const CategoryIcon = ({
  icon,
  color = "#625b71", // Default color if none provided
  size = "md",
  className = "",
}: CategoryIconProps) => {
  const sizeClasses = {
    xs: {
      container: "w-6 h-6",
      icon: "!text-sm",
    },
    sm: {
      container: "w-8 h-8",
      icon: "!text-lg",
    },
    md: {
      container: "w-12 h-12",
      icon: "!text-2xl",
    },
    lg: {
      container: "w-16 h-16",
      icon: "!text-3xl",
    },
  };

  const selectedSize = sizeClasses[size];
  const iconName = icon && !icon.startsWith("Pi") ? icon : "category";

  return (
    <div
      className={`${selectedSize.container} rounded-full flex items-center justify-center shrink-0 ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      <span className={`material-symbols-outlined filled ${selectedSize.icon}`}>
        {iconName}
      </span>
    </div>
  );
};

export default CategoryIcon;
