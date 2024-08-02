"use client";

import React from "react";
interface ButtonProps {
  title?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  isDisabled: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  type = "button",
  isDisabled,
  onClick,
  children,
}) => {
  return (
    <button
      className={className}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {title || children}
    </button>
  );
};

export default Button;
