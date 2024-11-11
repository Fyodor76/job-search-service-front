import { FC, ReactNode } from "react";
import block from "bem-cn-lite";
import "./SvgComponent.scss";

interface SvgComponentProps {
  svgContent: ReactNode;
  className?: string;
}

const b = block("responsive-svg");

const SvgComponent: FC<SvgComponentProps> = ({ svgContent, className }) => {
  return <div className={b(null, [className || ""])}>{svgContent}</div>;
};

export default SvgComponent;
