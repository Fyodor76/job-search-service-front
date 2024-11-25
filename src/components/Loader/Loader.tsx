import React from "react";
import "./Loader.scss";

interface LoaderProps {
  width?: string;
  height?: string;
  position?: "static" | "fixed";
  style?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({
  width = "48px",
  height = "48px",
  position = "fixed",
  style = {},
}) => {
  return (
    <span className="loader" style={{ width, height, position, ...style }} />
  );
};

export default Loader;
