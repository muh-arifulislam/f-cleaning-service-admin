import React, { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";

// components
import DropdownShowcaseCard from "../../components/Dropdowns/DropdownShowcaseCard";
import CardShowcase from "../../components/Cards/CardShowcase";
import ModalAddShowcase from "../../components/Modals/ModalAddShowcase";

const AdminShowcase = () => {
  const { modalIsOpen, closeModal, openModal } = useModal(false);
  const [showcases, setShowcases] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/showcases")
      .then((res) => res.json())
      .then((data) => setShowcases(data));
  }, []);
  return (
    <>
      <div>
        <div className="mb-5 flex justify-center">
          <button
            onClick={() => openModal()}
            className="inline-block px-4 py-2 bg-tertiary uppercase font-semibold"
          >
            add new showcase
          </button>
        </div>
        <div className="grid lg:md:grid-cols-3 grid-cols-1 gap-8">
          {showcases.map((showcase) => (
            <div key={showcase?._id} className="relative">
              <CardShowcase />
              <DropdownShowcaseCard
                showcase={showcase}
                showcases={showcases}
                setShowcases={setShowcases}
              />
            </div>
          ))}
        </div>
      </div>
      <ModalAddShowcase
        isOpen={modalIsOpen}
        closeModal={closeModal}
        showcases={showcases}
        setShowcases={setShowcases}
      />
    </>
  );
};

export default AdminShowcase;
