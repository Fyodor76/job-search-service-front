import { FormIcon } from "@/svg/FormIcon";
import ServiceBlock from "./ServiceBlock";
import { HrIcon } from "@/svg/HrIcon";
import { LandingIcon } from "@/svg/LandingIcon";
import block from "bem-cn-lite";

const b = block("services-screen");

const ServicesScreen = () => {
  return (
    <div className={b()}>
      <h2>чем мы можем вам помочь</h2>
      <div className={b("blocks")}>
        <ServiceBlock
          title="создание резюме по готовым шаблонам"
          picture={<FormIcon />}
          link="/resume"
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
