// import React from "react";

// // Ваша SVG иконка как компонент
// const CloudIconOne = () => {
//   return (
//     <svg
//       width="148"
//       height="108"
//       viewBox="0 0 148 108"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M77.1541 -8.03607C94.5757 -10.7438 113.853 -20.8424 127.983 -10.2967C142.644 0.645171 140.421 22.3344 142.241 40.5394C144.385 61.9869 155.622 88.6235 139.276 102.671C122.868 116.771 98.6749 98.6793 77.1541 96.4728C59.6244 94.6756 40.8248 101.497 26.5843 91.1166C10.6403 79.4941 -2.55882 60.0452 0.423382 40.5394C3.26667 21.9423 24.1044 13.4404 39.9985 3.37841C51.3792 -3.82629 63.8449 -5.96747 77.1541 -8.03607Z"
//         fill="#CEF267"
//       />
//     </svg>
//   );
// };

// // Функция для размещения SVG в заданных координатах
// function placeSvgAtPosition(SvgComponent, top, left) {
//   // Создаем контейнер для SVG, если нужно
//   const wrapper = document.createElement("div");

//   // Устанавливаем абсолютное позиционирование для контейнера
//   wrapper.style.position = "absolute";
//   wrapper.style.top = `${top}px`;
//   wrapper.style.left = `${left}px`;

//   // Создаем React элемент для вставки на страницу
//   const svgElement = React.createElement(SvgComponent);

//   // Вставляем компонент в контейнер
//   wrapper.appendChild(svgElement);

//   // Добавляем контейнер в body или в нужный элемент
//   document.body.appendChild(wrapper);
// }

// // Пример использования
// placeSvgAtPosition(CloudIconOne, 100, 200); // Указываем координаты для размещения
