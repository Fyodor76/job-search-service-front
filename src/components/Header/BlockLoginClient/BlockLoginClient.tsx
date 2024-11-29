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
import { emojiList } from "@/const/emojiList";
import { truncateText } from "@/helpers/truncateText";
import { AuthData } from "@/types/AuthUserData";
import { Tooltip } from "react-tooltip";
import ReactTooltip from "react-tooltip";
interface BlockLoginClientProps {
  isAuth: boolean;
  screen: string;
  randomIndexPicture?: number;
  authData: AuthData;
}

const handleAuthUserData = (authData: AuthData) => {
  if (authData?.email) {
    {
      return truncateText(authData?.email || "", 16);
    }
  }

  return authData?.chatId || "";
};

const handleTooltipData = (authData: AuthData) => {
  if (authData?.email) {
    return <span>{authData.email} - ваша почта</span>;
  }

  return (
    <>
      {authData?.chatId || ""}
      <br />
      Эти цифры - это ваш уникальный id после авторизации с телеграм.
      <br />
      Вам необходимо зайти в профиль и подтвердить свою почту.
    </>
  );
};

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
  randomIndexPicture,
  authData,
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { screen: currentScreen } = useScreenSize();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");
  const isRendered = currentScreen === screen;
  const isFirstRender = useRef(false);
  const router = useRouter();
  const randomEmoji = emojiList[randomIndexPicture || 0];

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
          <div className={b("popup-block-menu")}>
            <div className={b("popup-block-menu-header")}>
              <div>{randomEmoji}</div>
              <div>
                <span
                  data-tooltip-id="auth-data"
                  data-tooltip-place="top"
                  className="text email"
                >
                  {handleAuthUserData(authData)}
                  <Tooltip id="auth-data">
                    {handleTooltipData(authData)}
                  </Tooltip>
                </span>
              </div>
            </div>

            <div className={b("popup-block-menu-container")}>
              <div className={b("popup-block-menu-item")}>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="16"
                    height="16"
                    fill="rgba(var(--center-channel-color-rgb), 0.56)"
                    viewBox="0 0 24 24"
                    className="profile__icon"
                  >
                    <path d="M19.2,15.9L16,14c0.2-0.3,0.5-0.6,0.7-1c0.8-1.4,1.3-3.2,1.3-5c0-3.6-2.4-6-6-6S6,4.4,6,8c0,1.8,0.5,3.6,1.3,5.1c0.2,0.4,0.4,0.7,0.7,1L4.8,16C3.7,16.4,3,17.6,3,18.8C3,20.6,4.4,22,6.2,22h11.6c1.8,0,3.2-1.4,3.2-3.2C21,17.6,20.3,16.4,19.2,15.9z M8,8c0-2.8,1.8-4,4-4s4,1.2,4,4c0,1.8-0.6,3.8-1.8,5c-0.6,0.6-1.3,1-2.2,1s-1.6-0.4-2.2-1C8.6,11.8,8,9.8,8,8z M17.8,20H6.2C5.5,20,5,19.5,5,18.8c0-0.5,0.3-0.9,0.7-1.1l3.9-2.3c0.8,0.4,1.6,0.6,2.4,0.6s1.6-0.2,2.3-0.6l3.9,2.3c0.4,0.2,0.7,0.6,0.7,1.1C19,19.5,18.5,20,17.8,20z"></path>
                  </svg>
                </div>
                <div>
                  <span className="text">Профиль</span>
                </div>
              </div>
              <div className={b("popup-block-menu-item")} onClick={logout}>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="16"
                    height="16"
                    fill="rgba(var(--center-channel-color-rgb), 0.56)"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19,3H5C3.89,3,3,3.89,3,5v4h2V5h14v14H5v-4H3v4c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.89,20.1,3,19,3 M10.08,15.58L11.5,17l5-5l-5-5l-1.42,1.41L12.67,11H3v2h9.67L10.08,15.58z"></path>
                  </svg>
                </div>
                <div>
                  <span className="text">Выйти</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  ) : null;
};

export default BlockLoginClient;
