import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import "./Modal.scss"; // Для стилей

// Типы пропсов для компонента Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Устанавливаем флаг, когда компонент монтируется на клиенте
  }, []);

  const handleClose = () => {
    onClose();
  };

  // Отображаем модальное окно только на клиенте
  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={handleClose}>
              &times;
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
