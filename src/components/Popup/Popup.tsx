import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseIcon?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  showCloseIcon = false,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const handleOverlayClick = (event: MouseEvent) => {
        const overlay = document.querySelector(".popup-overlay");
        if (overlay && !overlay.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener("click", handleOverlayClick);

      return () => {
        document.removeEventListener("click", handleOverlayClick);
      };
    }
  }, [isOpen, onClose]);

  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="popup-content">
            {showCloseIcon && (
              <button className="popup-close-btn" onClick={onClose}>
                &times;
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
