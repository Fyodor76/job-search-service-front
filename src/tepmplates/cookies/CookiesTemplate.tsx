"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Portal from "@/components/Portal/Portal";
import Button from "@/ui/Button/Button";
import Link from "next/link";

export const CookiesTemplate = () => {
  const [isCookiesAccepted, setIsCookiesAccepted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  useEffect(() => {
    const accepted = localStorage.getItem("isCookiesAccepted") === "true";
    setIsCookiesAccepted(accepted);
    setIsModalOpen(!accepted);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("isCookiesAccepted", "true");
    setIsCookiesAccepted(true);
    setIsModalOpen(false);
  };

  return (
    <Portal>
      <AnimatePresence>
        {isModalOpen && !isCookiesAccepted && (
          <motion.div
            className="modal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cookies" onClick={(e) => e.stopPropagation()}>
              <p className="cookies__desc">
                Пользуясь нашим сайтом, вы&nbsp;соглашаетесь с&nbsp;тем, что
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  type="application/pdf"
                >
                  {" "}
                  мы&nbsp;используем cookies
                </Link>
                &nbsp;🍪
              </p>
              <Button
                type="button"
                className="cookies__button"
                onClick={handleAcceptCookies}
              >
                Окей
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
