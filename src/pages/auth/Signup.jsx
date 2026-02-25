import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { candidateSchema } from "../../schema/auth/candidateSchema";
import { recruiterSchema } from "../../schema/auth/recruiterSchema";
import { organizationSchema } from "../../schema/auth/organizationSchema";

import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [activeTab, setActiveTab] = useState("candidate");
  const navigate = useNavigate();


  const getSchema = () => {
    if (activeTab === "candidate") return candidateSchema;
    if (activeTab === "recruiter") return recruiterSchema;
    return organizationSchema;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  const getImage = () => {
    if (activeTab === "candidate") return "/src/assets/auth/signup-illustration.jpg";
    if (activeTab === "recruiter") return "/src/assets/auth/recruiter-illustration.jpg";
    return "/src/assets/auth/organization-illustration.jpg";
  };

  const onSubmit = (data) => {
    const finalData = { ...data, userType: activeTab };
    console.log("Signup data:", finalData);

    if (activeTab === "candidate") navigate("/upload-cv");
    else if (activeTab === "recruiter") navigate("/recruiter-onboarding");
    else navigate("/university-onboarding");
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white mt-1">
      {/* Left Section */}
      <div className="hidden md:flex lg:w-xl w-full items-center justify-center p-6">
        <img src={getImage()} alt="illustration" className="w-7xl max-w-md" />
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full px-10 py-8">
        <h2 className="text-center text-3xl font-semibold mb-6">Signup</h2>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6 text-sm border-b pb-2">
          {["candidate", "recruiter", "organization"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-1 ${
                activeTab === tab
                  ? "soft-blue font-semibold border-b-2 border-soft-blue"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

          {/* -------- ORGANIZATION -------- */}
          {activeTab === "organization" && (
            <>
              {/* Organization Name */}
              <label className="mt-3 text-sm font-medium">Organization Name</label>
              <input
                placeholder="Organization Name"
                {...register("organizationName")}
                className={`p-2 border rounded-md ${
                  errors.organizationName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.organizationName && (
                <p className="text-red-500 text-sm">{errors.organizationName.message}</p>
              )}

              {/* Organization Email */}
              <label className="mt-3 text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Organization Email"
                {...register("organizationEmail")}
                className={`p-2 border rounded-md ${
                  errors.organizationEmail ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.organizationEmail && (
                <p className="text-red-500 text-sm">{errors.organizationEmail.message}</p>
              )}

              {/* Password */}
              <label className="mt-3 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("organizationPassword")}
                className={`p-2 border rounded-md ${
                  errors.organizationPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.organizationPassword && (
                <p className="text-red-500 text-sm">{errors.organizationPassword.message}</p>
              )}

              {/* Confirm Password */}
              <label className="mt-3 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("organizationConfirmPassword")}
                className={`p-2 border rounded-md ${
                  errors.organizationConfirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.organizationConfirmPassword && (
                <p className="text-red-500 text-sm">{errors.organizationConfirmPassword.message}</p>
              )}
            </>
          )}

          {/* -------- RECRUITER -------- */}
          {activeTab === "recruiter" && (
            <>
              {/* Company Name */}
              <label className="mt-3 text-sm font-medium">Company Name</label>
              <input
                placeholder="Company Name"
                {...register("companyName")}
                className={`p-2 border rounded-md ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName.message}</p>
              )}

              {/* Business Email */}
              <label className="mt-3 text-sm font-medium">Business Email</label>
              <input
                type="email"
                placeholder="Business Email"
                {...register("businessEmail")}
                className={`p-2 border rounded-md ${
                  errors.businessEmail ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.businessEmail && (
                <p className="text-red-500 text-sm">{errors.businessEmail.message}</p>
              )}

              {/* Password */}
              <label className="mt-3 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("recruiterPassword")}
                className={`p-2 border rounded-md ${
                  errors.recruiterPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.recruiterPassword && (
                <p className="text-red-500 text-sm">{errors.recruiterPassword.message}</p>
              )}

              {/* Confirm Password */}
              <label className="mt-3 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("recruiterConfirmPassword")}
                className={`p-2 border rounded-md ${
                  errors.recruiterConfirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.recruiterConfirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.recruiterConfirmPassword.message}
                </p>
              )}
            </>
          )}

          {/* -------- CANDIDATE -------- */}
          {activeTab === "candidate" && (
            <>
              {/* Name */}
              <label className="mt-3 text-sm font-medium">Name</label>
              <input
                placeholder="Full Name"
                {...register("name")}
                className={`p-2 border rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              {/* Email */}
              <label className="mt-3 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className={`p-2 border rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Password */}
              <label className="mt-3 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`p-2 border rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              {/* Confirm Password */}
              <label className="mt-3 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className={`p-2 border rounded-md ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            className="mt-6 bg-dark-blue text-white p-2 rounded-md transition"
          >
            Signup
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-5">
            <span className="flex-1 border-t border-gray-400"></span>
            <span className="mx-3 text-gray-500 text-sm">or continue with</span>
            <span className="flex-1 border-t border-gray-400"></span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="border flex items-center gap-3 p-2 rounded-md transition relative"
          >
            <img
              src="/src/assets/auth/google-logo.png"
              alt="google"
              className="w-6 absolute left-3"
            />
            <span className="w-full text-center">Google</span>
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="soft-blue font-medium">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
