import { useState } from "react";

const useModal = (initialState = false) => {
  const [modalIsOpen, setModalIsOpen] = useState(initialState);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return { modalIsOpen, setModalIsOpen, openModal, closeModal };
};

export default useModal;
