"use client";

import Modal from "@/components/Modal/Modal";
import ModalLoginTemplate from "@/templates/ModalLoginTemplate/ModalLoginTemplate";
import { useState } from "react";
import LoginButton from "../LoginButton/LoginButton";

const BlockLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <LoginButton onClick={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalLoginTemplate />
      </Modal>
    </>
  );
};

export default BlockLogin;
