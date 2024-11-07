"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function UserPage() {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState<string>("16px");
  const [fontFamily, setFontFamily] = useState<string>("Arial");

  const handleElementClick = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedElement(e.currentTarget); // Устанавливаем элемент, на который нажали
    setIsModalOpen(true); // Открываем модальное окно
  };

  const applyStyles = () => {
    if (selectedElement) {
      selectedElement.style.fontSize = fontSize;
      selectedElement.style.fontFamily = fontFamily;
    }
    setIsModalOpen(false); // Закрываем модальное окно после применения стилей
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsModalOpen(false); // Закрываем модальное окно при клике вне его
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <div onClick={handleElementClick} style={{ cursor: "pointer" }}>
        Test 1
      </div>
      <div onClick={handleElementClick} style={{ cursor: "pointer" }}>
        Test 2
      </div>
      <Link href="/">To home page</Link>

      {isModalOpen && (
        <div id="modal-overlay" style={overlayStyle} onClick={handleCloseModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3>Customize Element</h3>
            <div>
              <label>
                Font Size:
                <input
                  type="text"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  placeholder="e.g., 16px"
                />
              </label>
            </div>
            <div>
              <label>
                Font Family:
                <input
                  type="text"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  placeholder="e.g., Arial"
                />
              </label>
            </div>
            <button onClick={applyStyles}>Apply</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Стиль для оверлея (фона) модального окна
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "-200px",
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Стиль для модального окна
const modalStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  zIndex: 1001,
  borderRadius: "8px",
  textAlign: "center",
};
