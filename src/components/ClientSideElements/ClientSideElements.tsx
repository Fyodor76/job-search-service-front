"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client"; // Импортируем createRoot

interface ElementData {
  element: React.ReactNode; // JSX элемент (например, div, svg, img и т. д.)
  top?: number | string; // Процент или пиксели для отступа сверху
  left?: number | string; // Процент или пиксели для отступа слева
  right?: number | string; // Необязательное поле для отступа справа
  relativeTo?: string; // Класс элемента, относительно которого будет происходить позиционирование
  id?: string; // Уникальный id для элемента (для предотвращения дублирования)
  renderIn?: string; // Селектор родительского блока для рендеринга (например, ".container")
  zIndex?: string;
}

interface ClientSideElementsProps {
  elementsData: ElementData[]; // Массив элементов с координатами
}

const ClientSideElements: React.FC<ClientSideElementsProps> = ({
  elementsData,
}) => {
  useEffect(() => {
    // Функция для отображения элемента в заданных координатах относительно экрана или другого элемента
    const placeElementAtPosition = (
      element: React.ReactNode,
      top?: number | string,
      left?: number | string,
      right?: number | string,
      relativeTo?: string,
      id?: string, // Параметр id для проверки
      renderIn?: string, // Параметр для указания родительского контейнера
      zIndex?: string,
    ) => {
      // Проверяем, если контейнер для элемента уже существует в DOM
      if (id && document.getElementById(id)) {
        return; // Если элемент с таким id уже существует, не рендерим его заново
      }

      // Создаем обертку для каждого элемента
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.zIndex = zIndex || "2";

      // Присваиваем уникальный id (если задан)
      if (id) {
        wrapper.id = id;
      }

      // Если используется позиционирование относительно экрана (проценты), то это можно сразу применить
      if (typeof top === "string" && top.includes("%")) {
        wrapper.style.top = top;
      } else {
        wrapper.style.top = `${top}px`;
      }

      if (typeof left === "string" && left.includes("%")) {
        wrapper.style.left = left;
      } else {
        wrapper.style.left = `${left}px`;
      }

      // Если задан right, применяем его
      if (right !== undefined) {
        if (typeof right === "string" && right.includes("%")) {
          wrapper.style.right = right;
        } else {
          wrapper.style.right = `${right}px`;
        }
      }

      // Если задан класс для позиционирования, ищем его
      let referenceElement = relativeTo
        ? document.querySelector(`.${relativeTo}`)
        : null;

      // Если элемент с таким классом не найден, используем body
      if (!referenceElement) {
        referenceElement = document.body;
      }

      // Если нашли элемент, позиционируем относительно него
      if (referenceElement instanceof HTMLElement) {
        const rect = referenceElement.getBoundingClientRect();
        // Если координаты не заданы в процентах, добавляем смещение относительно найденного элемента
        if (typeof top === "number") {
          wrapper.style.top = `${rect.top + top}px`;
        }
        if (typeof left === "number") {
          wrapper.style.left = `${rect.left + left}px`;
        }
        if (typeof right === "number") {
          wrapper.style.right = `${rect.right + right}px`;
        }
      }

      // По умолчанию добавляем контейнер в body
      let parentElement = document.body;

      // Если задан renderIn, ищем родительский элемент
      if (renderIn) {
        const customParent = document.querySelector(renderIn);
        if (customParent instanceof HTMLElement) {
          parentElement = customParent;
        }
      }

      // Добавляем контейнер в родительский элемент
      parentElement.appendChild(wrapper);

      // Проверяем, что элемент является валидным React элементом перед рендером
      const root = ReactDOM.createRoot(wrapper); // Используем createRoot
      root.render(element as React.ReactElement); // Рендерим элемент через createRoot
    };

    // Проходим по массиву элементов и отрисовываем каждый
    elementsData.forEach(
      ({ element, top, left, right, relativeTo, id, renderIn, zIndex }) => {
        placeElementAtPosition(
          element,
          top,
          left,
          right,
          relativeTo,
          id,
          renderIn,
          zIndex,
        );
      },
    );

    // Этот эффект не зависит от массива, так что следим только за инициализацией
  }, [elementsData]);

  return null; // Этот компонент ничего не рендерит на самой странице
};

export default ClientSideElements;
