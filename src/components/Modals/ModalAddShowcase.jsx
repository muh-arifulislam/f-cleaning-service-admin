import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_SHOWCASES } from "../../store/actionTypes";

const ModalAddShowcase = ({
  isOpen,
  closeModal,
  googleUser,
  openLoaderModal,
  closeLoaderModal,
}) => {
  const { showcases, dispatch, apiUrl, fetchData } = useGlobalStore();
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

  const handleUploadShowcase = async (payload) => {
    const id = toast.loading("Showcase is uploading...");
    try {
      const res = await fetch(`${apiUrl}/showcases`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: payload,
      });

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.message || "Upload failed!");
      toast.update(id, {
        render: "Showcase uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData(
        "showcases",
        FETCH_SHOWCASES,
        "http://localhost:9000/showcases"
      );
    } catch (err) {
      toast.update(id, {
        render: "Failed to upload showcase...!",
        type: "error",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const onSubmit = (data) => {
    closeModal();
    const image = data.image[0];
    const payload = { title: data?.title };

    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify(payload));
    handleUploadShowcase(formData);
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
          <div className="p-6 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:md:p-[40px] p-5 border"
            >
              <div className="relative pb-4 mb-8">
                <h4 className="text-xl font-semibold">
                  Please Fill Information !!
                </h4>
                <span className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-blue-600"></span>
              </div>
              <div className="mb-2">
                <input
                  {...register("title", { required: true })}
                  className="w-full px-[20px] py-[15px] bg-slate-100 outline-blue-500 outline-1 rounded"
                  placeholder="Title*"
                  type="text"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="image"
                >
                  Upload file
                </label>
                <input
                  {...register("image", { required: true })}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="image"
                  type="file"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>

              <div className="flex">
                <input
                  className="w-full rounded py-4 bg-amber-400 text-lg font-medium cursor-pointer"
                  type="submit"
                  value="Add Showcase"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddShowcase;
