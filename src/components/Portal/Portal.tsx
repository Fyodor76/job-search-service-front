import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerSelector?: string;
}

const Portal: React.FC<PortalProps> = ({ children, containerSelector }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (containerSelector) {
      const foundContainer = document.querySelector(
        containerSelector,
      ) as HTMLElement;
      if (foundContainer) {
        setContainer(foundContainer);
      }
    }
  }, [containerSelector]);

  if (container) {
    return ReactDOM.createPortal(children, container);
  }

  return <>{children}</>;
};

export default Portal;
