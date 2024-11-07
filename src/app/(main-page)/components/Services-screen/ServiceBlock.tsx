import { ArrowIcon } from "@/svg/ArrowIcon";
import { FC } from "react";
import block from "bem-cn-lite";
import ClientLink from "./ClientLink";

interface ServiceBlockProps {
  title: string;
  link: string;
  picture: React.ReactNode;
}

const b = block("services-screen");

const ServiceBlock: FC<ServiceBlockProps> = ({ title, link, picture }) => {
  return (
    <section className={b("block")}>
      <ClientLink link={link} />
      <div className={b("title")}>
        <div className={b("text")}>
          <h4>{title}</h4>
        </div>
        <div className={b("arrow-block")}>
          <ArrowIcon />
        </div>
      </div>
      <div className={b("picture-block")}>{picture}</div>
    </section>
  );
};

export default ServiceBlock;
