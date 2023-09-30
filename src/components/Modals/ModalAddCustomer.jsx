import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ModalAddCustomer = ({ isOpen, closeModal, customers, setCustomers }) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    closeModal();
    fetch("http://localhost:9000/customer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledgement) {
          reset();
          toast.success("customer added successfull!!!");
          setCustomers([...customers, data.customer]);
        } else {
          console.log(data.error);
          // toast.error(data.error);
        }
      });
  };

  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-full lg:md:max-w-md max-w-xs mx-auto rounded shadow-lg z-50 ">
        {/* Modal content goes here */}
        <div className="relative bg-white rounded-lg dark:bg-gray-700">
          <div className="flex px-3 pt-3">
            <button
              onClick={() => closeModal()}
              type="button"
              className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="m-6 lg:md:p-[40px] p-5 border text-center">
            <div className="relative pb-4 mb-8">
              <h4 className="text-xl font-semibold">
                Please Fill Information !!
              </h4>
              <span className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-blue-600"></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="">
              <div className="mb-2">
                <input
                  {...register("name", { required: true, maxLength: 20 })}
                  aria-invalid={errors.name ? "true" : "false"}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                  placeholder="Name*"
                  type="text"
                />
                {errors.name?.type === "required" && (
                  <p role="alert" className="pt-2 text-red-500">
                    Error !! First name is required
                  </p>
                )}
              </div>
              <div className="mb-2">
                <input
                  {...register("address", {
                    required: true,
                  })}
                  aria-invalid={errors.address ? "true" : "false"}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                  placeholder="Address*"
                  type="text"
                />
                {errors.address?.type === "required" && (
                  <p role="alert" className="pt-2 text-red-500">
                    Error !! Address is required
                  </p>
                )}
              </div>
              <div className="mb-2">
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /^(9|7)\d{7}$/,
                  })}
                  aria-invalid={errors.phone ? "true" : "false"}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                  placeholder="Phone*"
                  type="text"
                />
                {errors.phone?.type === "required" && (
                  <p role="alert" className="pt-2 text-red-500">
                    Error !! Phone number is required
                  </p>
                )}
              </div>
              <div className="mb-2">
                <input
                  {...register("email", {
                    required: false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    },
                  })}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                  placeholder="Email*"
                  type="text"
                />
              </div>

              <div className="mt-5 flex justify-center gap-x-5 items-center">
                <button
                  onClick={() => {
                    clearErrors();
                    reset();
                  }}
                  className="px-4  py-2 rounded bg-red-600 text-white font-medium cursor-pointer"
                >
                  Clear
                </button>
                <input
                  className="px-4  py-2 rounded bg-green-600 text-white font-medium cursor-pointer"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCustomer;
