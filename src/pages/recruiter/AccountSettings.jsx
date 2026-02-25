import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const inputStyle =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    phoneNumber: "",
    location: "",
    linkedinUrl: "",
    websiteUrl: "",
    description: "",
    logoUrl: ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const companyId = "ea5b8065-2d49-40be-9f95-08de644d04c7";
  const userId = "426569E2-44B4-480B-A730-33BED3A7D529";

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/Company/${companyId}`)
      .then((res) => {
        const data = res.data.data;
        setFormData({
          companyName: data.companyName,
          contactEmail: data.contactEmail,
          phoneNumber: data.phoneNumber,
          location: data.location,
          linkedinUrl: data.linkedinUrl,
          websiteUrl: data.websiteUrl,
          description: data.description,
          logoUrl: data.logoUrl
        });
      })
      .catch((err) => {
        console.log("Error fetching company data:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoadingSave(true);

    const payload = {
      userId,
      companyName: formData.companyName,
      logoUrl: formData.logoUrl,
      description: formData.description,
      websiteUrl: formData.websiteUrl,
      linkedinUrl: formData.linkedinUrl,
      contactEmail: formData.contactEmail,
      location: formData.location,
      phoneNumber: formData.phoneNumber
    };

    try {
      const res = await axios.put(`${baseUrl}/api/Company/${companyId}`, payload);

      // ======= TEST SUCCESS =======
      console.log("PUT Success! Server response:", res.data);
      console.log("Payload sent:", payload);

      toast.success("Account Settings Saved ✅");
    } catch (error) {
      console.log("PUT error:", error.response || error);
      toast.error("Error saving data. Check console.");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white rounded-md border border-gray-200 shadow p-5 sm:p-8">
        <h2 className="text-lg font-bold mb-6">Account Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1 font-bold">Company Name</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
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
            <label className="block text-sm mb-1 font-bold">LinkedIn URL</label>
            <input
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="LinkedIn URL"
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
          <label className="block text-sm mb-1 font-bold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className={`${inputStyle} h-28 resize-none`}
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm mb-2 font-bold">Company Logo URL</label>
          <input
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="Logo URL"
            className={inputStyle}
          />
        </div>

        <button
          className="mt-6 bg-dark-blue text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2"
          disabled={loadingSave}
          onClick={handleSave}
        >
          {loadingSave && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Save
        </button>

        {/* Privacy & Security */}
        <h2 className="text-lg font-semibold mt-12 mb-6">Privacy & Security</h2>

        <div className="space-y-4 max-w-md">
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
          disabled={loadingPassword}
          onClick={async () => {
            setLoadingPassword(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoadingPassword(false);
            toast.success("Password Updated ✅");
          }}
        >
          {loadingPassword && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Update Password
        </button>
      </div>
    </div>
  );
}
