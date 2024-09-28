"use client"
import React, { useState, useRef } from 'react';

export default function DraggablePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState({
    element1: { x: 50, y: 50 },
  });

  const draggingElement = useRef<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, element: string) => {
    draggingElement.current = element;
    offset.current = {
      x: e.clientX - positions[element as keyof typeof positions].x,
      y: e.clientY - positions[element as keyof typeof positions].y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingElement.current || !containerRef.current) return;

    const element = draggingElement.current;
    const container = containerRef.current;

    // Новые координаты на основе движения мыши
    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    // Ограничение перемещения внутри контейнера
    const containerRect = container.getBoundingClientRect();
    const elementRect = container.querySelector(`[data-id="${element}"]`)?.getBoundingClientRect();

    if (elementRect) {
      if (newX < 0) newX = 0; // Лево
      if (newY < 0) newY = 0; // Верх
      if (newX + elementRect.width > containerRect.width)
        newX = containerRect.width - elementRect.width; // Право
      if (newY + elementRect.height > containerRect.height)
        newY = containerRect.height - elementRect.height; // Низ
    }

    setPositions((prevPositions) => ({
      ...prevPositions,
      [element]: { x: newX, y: newY },
    }));
  };

  const handleMouseUp = () => {
    draggingElement.current = null;
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '500px',
        height: '500px',
        border: '2px solid black',
        overflow: 'hidden',
      }}
    >
      <div
        data-id="element1"
        onMouseDown={(e) => handleMouseDown(e, 'element1')}
        style={{
          position: 'absolute',
          left: `${positions.element1.x}px`,
          top: `${positions.element1.y}px`,
          backgroundColor: 'lightblue',
          padding: '20px',
          cursor: 'grab',
        }}
      >
        Draggable Element 1
      </div>
    </div>
  );
}
