// pages/index.tsx
import MainScreen from "./components/Main-screen/Main-screen";
import ServicesScreen from "./components/Services-screen/Services-screen";

export default async function Home(): Promise<JSX.Element> {
  return (
    <main className="main-container">
      <MainScreen />
      <ServicesScreen />
    </main>
  );
}
