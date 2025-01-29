import React, { useState } from "react";
import useModal from "../../hooks/useModal";

// components
import DropdownShowcaseCard from "../../components/Dropdowns/DropdownShowcaseCard";
import CardShowcase from "../../components/Cards/CardShowcase";
import ModalAddShowcase from "../../components/Modals/ModalAddShowcase";
import ButtonRefresh from "../../components/Buttons/ButtonRefresh";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import ShowcaseLoader from "../../components/Loader/ShowcaseLoader";
import CardTableError from "../../components/Cards/CardTableError";
import {
  FETCH_SHOWCASES,
  SET_ERROR,
  SET_LOADING,
} from "../../store/actionTypes";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import ModalShowShowcase from "../../components/Modals/ModalShowShowcase";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import { toast } from "react-toastify";

const AdminShowcase = () => {
  const { showcases, dispatch, apiUrl } = useGlobalStore();
  const [googleUser, googleLoading, googleError] = useAuthState(auth);
  const { modalIsOpen, closeModal, openModal } = useModal(false);
  const {
    modalIsOpen: modalIsOpenView,
    closeModal: closeModalView,
    openModal: openModalView,
  } = useModal(false);
  const {
    modalIsOpen: loaderModalIsOpen,
    closeModal: closeLoaderModal,
    openModal: openLoaderModal,
  } = useModal(false);
  const [viewShowcaseImg, setViewShowcaseImg] = useState(null);
  const handleRefresh = () => {
    dispatch({ type: SET_LOADING, target: "showcases" });
    fetch(`${apiUrl}/showcases`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_SHOWCASES, payload: data });
      })
      .catch((error) =>
        dispatch({
          type: SET_ERROR,
          target: "showcases",
          payload: error.message,
        })
      );
  };

  if (showcases.loading) {
    return <ShowcaseLoader />;
  }
  if (showcases.error) {
    return <CardTableError error={showcases.error} />;
  }

  return (
    <>
      <div>
        <div className="mb-5 flex justify-center">
          <ButtonRefresh onClick={handleRefresh} />
          <button
            onClick={() => openModal()}
            className="inline-block px-4 py-2 bg-tertiary uppercase font-semibold"
          >
            add new showcase
          </button>
        </div>
        <div className="grid lg:md:grid-cols-3 grid-cols-1 gap-8">
          {showcases.data.map((showcase) => (
            <div key={showcase?._id} className="relative">
              <CardShowcase showcase={showcase} />
              <DropdownShowcaseCard
                showcase={showcase}
                googleUser={googleUser}
                setViewShowcaseImg={setViewShowcaseImg}
                openModalView={openModalView}
              />
            </div>
          ))}
        </div>
      </div>
      <ModalAddShowcase
        isOpen={modalIsOpen}
        closeModal={closeModal}
        googleUser={googleUser}
        openLoaderModal={openLoaderModal}
        closeLoaderModal={closeLoaderModal}
      />
      <ModalShowShowcase
        isOpen={modalIsOpenView}
        closeModal={closeModalView}
        img={viewShowcaseImg}
      />
    </>
  );
};

export default AdminShowcase;
