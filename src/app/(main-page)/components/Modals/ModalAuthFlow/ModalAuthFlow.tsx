import React, { useState } from "react";
import block from "bem-cn-lite";
import { AnimatePresence, motion } from "framer-motion";
import CodeVerificationTemplate from "../CodeVerificationTemplate/CodeVerificationTemplate";
import ModalLoginTemplate from "../ModalLoginTemplate/ModalLoginTemplate";

const b = block("modal-auth-flow");

interface ModalAuthFlowProps {
  chatId: string;
}

interface CodeScreen {
  isCodeScreen: boolean;
  email: string;
  chatId?: string;
}

const ModalAuthFlow: React.FC<ModalAuthFlowProps> = ({chatId}) => {
  const [codeScreen, setCodeScreen] = useState<CodeScreen>({
    isCodeScreen: !!chatId,
    email: "",
    chatId: chatId,
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
          {!codeScreen.isCodeScreen ? (
            <CodeVerificationTemplate
              onBack={setEmailScreenHandler}
              email={codeScreen.email}
              chatId={chatId}
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
