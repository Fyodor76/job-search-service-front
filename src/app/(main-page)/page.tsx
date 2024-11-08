import Circle from "@/components/Circle/Circle";
import MainScreen from "./components/Main-screen/Main-screen";
import ServicesScreen from "./components/Services-screen/Services-screen";

export default function Home() {
  return (
    <main>
      <MainScreen />
      <Circle
        width="160px"
        height="160px"
        zIndex="2"
        left="-90px"
        style={{ marginTop: "-50px" }}
      />
      <Circle
        width="100px"
        height="100px"
        zIndex="4"
        right="10px"
        style={{ marginTop: "20px" }}
      />
      <ServicesScreen />
    </main>
  );
}
