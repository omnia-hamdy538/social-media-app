import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/auth/LoginSchema";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoadingButton("login");
    console.log("Login Data:", data);

    // ===== Mock response =====
    setTimeout(() => {
      const response = {
        user: {
          role: "recruiter", // "user" أو "recruiter"
        },
        token: "fake-token-123",
      };

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.user.role);

      setLoadingButton("");
      if (response.user.role === "recruiter") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }, 1500);
  };

  const handleForget = () => {
    setLoadingButton("forget");
    setTimeout(() => {
      setLoadingButton("");
      navigate("/forget");
    }, 500);
  };

  const handleGoogle = () => {
    setLoadingButton("google");
    setTimeout(() => {
      setLoadingButton("");
      console.log("Google Login Clicked");
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white px-6 w-full">
      <div className="hidden md:flex w-full items-center justify-center p-6">
        <img
          src="/src/assets/auth/login-img.jpg"
          alt="login"
          className="w-full max-w-xl"
        />
      </div>

      <div className="lg:w-1/2 w-full mx-4 md:mx-10 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              onClick={handleForget}
              className="text-red-500 flex items-center gap-2"
            >
              {loadingButton === "forget" ? (
                <svg
                  className="animate-spin h-4 w-4 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              Forget Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-dark-blue text-white py-2 rounded-md font-medium flex items-center justify-center gap-2"
            disabled={loadingButton === "login"}
          >
            {loadingButton === "login" && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            Login
          </button>

          <div className="flex items-center gap-4">
            <span className="flex-1 border-t"></span>
            <span className="text-sm text-gray-500">or continue with</span>
            <span className="flex-1 border-t"></span>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="relative w-full border py-2 rounded-md flex items-center justify-center gap-2"
            disabled={loadingButton === "google"}
          >
            {loadingButton === "google" && (
              <svg
                className="animate-spin h-4 w-4 absolute left-3 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            <img
              src="/src/assets/auth/google-logo.png"
              alt="google"
              className="w-6 absolute left-3"
            />
            Google
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?
          <a href="/signup" className="soft-blue ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
