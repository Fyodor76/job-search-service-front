import React from "react";

interface ClearIconProps {
  onClick?: () => void;
  className?: string;
}

const ClearIcon: React.FC<ClearIconProps> = ({ onClick, className }) => (
  <svg
    onClick={onClick}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    style={{ cursor: "pointer" }}
  >
    <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7a1 1 0 1 0-1.42 1.42l4.88 4.88-4.88 4.88a1 1 0 1 0 1.42 1.42L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.42l-4.88-4.88 4.88-4.88a1 1 0 0 0 0-1.42z" />
  </svg>
);

export default ClearIcon;