// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { recruiterOnboardingSchema } from "../schema/recruiterOnboardingSchema";
// import { useNavigate, useLocation } from "react-router-dom";
// import InputField from "../Component/RecruiterInputs";

// export default function RecruiterOnboarding() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const registerData = location.state?.registerData || {};

//   const [profileImage, setProfileImage] = useState(null);
//   const [logoImage, setLogoImage] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(recruiterOnboardingSchema),
//   });

//   const onSubmit = (data) => {
//     console.log("Onboarding Data:", data);
//     console.log("Uploaded Images:", { profileImage, logoImage });

//     navigate("/verify-email", {
//       state: {
//         email: registerData.email,
//       },
//     });
//   };

//   const handleSkip = () => {
//     navigate("/signup", {
//       state: {
//         ...registerData,
//       },
//     });
//   };

//   const handleProfileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setProfileImage(URL.createObjectURL(file));
//   };

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setLogoImage(URL.createObjectURL(file));
//   };

//   return (
//     <div className="min-h-screen px-6 flex flex-col items-center bg-white py-12">
//       <h1 className="text-3xl mb-10">Onboarding Profile Setup</h1>

//       <div className="w-full max-w-3xl">

//         {/* Profile Picture */}
//         <div className="flex items-center gap-3 mb-6">
//           <label className="w-14 h-14 rounded-full overflow-hidden bg-dark-blue text-white flex items-center justify-center text-2xl cursor-pointer">
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               "+"
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleProfileUpload}
//               className="hidden"
//             />
//           </label>

//           <span className="font-medium text-gray-500">
//             Profile Picture Upload
//           </span>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//           <InputField
//             label="Company Website"
//             register={register}
//             name="website"
//             placeholder="Company Website (URL)"
//             error={errors.website}
//           />

//           <InputField
//             label="Phone"
//             register={register}
//             name="phone"
//             placeholder="Company Phone"
//             error={errors.phone}
//           />

//           <InputField
//             label="Company Location"
//             register={register}
//             name="location"
//             placeholder="Company Location"
//             error={errors.location}
//           />

//           {/* --- SOCIAL LINKS SPLIT INTO TWO INPUTS --- */}
//           <InputField
//             label="LinkedIn Profile"
//             register={register}
//             name="linkedin"
//             placeholder="LinkedIn Profile"
//             error={errors.linkedin}
//           />

//           <InputField
//             label="GitHub Profile"
//             register={register}
//             name="github"
//             placeholder="GitHub Profile"
//             error={errors.github}
//           />
//           {/* ------------------------------------------- */}

//           <InputField
//             label="About the Company"
//             register={register}
//             name="about"
//             placeholder="About the Company"
//             error={errors.about}
//           />
// {/* Logo Upload */}
// <div className="pt-2">
//   <label className="font-semibold text-sm block mb-1">Logo</label>

//   <label
//     className="
//       w-full h-14 bg-blue-100 border border-blue-300
//       rounded-md flex items-center justify-center
//       cursor-pointer overflow-hidden
//     "
//   >
//     {!logoImage ? (
//       <span className="text-blue-600 font-medium flex items-center gap-2">
//         📤 Company Logo
//       </span>
//     ) : (
//       <span className="text-green-600 font-semibold flex items-center gap-2">
//         ✔️ Logo Uploaded
//       </span>
//     )}

//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleLogoUpload}
//       className="hidden"
//     />
//   </label>
// </div>


//           <InputField
//             label="Recruiter Profile"
//             register={register}
//             name="recruiterProfile"
//             placeholder="Recruiter Profile (if the sign-up is from an individual HR)"
//             error={errors.recruiterProfile}
//           />

//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               className="bg-dark-blue text-white px-6 py-2 rounded-md"
//             >
//               Signup
//             </button>

//             <button
//               type="button"
//               onClick={handleSkip}
//               className="dark-blue hover:bg-blue-50 border px-6 py-2 rounded-md"
//             >
//               back
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }























import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingForm from "../../Component/forms/OnboardingForm";
import { recruiterOnboardingSchema } from "../../schema/onboarding/recruiterOnboardingSchema";
import axios from "axios";

export default function RecruiterOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const registerData = location.state?.registerData || {};

  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

 const fields = [
  { name: "companyName", label: "Company Name", placeholder: "Enter your company name" }, // 👈 جديد
  { name: "website", label: "Company Website", placeholder: "Company Website (URL)" },
  { name: "phone", label: "Phone", placeholder: "Company Phone" },
  { name: "location", label: "Company Location", placeholder: "Company Location" },
  { name: "linkedin", label: "LinkedIn Profile", placeholder: "LinkedIn Profile" },
  { name: "github", label: "GitHub Profile", placeholder: "GitHub Profile" },
  { name: "about", label: "About the Company", placeholder: "About the Company" },
  { name: "recruiterProfile", label: "Recruiter Profile", placeholder: "Recruiter Profile (if individual HR)" },
  { name: "contactEmail", label: "Contact Email", placeholder: "Enter company contact email" }, // 👈 جديد
];





  const handleImageUpload = async (file) => {
    try {
      setUploading(true);

      const formDataImage = new FormData();
      formDataImage.append("file", file);

      console.log("📤 Uploading image...");

      const response = await axios.post(
        `${baseUrl}/api/Files/Upload-image`,
        formDataImage,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Upload Response:", response.data);
      console.log("🖼️ Image URL:", response.data.imageUrl);

      setLogoUrl(response.data.imageUrl);

    } catch (error) {
      console.error("❌ Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };


const onSubmit = async (data) => {
  try {
     console.log("FORM DATA:", data);
    if (!logoUrl) {
      alert("Please upload logo first");
      return;
    }

const payload = {
  userId: "F18058F0-7330-4C88-2D73-08DE6D05606F",
  companyName: data.companyName,
  logoUrl: logoUrl,
  description: data.about,
  websiteUrl: data.website,
  linkedinUrl: data.linkedin,
  contactEmail: data.contactEmail,
  location: data.location,
  phoneNumber: data.phone
};

    console.log("🚀 FINAL PAYLOAD:", payload);

    const response = await axios.post(`${baseUrl}/api/Company`, payload);

    console.log("✅ Company Created:", response.data);
    alert("Company created successfully ✅");

    navigate("/verify-email", { state: { email: registerData.email } });

  } catch (error) {
    console.error("❌ ERROR RESPONSE:", error.response?.data || error.message);
  }
};

  return (
    
    <OnboardingForm
  title="Onboarding Profile Setup"
  fields={fields}
  schema={recruiterOnboardingSchema}
  initialData={registerData}
  onSubmit={onSubmit}
  onImageUpload={handleImageUpload}
  uploading={uploading}
  logoUrl={logoUrl}     
/>
  );
}