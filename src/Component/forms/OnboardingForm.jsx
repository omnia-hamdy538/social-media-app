import React, { useState } from "react";
import InputField from "./RecruiterInputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function OnboardingForm({ title, fields, schema, initialData, onSubmit, onImageUpload, uploading, logoUrl }) {
  // const [logoImage, setLogoImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  // const handleProfileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setProfileImage(URL.createObjectURL(file));
  // };

  // const handleLogoUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setLogoImage(URL.createObjectURL(file));
  // };

  return (
    <div className="min-h-screen px-6 flex flex-col items-center bg-white py-12">
      <h1 className="text-3xl mb-10">{title}</h1>

      <div className="w-full max-w-3xl">
        {/* Profile Picture */}
      <div className="flex items-center gap-3 mb-6">
  <label className="w-14 h-14 rounded-full overflow-hidden bg-dark-blue text-white flex items-center justify-center text-2xl cursor-pointer">
    {logoUrl ? (
      <img
        src={logoUrl}
        alt="company logo"
        className="w-full h-full object-cover"
      />
    ) : (
      "+"
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files[0]) onImageUpload(e.target.files[0]);
      }}
      className="hidden"
    />
  </label>

  <span className="font-medium text-gray-500">
    Company Logo Upload {uploading && "(Uploading...)"}
  </span>
</div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
{fields.map((f) => (
  <InputField
    key={f.name}
    label={f.label}
    register={register}
    name={f.name}   
    placeholder={f.placeholder}
    error={errors[f.name]}
  />
))}


{/* Logo */}
{/* <div className="pt-2">
  <label className="font-semibold text-sm block mb-1">Logo</label>

  <div className="w-full h-14  border border-gray-300 rounded-md flex items-center px-4">
    <input
      type="text"
      placeholder="Enter Logo URL"
      {...register("logoUrl")}
      className="w-full bg-transparent outline-none "
    />
  </div>

  {errors.logoUrl && (
    <p className="text-red-500 text-sm mt-1">
      {errors.logoUrl.message}
    </p>
  )}
</div> */}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-dark-blue text-white px-6 py-2 rounded-md"
            >
              Signup
            </button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="dark-blue hover:bg-blue-50 border px-6 py-2 rounded-md"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
