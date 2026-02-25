import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UniversityOnboarding() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userId = "DA53027B-19F1-4C52-2D74-08DE6D05606F";

  const [formData, setFormData] = useState({
    faculty: "",
    university: "",
    phoneNumber: "",
    location: "",
    contactEmail: "",
    websiteUrl: "",
    facultyLogo: ""
  });

  const [loadingButton, setLoadingButton] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const inputStyle =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      const formDataImage = new FormData();
      formDataImage.append("file", file);

      const response = await axios.post(
        `${baseUrl}/api/Files/Upload-image`,
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
console.log("Upload Response:", response);
console.log("Image URL:", response.data.imageUrl);
      

      setFormData((prev) => ({
        ...prev,
        facultyLogo: response.data.imageUrl,
      }));

    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoadingButton("signup");

      const payload = {
        userId: userId,
        collageName: formData.faculty,
        universityName: formData.university,
        location: formData.location,
        contactEmail: formData.contactEmail,
        phoneNumber: formData.phoneNumber,
        websiteUrl: formData.websiteUrl,
        logoUrl: formData.facultyLogo 
      };

      console.log("Payload:", payload);

      const response = await axios.post(
        `${baseUrl}/api/College`,
        payload
      );

      console.log("API Response:", response.data);

      navigate("/verify-email", {
        state: { email: formData.contactEmail },
      });

    } catch (error) {
  if (error.response) {
    console.log("❌ FULL ERROR RESPONSE:", error.response);
    console.log("📦 DATA:", error.response.data);
    console.log("🔢 STATUS:", error.response.status);
  } else if (error.request) {
    console.log("❌ REQUEST SENT BUT NO RESPONSE:", error.request);
  } else {
    console.log("❌ ERROR MESSAGE:", error.message);
  }
}
     finally {
      setLoadingButton("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-6 px-4">
      <div className="w-full max-w-2xl bg-white rounded-md border border-gray-200 shadow p-6 sm:p-8">

        <h2 className="text-xl font-bold mb-8">Onboarding Profile Setup</h2>

        <div className="flex flex-col gap-5">

          <div>
            <label className="block text-sm mb-1 font-bold">Faculty</label>
            <input
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              placeholder="Faculty"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold">University</label>
            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="University"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold">Phone Number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold">Contact Email</label>
            <input
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Contact Email"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-bold">Website URL</label>
            <input
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="Website URL"
              className={inputStyle}
            />
          </div>


          <div>
            <label className="block text-sm mb-1 font-bold">Faculty Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={inputStyle}
            />

            {uploadingImage && (
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            )}

            {formData.facultyLogo && (
              <img
                src={formData.facultyLogo}
                alt="logo preview"
                className="mt-2 h-16"
              />
            )}
          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            className="flex-1 bg-dark-blue text-white py-2 rounded text-sm flex items-center justify-center gap-2"
            onClick={handleSignUp}
            disabled={loadingButton === "signup"}
          >
            {loadingButton === "signup" && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Sign Up
          </button>

          <button
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded text-sm"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
}