import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_REVIEWS } from "../../store/actionTypes";

const ModalAddReview = ({ isOpen, closeModal }) => {
  const { reviews, dispatch, apiUrl } = useGlobalStore();
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    reset();
    closeModal();
    fetch(`${apiUrl}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("review added successfull!!!");
          dispatch({
            type: FETCH_REVIEWS,
            payload: [data.data, ...reviews.data],
          });
        } else {
          throw new Error("Failed to add review...!");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  return (
    <div className={modalClasses}>
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-full lg:md:max-w-md max-w-xs mx-auto rounded shadow-lg z-50 ">
        {/* Modal content goes here */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
          <div className="p-6 text-center">
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
                    Error !! Name is required
                  </p>
                )}
              </div>
              <div className="mb-2">
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /\d{8,}/,
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
                  placeholder="Email"
                  type="text"
                />
              </div>
              <div className="mb-2">
                <input
                  {...register("testimonial", {
                    required: true,
                  })}
                  aria-invalid={errors.testimonial ? "true" : "false"}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                  placeholder="Testimonail*"
                  type="text"
                />
                {errors.testimonial?.type === "required" && (
                  <p role="alert" className="pt-2 text-red-500">
                    Error !! testimonial is required
                  </p>
                )}
              </div>
              <div className="mb-2">
                <select
                  {...register("ratings", { required: true })}
                  aria-invalid={errors.ratings ? "true" : "false"}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                >
                  <option defaultChecked value={5}>
                    5
                  </option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
                {errors.ratings?.type === "required" && (
                  <p role="alert" className="pt-2 text-red-500">
                    Error !! First name is required
                  </p>
                )}
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

export default ModalAddReview;
