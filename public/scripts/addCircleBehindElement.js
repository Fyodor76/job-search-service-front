const addCircleBehindElement = (selector, options = {}) => {
  // Опции для кружка с дефолтными значениями
  const {
    size = 50, // Размер кружка (ширина и высота)
    color = "red", // Цвет кружка
    offsetX = 0, // Смещение по X
    offsetY = 0, // Смещение по Y
    zIndex = -1, // Z-индекс (чтобы быть "за" элементом)
  } = options;

  // Находим элемент по селектору
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Элемент с селектором "${selector}" не найден.`);
    return;
  }

  // Создаем кружок
  const circle = document.createElement("div");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.backgroundColor = color;
  circle.style.position = "absolute";
  circle.style.borderRadius = "50%";
  circle.style.zIndex = zIndex;

  // Вставляем кружок в документ
  element.style.position = "relative"; // Чтобы элемент был как точка отсчета
  element.appendChild(circle);

  // Получаем координаты элемента и настраиваем позицию кружка
  const rect = element.getBoundingClientRect();
  circle.style.left = `${rect.width / 2 - size / 2 + offsetX}px`;
  circle.style.top = `${rect.height / 2 - size / 2 + offsetY}px`;
};

addCircleBehindElement(".header", {
  size: 80,
  color: "blue",
  offsetX: 10,
  offsetY: 5,
  zIndex: -1,
});
