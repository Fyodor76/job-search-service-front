import { FormIcon } from "@/svg/FormIcon";
import ServiceBlock from "./ServiceBlock";
import { HrIcon } from "@/svg/HrIcon";
import { LandingIcon } from "@/svg/LandingIcon";
import block from "bem-cn-lite";
import Circle from "@/components/Circle/Circle";

const b = block("services-screen");

const ServicesScreen = () => {
  return (
    <div className={b()}>
      <h2 id="services-section">чем мы можем вам помочь</h2>
      <div className={b("blocks")}>
        <ServiceBlock
          title="создание резюме по готовым шаблонам"
          picture={<FormIcon />}
          link="/resume"
        />
        <Circle
          width="160px"
          height="160px"
          zIndex="1"
          left="30%"
          style={{ marginTop: "210px" }}
        />
        <ServiceBlock
          title="консультация с hr по вашей вакансии"
          picture={<HrIcon />}
          link="/resume"
        />
        <ServiceBlock
          title="создание лендинга под ваше резюме"
          picture={<LandingIcon />}
          link="/user-page"
        />
      </div>
    </div>
  );
};

export default ServicesScreen;
