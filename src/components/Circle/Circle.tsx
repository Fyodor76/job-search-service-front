import { CSSProperties, FC } from "react";

interface CircleProps {
  width: string;
  height: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color?: string;
  clipTop?: string;
  clipBottom?: string;
  clipPolygon?: string;
  zIndex?: string;
  style?: CSSProperties;
}

const Circle: FC<CircleProps> = ({
  width,
  height,
  top,
  left,
  right,
  bottom,
  color = "#cef267",
  clipTop = "0%",
  clipBottom = "0%",
  clipPolygon,
  zIndex = "-1",
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        top,
        left,
        right,
        bottom,
        backgroundColor: color,
        zIndex: zIndex,
        clipPath: clipPolygon
          ? `polygon(${clipPolygon})`
          : `inset(${clipTop} 0 ${clipBottom} 0)`,
        ...style,
      }}
      className="circle"
    ></div>
  );
};

export default Circle;
