import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const inputStyle =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900";

export default function FacultyAccountSettings() {
  const collageId = "6b3a543b-71a7-47bd-292a-08de6b839aa7";
  const  userId = "c565213a-46da-4980-c33f-08de6b32d50d";
  const baseUrl =  import.meta.env.VITE_BASE_URL;

const [formData, setFormData] = useState({
  faculty: "",
  university: "",
  phoneNumber: "",
  location: "",
  contactEmail: "",
  websiteUrl: "",
  facultyLogo: ""
});

  const [loadingButton, setLoadingButton] = useState(null);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/College/${collageId}`
        );
        const result = await response.json();

        if (result.succeeded) {
          const data = result.data;
          setFormData({
            faculty: data.collageName || "",
            university: data.universityName || "",
            phoneNumber: data.phoneNumber || "",
            location: data.location || "",
            contactEmail: data.contactEmail || "",
            websiteUrl: data.websiteUrl || "",
            facultyLogo: data.logoUrl || null
          });
        }
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleButtonClick = async (action) => {
    setLoadingButton(action);

    if (action === "save") {
      try {
        const form = new FormData();
        form.append("collageName", formData.faculty);
        form.append("universityName", formData.university);
        form.append("phoneNumber", formData.phoneNumber);
        form.append("location", formData.location);
        form.append("contactEmail", formData.contactEmail);
        form.append("websiteUrl", formData.websiteUrl);

        if (formData.facultyLogo instanceof File) {
          form.append("logo", formData.facultyLogo);
        }

const response = await fetch(
  `${baseUrl}/api/College/${collageId}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
body: JSON.stringify({
  userId,
  collageId,
  collageName: formData.faculty,
  universityName: formData.university,
  location: formData.location,
  contactEmail: formData.contactEmail,
  phoneNumber: formData.phoneNumber,
  websiteUrl: formData.websiteUrl,
  logoUrl: formData.facultyLogo
})
  }
);

        const result = await response.json();

        if (result.succeeded) {
          toast.success("Account Settings Saved!");
        } else {
          toast.error(result.message || "Failed to update");
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Something went wrong");
      }
    } else if (action === "updatePassword") {
      toast.success("Password Updated Successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }

    setLoadingButton(null);
  };

  return (
    <div className="min-h-screen flex justify-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white rounded-md border border-gray-200 shadow p-5 sm:p-8">

        <h2 className="text-lg font-bold mb-6">Account Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        </div>

<div className="mt-5">
  <label className="block text-sm mb-2 font-bold">Faculty Logo URL</label>
  <input
    name="facultyLogo"
    value={formData.facultyLogo || ""}
    onChange={handleChange}
    placeholder="Logo URL"
    className={inputStyle}
  />
</div>

        <button
          className="mt-6 bg-dark-blue text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2"
          onClick={() => handleButtonClick("save")}
          disabled={loadingButton === "save"}
        >
          {loadingButton === "save" && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Save
        </button>

        <h2 className="text-lg font-bold mt-12 mb-6">
          Privacy & Security
        </h2>

        <div className="space-y-4 max-w-md">
          <p className="font-semibold ">Change Password</p>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className={inputStyle}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className={inputStyle}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className={inputStyle}
          />
        </div>

        <button
          className="mt-5 bg-dark-blue text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2"
          onClick={() => handleButtonClick("updatePassword")}
          disabled={loadingButton === "updatePassword"}
        >
          {loadingButton === "updatePassword" && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Update Password
        </button>

      </div>
    </div>
  );
}