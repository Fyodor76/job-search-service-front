// pages/index.tsx
import dynamic from "next/dynamic";
import CloudIconOne from "@/svg/cloudIcons/CloudIconOne";
import CloudIconTwo from "@/svg/cloudIcons/CloudIconTwo";
import MainScreen from "@/app/(main-page)/components/Main-screen/Main-screen";
import ServicesScreen from "@/app/(main-page)/components/Services-screen/Services-screen";

// Динамически импортируем компонент ClientSideElements, чтобы он не рендерился на сервере
const ClientSideElements = dynamic(
  () => import("../../components/ClientSideElements/ClientSideElements"),
  { ssr: false },
);

export default function Home() {
  const elementsData = [
    {
      element: <CloudIconOne />,
      top: 0,
      left: 70,
      id: "cloud-icon-1", // Уникальный id
      renderIn: ".main-screen", // Указываем, что нужно рендерить в элемент с классом .container-1
    },
    {
      element: <CloudIconTwo />,
      top: "95%",
      left: 0,
      relativeTo: "main",
      id: "cloud-icon-2", // Уникальный id
      renderIn: "#custom-container", // Указываем, что нужно рендерить в элемент с id #custom-container
    },
  ];

  return (
    <main className="main-container">
      <MainScreen />
      <ServicesScreen />

      {/* Передаем массив elementsData в ClientSideElements */}
      <ClientSideElements elementsData={elementsData} />
    </main>
  );
}
