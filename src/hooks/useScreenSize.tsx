import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    screen: "mobile", // начальный тип устройства
    width: 0, // начальная ширина экрана, 0, так как на сервере ее нет
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        setScreenSize({
          screen: width > 1024 ? "desktop" : "mobile", // если ширина больше 1024px, то desktop, иначе mobile
          width: width,
        });
      };

      // Запускаем обработку при монтировании компонента
      handleResize();

      // Добавляем слушатель событий на изменение размера окна
      window.addEventListener("resize", handleResize);

      // Убираем слушатель при размонтировании компонента
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Хук будет срабатывать только при монтировании компонента и изменении размера окна

  return screenSize;
};

export default useScreenSize;
