import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../Component/forms/RecruiterInputs";



export default function StudentOnboarding() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Student onboarding:", data);
    navigate("/success", { state: { role: "candidate" } });

  };

  const handleSkip = () => navigate("/signup");

  return (
    <div className="min-h-screen px-6 flex flex-col items-center bg-white py-12">
      <h1 className="text-3xl mb-10">Onboarding Profile Setup</h1>

      <div className="w-full max-w-3xl">

        {/* PROFILE UPLOAD */}
        <div className="flex items-center gap-3 mb-6">
          <label className="w-14 h-14 rounded-full overflow-hidden bg-dark-blue text-white flex items-center justify-center text-2xl cursor-pointer">
            {profileImage ? (
              <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
            ) : ("+")}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(URL.createObjectURL(e.target.files[0]))}
              className="hidden"
            />
          </label>

          <span className="font-medium text-gray-500">Profile Picture Upload</span>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          <InputField
            label="Headline"
            register={register}
            name="headline"
            placeholder="e.g., UI/UX Designer"
            error={errors.headline}
          />

          <InputField
            label="Phone"
            register={register}
            name="phone"
            placeholder="Phone number"
            error={errors.phone}
          />

          <InputField
            label="College"
            register={register}
            name="college"
            placeholder="e.g., FCAI"
            error={errors.college}
          />

          <InputField
            label="Major"
            register={register}
            name="major"
            placeholder="e.g., CS"
            error={errors.major}
          />

          <InputField
            label="GPA"
            register={register}
            name="gpa"
            placeholder="3.5"
            error={errors.gpa}
          />

          <InputField
            label="Graduation Year"
            register={register}
            name="gradYear"
            placeholder="2026"
            error={errors.gradYear}
          />

          <InputField
            label="Skills Tags"
            register={register}
            name="skills"
            placeholder="Skill tags +"
            error={errors.skills}
          />

          <InputField
            label="Social Links"
            register={register}
            name="social"
            placeholder="Social links +"
            error={errors.social}
          />

          <InputField
            label="Short Bio / Summary"
            register={register}
            name="summary"
            placeholder="Summary"
            error={errors.summary}
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-dark-blue text-white px-6 py-2 rounded-md"
            >
              Signup
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="dark-blue hover:bg-blue-50 border px-6 py-2 rounded-md"
            >
              Skip
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
