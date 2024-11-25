"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import block from "bem-cn-lite";
import { InstagramIcon } from "@/svg/InstagramIcon";
import { VkIcon } from "@/svg/VkIcon";
import { CrossIcon } from "@/svg/CrossIcon";
import { TelegramIconSidebar } from "@/svg/TelegramIconSidebar";

const b = block("sidebar");

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={b("overlay")}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={b("container")}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={b("content")}>
              <button className="modal-close-btn" onClick={onClose}>
                <CrossIcon />
              </button>
              <ul className={b("menu")}>
                <li>Главная</li>
                <li>Создание резюме</li>
                <li>Консультация HR</li>
                <li>Лендинг</li>
                <li>FAQ</li>
                <li>Контакты</li>
              </ul>
              <div className={b("contacts")}>
                <div>
                  <p>+7 (999) 999-99-99</p>
                </div>
                <div className={b("icons")}>
                  <InstagramIcon />
                  <VkIcon />
                  <TelegramIconSidebar />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
