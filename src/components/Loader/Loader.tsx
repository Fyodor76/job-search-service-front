// "use client";

// import React, { useEffect, useState } from "react";

// interface LoaderProps {
//   width?: string;
//   height?: string;
//   position?: "static" | "fixed";
//   isLoading?: boolean;
//   style?: React.CSSProperties;
// }

// const Loader: React.FC<LoaderProps> = ({
//   width = "48px",
//   height = "48px",
//   position = "fixed",
//   isLoading = false,
//   style = {},
// }) => {
//   const [loading, setLoading] = useState(isLoading);

//   useEffect(() => {
//     const handleLoaderEvent = (event: CustomEvent<{ isLoading: boolean }>) => {
//       console.log("test", event.detail.isLoading);
//       setLoading(event.detail.isLoading);
//     };

//     window.addEventListener("app-loader", handleLoaderEvent as EventListener);

//     return () => {
//       window.removeEventListener(
//         "app-loader",
//         handleLoaderEvent as EventListener,
//       );
//     };
//   }, []);

//   if (!loading) return null;

//   return (
//     <span className="loader" style={{ width, height, position, ...style }} />
//   );
// };

// export default Loader;

"use client";

import React, { useEffect, useState } from "react";
import "./Loader.scss";

interface LoaderProps {
  width?: string;
  height?: string;
  isLoading?: boolean;
  style?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({
  width = "48px",
  height = "48px",
  isLoading = false,
  style = {},
}) => {
  const [loading, setLoading] = useState(isLoading);
  const [isGlobal, setIsGlobal] = useState(false);

  useEffect(() => {
    const handleLoaderEvent = (
      event: CustomEvent<{ isLoading: boolean; isGlobal: boolean }>,
    ) => {
      setLoading(event.detail.isLoading);
      setIsGlobal(event.detail.isGlobal);
    };

    window.addEventListener("app-loader", handleLoaderEvent as EventListener);

    return () => {
      window.removeEventListener(
        "app-loader",
        handleLoaderEvent as EventListener,
      );
    };
  }, []);

  if (!loading) return null;
  return isGlobal ? (
    <div className={`loader-wrapper ${isGlobal ? "global-loader" : ""}`}>
      <span className="loader" style={{ width, height, ...style }} />
    </div>
  ) : (
    <span
      className="loader"
      style={{ width, height, position: "static", ...style }}
    />
  );
};

export default Loader;
