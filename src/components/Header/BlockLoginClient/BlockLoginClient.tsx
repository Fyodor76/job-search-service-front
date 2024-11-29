"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import block from "bem-cn-lite";
import { useRouter } from "next/navigation";

const b = block("header");

const Modal = dynamic(() => import("@/components/Modal/Modal"), { ssr: false });
import Popup from "@/components/Popup/Popup";
import { AuthServices } from "@/services/auth";
import Portal from "@/components/Portal/Portal";
import { useSearchParams } from "next/navigation";
import useScreenSize from "@/hooks/useScreenSize";
import ModalAuthFlow from "@/app/(main-page)/components/Modals/ModalAuthFlow/ModalAuthFlow";
import { delay } from "@/helpers/delay";
import { hideGlobalLoader, showGlobalLoader } from "@/helpers/emitLoader";

interface BlockLoginClientProps {
  isAuth: boolean;
  screen: string;
}

const hasChatIdSessionStorage = (chatId: string): boolean => {
  if (typeof window === "undefined") return false;

  const chatIdFromSSt = sessionStorage.getItem("chatId");

  if (chatIdFromSSt === chatId) return true;
  if (!chatId) return true;

  console.log(chatIdFromSSt, "hasChidID");
  sessionStorage.setItem("chatId", chatId);
  return false;
};

const BlockLoginClient: React.FC<BlockLoginClientProps> = ({
  isAuth,
  screen,
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { screen: currentScreen } = useScreenSize();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");
  const isRendered = currentScreen === screen;
  const isFirstRender = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (currentScreen) {
      if (!isFirstRender.current && isRendered) {
        const hasChatId = hasChatIdSessionStorage(chatId || "");
        console.log(hasChatId);
        setModalOpen(!!chatId && !hasChatId);
      }
    }
  }, [currentScreen]);

  const logout = async () => {
    try {
      await AuthServices.logout();
      showGlobalLoader();
      await delay(1000);
      closePopup();
      router.push("/");
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      hideGlobalLoader();
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePopup = () => setPopupOpen((prev) => !prev);
  const closePopup = () => setPopupOpen(false);

  return isRendered ? (
    <div>
      {!isAuth ? (
        <div className={b("block_login_client")} onClick={openModal}></div>
      ) : (
        <div className={b("profile_client")} onClick={handlePopup}></div>
      )}

      <Portal>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalAuthFlow chatId={chatId || ""} />
        </Modal>
      </Portal>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className={b("popup-block")}>
          <p>Профиль</p>
          <p onClick={logout}>Выйти</p>
        </div>
      </Popup>
    </div>
  ) : null;
};

export default BlockLoginClient;
