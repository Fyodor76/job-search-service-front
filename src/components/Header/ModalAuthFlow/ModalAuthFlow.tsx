import React, { useState } from "react";
import ModalLoginTemplate from "@/templates/ModalLoginTemplate/ModalLoginTemplate";
import CodeVerificationTemplate from "@/templates/CodeVerificationTemplate/CodeVerificationTemplate";
import block from "bem-cn-lite";
import { AnimatePresence, motion } from "framer-motion";

const b = block("modal-auth-flow");

interface CodeScreen {
  isCodeScreen: boolean;
  email: string;
}

const ModalAuthFlow: React.FC = () => {
  const [codeScreen, setCodeScreen] = useState<CodeScreen>({
    isCodeScreen: false,
    email: "",
  });

  const setCodeScreenHandler = (email: string) => {
    setCodeScreen({ isCodeScreen: true, email: email });
  };

  const setEmailScreenHandler = () =>
    setCodeScreen({ isCodeScreen: false, email: "" });

  return (
    <div
      className={b()}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={codeScreen.isCodeScreen ? "codeScreen" : "loginScreen"}
          initial={{ opacity: 0, x: codeScreen.isCodeScreen ? 200 : -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: codeScreen.isCodeScreen ? -200 : 200 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {codeScreen.isCodeScreen ? (
            <CodeVerificationTemplate
              onBack={setEmailScreenHandler}
              email={codeScreen.email}
            />
          ) : (
            <ModalLoginTemplate setCodeScreenHandler={setCodeScreenHandler} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ModalAuthFlow;
