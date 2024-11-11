// pages/index.tsx
import dynamic from "next/dynamic";
import MainScreen from "./components/Main-screen/Main-screen";
import ServicesScreen from "./components/Services-screen/Services-screen";
import CloudIconOne from "@/svg/cloudIcons/CloudIconOne";
import CloudIconTwo from "@/svg/cloudIcons/CloudIconTwo";
import CloudIconThree from "@/svg/cloudIcons/CloudIconThree";
import CloudIconFour from "@/svg/cloudIcons/CloudIconFour";
import SvgComponent from "@/ui/SvgComponent/SvgComponent";

const elementsData = [
  {
    element: <CloudIconOne />,
    top: "0",
    left: "70",
    id: "cloud-icon-1",
    renderIn: ".main-screen",
  },
  {
    element: <CloudIconTwo />,
    top: "93%",
    left: "0",
    relativeTo: "main",
    id: "cloud-icon-2",
  },
  {
    element: <SvgComponent svgContent={<CloudIconThree />} />,
    top: "93%",
    right: "20",
    relativeTo: "main",
    id: "cloud-icon-3",
  },
  {
    element: <SvgComponent svgContent={<CloudIconFour />} />,
    top: "73%",
    left: "28%",
    id: "cloud-icon-4",
    zIndex: "1",
    renderIn: ".services-screen",
  },
];

// Динамически импортируем компонент ClientSideElements, чтобы он не рендерился на сервере
const ClientSideElements = dynamic(
  () => import("../../components/ClientSideElements/ClientSideElements"),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="main-container">
      <MainScreen />
      <ServicesScreen />

      <ClientSideElements elementsData={elementsData} />
    </main>
  );
}
