"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import block from "bem-cn-lite";

const b = block("header");

const Modal = dynamic(() => import("@/components/Modal/Modal"), { ssr: false });
import Popup from "@/components/Popup/Popup";
import { AuthServices } from "@/services/auth";
import ModalAuthFlow from "../ModalAuthFlow/ModalAuthFlow";
import Portal from "@/components/Portal/Portal";

interface BlockLoginClientProps {
  isAuth: boolean;
}

const BlockLoginClient: React.FC<BlockLoginClientProps> = ({ isAuth }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const logout = async () => {
    try {
      await AuthServices.logout();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePopup = () => setPopupOpen((prev) => !prev);
  const closePopup = () => setPopupOpen(false);

  return (
    <div>
      {!isAuth ? (
        <div className={b("block_login_client")} onClick={openModal}></div>
      ) : (
        <div className={b("profile_client")} onClick={handlePopup}></div>
      )}

      <Portal containerSelector=".modal-container">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalAuthFlow />
        </Modal>
      </Portal>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className={b("popup-block")}>
          <p>Профиль</p>
          <p onClick={logout}>Выйти</p>
        </div>
      </Popup>
    </div>
  );
};

export default BlockLoginClient;
