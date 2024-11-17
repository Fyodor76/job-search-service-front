"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import block from "bem-cn-lite";

const b = block("header");

const Modal = dynamic(() => import("@/components/Modal/Modal"), { ssr: false });
import ModalLoginTemplate from "@/templates/ModalLoginTemplate/ModalLoginTemplate";
import Popup from "@/components/Popup/Popup";
import { AuthServices } from "@/services/auth";

interface BlockLoginClientProps {
  isAuth: boolean;
}

const BlockLoginClient: React.FC<BlockLoginClientProps> = ({ isAuth }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalLoginTemplate />
      </Modal>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className={b("popup-block")}>
          <p>Профиль</p>
          <p onClick={AuthServices.logout}>Выйти</p>
        </div>
      </Popup>
    </div>
  );
};

export default BlockLoginClient;
