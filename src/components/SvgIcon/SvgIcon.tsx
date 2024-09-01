import React from "react";

interface IconProps {
  id: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const SvgIcon: React.FC<IconProps> = ({
  id,
  width = 24,
  height = 24,
  className = "",
  onClick,
}) => {
  return (
    <svg width={width} height={height} className={className} onClick={onClick}>
      <use href={`/symbol-defs.svg#${id}`} />
    </svg>
  );
};

export default SvgIcon;
