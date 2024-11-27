import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerSelector?: string;  
}

const Portal: React.FC<PortalProps> = ({ children, containerSelector }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let targetContainer: HTMLElement | null = null;

    if (containerSelector) {
      targetContainer = document.querySelector(
        containerSelector,
      ) as HTMLElement;
    }

    if (!targetContainer) {
      targetContainer = document.body;
    }
    setContainer(targetContainer);
  }, [containerSelector]);

  if (container) {
    return ReactDOM.createPortal(children, container);
  }

  return null;
};

export default Portal;
