// pages/index.tsx
import dynamic from "next/dynamic";
import MainScreen from "./components/Main-screen/Main-screen";
import ServicesScreen from "./components/Services-screen/Services-screen";
import { checkAuth } from "@/helpers/auth";
import { elementsData } from "@/const/mainPageCloudsIcons";
import { TestComponent } from "./components/Main-screen/TestComponents";

// Динамически импортируем компонент ClientSideElements, чтобы он не рендерился на сервере
const ClientSideElements = dynamic(
  () => import("../../components/ClientSideElements/ClientSideElements"),
  { ssr: false },
);

export default async function Home(): Promise<JSX.Element> {
  const { isAuth, userData } = await checkAuth();

  return (
    <main className="main-container">
      <TestComponent isAuth={isAuth} />
      <MainScreen />
      <ServicesScreen />
      <ClientSideElements elementsData={elementsData} />
    </main>
  );
}
