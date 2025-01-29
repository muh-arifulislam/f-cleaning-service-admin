import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase.init";

// images
import googleIcon from "../../assets/img/google.svg";

import { useForm } from "react-hook-form";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { toast } from "react-toastify";

export default function Login() {
  const { apiUrl } = useGlobalStore();

  const { register, handleSubmit } = useForm({
    values: {
      email: "visitor@gmail.com",
      password: "visitor",
    },
  });
  const onSubmit = async (data) => {
    const id = toast.loading("Please wait...");
    fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          toast.update(id, {
            render: "Login successful.",
            type: "success",
            isLoading: false,
          });
          navigate("/");
        } else {
          toast.update(id, {
            render: "Something went wrong.",
            type: "error",
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render: "Something went wrong.",
          type: "error",
          isLoading: false,
        });
      });
  };

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result?.user?.email;
        if (email) {
          const id = toast.loading("Please wait...");
          fetch(`${apiUrl}/auth/google`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                toast.update(id, {
                  render: "Login successful!",
                  type: "success",
                  isLoading: false,
                  autoClose: 3000,
                  closeButton: true,
                });
                navigate("/");
              } else {
                toast.update(id, {
                  render: "Failed to login...!",
                  type: "error",
                  isLoading: false,
                  autoClose: 3000,
                  closeButton: true,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              toast.update(id, {
                render: "Something went wrong.",
                type: "error",
                isLoading: false,
              });
            });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="rounded-t mb-0 px-4 lg:px-10 pt-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    onClick={() => handleGoogleLogin()}
                    className="bg-white active:bg-slate-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center justify-center font-bold text-xs ease-linear transition-all duration-150 w-full"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src={googleIcon} />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-slate-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      {...register("password", { required: true })}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
