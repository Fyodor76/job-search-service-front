import React, { useState } from "react";
import { Tooltip } from "react-tooltip"; // Импорт компонента Tooltip

interface ITooltipWrapper {
  tooltipId?: string;
  children: React.ReactNode;
  className?: string;
  place?: string; // Можно использовать для указания позиции тултипа
  content: React.ReactNode; // Контент тултипа (можно передавать JSX)
  delayShow?: number; // Задержка перед показом
  delayHide?: number; // Задержка перед скрытием
}

const TooltipComponent = ({
  tooltipId = "auth-data",
  children,
  className,
  content,
  delayShow = 200,
  delayHide = 500,
}: ITooltipWrapper) => {
  const [isHovered, setIsHovered] = useState(false);

  // Обработчик для предотвращения скрытия тултипа
  const handleMouseEnter = () => {
    setIsHovered(true); // Тултип не будет скрываться
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Тултип скрывается, когда курсор уходит
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Тултип с настройками для задержек и обработчиками */}
      <Tooltip
        id={tooltipId}
        delayShow={delayShow}
        delayHide={delayHide}
        place="top"
        content={String(content)} // Просто передаем content как есть
        // Не используем `visible` — тултип будет управляться через события мыши
      >
        {children} {/* Здесь обернуты дочерние элементы */}
      </Tooltip>
    </div>
  );
};

export default TooltipComponent;
