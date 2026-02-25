import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const workTypes = ["on-site", "remote", "hybrid"];

export default function CreateInternship() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const COMPANY_ID = "BD586793-9A42-4B95-B64F-04BD3F894120";

  const [formData, setFormData] = useState({
    title: "",
    field: "",
    supervisor: "",
    description: "",
    responsibility: "",
    duration: "",
    deadline: "",
    location: "",
    workType: "on-site",
  });

  const [loadingPublish, setLoadingPublish] = useState(false);

  const handlePublish = async () => {
    try {
      setLoadingPublish(true);

      const payload = {
        companyId: COMPANY_ID,
        title: formData.title,
        requiredField: formData.field,
        supervisor: formData.supervisor,
        description: formData.description,
        responsibilities: formData.responsibility,
        duration: formData.duration,
        location: formData.location,
        applicationDeadline: new Date(formData.deadline).toISOString(),
        type: workTypes.indexOf(formData.workType) + 1,
      };

      await axios.post(`${baseUrl}/api/Internship`, payload);

      toast.success("Internship published successfully ");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoadingPublish(false);
    }
  };

  const handleCancel = () => {
    toast("Operation canceled ❌");
    navigate("/dashboard");
  };

  const inputStyle =
    "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-dark-blue focus:outline-none";

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Create Internship</h1>
        <p className="text-gray-500 mt-1">Basic Internship information</p>

        {/* Role Overview */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-semibold dark-blue">Role Overview</h2>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Internship Title</label>
            <input
              type="text"
              placeholder='e.g. "UI/UX Designer"'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field → INPUT */}
            <div>
              <label className="text-sm font-medium text-gray-700">Internship Field</label>
              <input
                type="text"
                placeholder="Web Development"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className={inputStyle}
              />
            </div>

            {/* Supervisor */}
            <div>
              <label className="text-sm font-medium text-gray-700">Supervisor Name</label>
              <input
                type="text"
                placeholder="Mohamed"
                value={formData.supervisor}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              placeholder="Descripe the role,daily tasks,company..."
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`${inputStyle} resize-none`}
            />
          </div>

          {/* Responsibility */}
          <div>
            <label className="text-sm font-medium text-gray-700">Responsibility</label>
            <textarea
            placeholder="Descripe the role,daily tasks,company..."
              rows="3"
              value={formData.responsibility}
              onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })}
              className={`${inputStyle} resize-none`}
            />
          </div>
        </div>

        {/* Internship Details */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration → INPUT */}
            <div>
              <label className="text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                placeholder="3 Months"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className={inputStyle}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="text-sm font-medium text-gray-700">Application Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className={`${inputStyle} text-gray-400`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location → INPUT */}
            <div>
              <label className="text-sm font-medium text-gray-700">Internship Location</label>
              <input
                type="text"
                placeholder="Cairo, Egypt"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={inputStyle}
              />
            </div>

            {/* Work Type */}
            <div>
              <label className="text-sm font-medium text-gray-700">Work Type</label>
              <div className="mt-2 flex gap-4 text-sm">
                {workTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workType"
                      checked={formData.workType === type}
                      onChange={() => setFormData({ ...formData, workType: type })}
                      className="accent-blue-900"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handlePublish}
            disabled={loadingPublish}
            className="bg-dark-blue text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md shadow-blue-900/20 flex items-center gap-2"
          >
            <span>Publish Internship</span>
            {loadingPublish && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </button>

          <button
            onClick={handleCancel}
            className="border border-red-400 text-red-500 px-6 py-2 rounded-lg text-sm shadow-md shadow-red-400/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
