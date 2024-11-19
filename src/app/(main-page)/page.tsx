// pages/index.tsx
import dynamic from "next/dynamic";
import MainScreen from "./components/Main-screen/Main-screen";
import ServicesScreen from "./components/Services-screen/Services-screen";
import { elementsData } from "@/const/mainPageCloudsIcons";

// Динамически импортируем компонент ClientSideElements, чтобы он не рендерился на сервере
const ClientSideElements = dynamic(
  () => import("../../components/ClientSideElements/ClientSideElements"),
  { ssr: false },
);

export default async function Home(): Promise<JSX.Element> {
  return (
    <main className="main-container">
      <MainScreen />
      <ServicesScreen />
      <ClientSideElements elementsData={elementsData} />
    </main>
  );
}
