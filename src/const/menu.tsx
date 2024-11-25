import { ContactsIconSidebar } from "@/svg/ContactsIconSidebar";
import { HomeIconSidebar } from "@/svg/HomeIconSidebar";
import { HrIconSidebar } from "@/svg/HrIconSidebar";
import { LandingIconSidebar } from "@/svg/LandingIconSidebar";
import { QuesiontIconSidebar } from "@/svg/QuestionIconSidebar";
import { ResumeIconSidebar } from "@/svg/ResumeIconSidebar";
import { ReactNode } from "react";

interface MenuType {
  href: string;
  title: string;
  icon: ReactNode;
}

export const menu: MenuType[] = [
  {
    href: "/",
    title: "Главная",
    icon: <HomeIconSidebar />,
  },
  {
    href: "",
    title: "Создание резюме",
    icon: <ResumeIconSidebar />,
  },
  {
    href: "",
    title: "Консультация HR",
    icon: <HrIconSidebar />,
  },
  {
    href: "",
    title: "Лендинг",
    icon: <LandingIconSidebar />,
  },
  {
    href: "",
    title: "FAQ",
    icon: <QuesiontIconSidebar />,
  },
  {
    href: "",
    title: "Контакты",
    icon: <ContactsIconSidebar />,
  },
];
