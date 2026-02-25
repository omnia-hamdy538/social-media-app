import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


const workTypes = ["on-site", "remote", "hybrid"];

/* ================= Component ================= */
export default function EditInternship() {
  const { id } = useParams(); // ID of internship
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

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

  const [loadingData, setLoadingData] = useState(false);
  const [loadingActions, setLoadingActions] = useState({ save: false, cancel: false });

  const workTypeMap = {
  1: "on-site",
  2: "remote",
  3: "hybrid"
};

const { id: internshipId } = useParams();

  /* ================= Load internship data ================= */
  useEffect(() => {
    if (!id) return;

    setLoadingData(true);
    axios.get(`${baseUrl}/api/Internship/${id}`)
      .then(res => {
        console.log("Internship API Response:", res.data); 
        const data = res.data.data;
        setFormData({
          title: data.title || "",
          field: data.requiredField || "",
          supervisor: data.supervisor || "",
          description: data.description || "",
          responsibility: data.responsibilities || "",
          duration: data.duration || "",
          deadline: data.applicationDeadline ? data.applicationDeadline.split("T")[0] : "",
          location: data.location || "",
          workType: workTypeMap[data.type] || "on-site", 
        });

      })
      .catch(err => toast.error(err.response?.data?.message || "Failed to load internship"))
      .finally(() => setLoadingData(false));
  }, [id]);


  /* ================= Handlers ================= */
  const handleSave = async () => {
    try {
      setLoadingActions(prev => ({ ...prev, save: true }));

      const payload = {
        internshipId: id,
        companyId: "bd586793-9a42-4b95-b64f-04bd3f894120",
        title: formData.title,
        requiredField: formData.field,
        supervisor: formData.supervisor,
        description: formData.description,
        responsibilities: formData.responsibility,
        duration: formData.duration,
        location: formData.location,
        applicationDeadline: formData.deadline,
        type: workTypes.indexOf(formData.workType) + 1,
      };

      await axios.put(`${baseUrl}/api/Internship/${internshipId}`, payload);


      toast.success("Internship updated successfully ");
      navigate("/dashboard"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoadingActions(prev => ({ ...prev, save: false }));
    }
  };

  const handleCancel = () => navigate("/dashboard");



  if (loadingData) return <div className="min-h-screen flex items-center justify-center text-blue-500 text-lg">Loading internship...</div>;

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Edit internship</h1>
        <p className="text-gray-500 mt-1">Basic Internship information</p>

        {/* ================= Role Overview ================= */}
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
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-dark-blue focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field */}
            <div>
              <label className="text-sm font-medium text-gray-700">Internship Field</label>
              {/* Field */}
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                placeholder="Enter Internship Field"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-dark-blue focus:outline-none"
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
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-dark-blue focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="3"
              placeholder="Describe the role, daily tasks, company..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:ring-1 focus:ring-dark-blue focus:outline-none"
            />
          </div>

          {/* Responsibility */}
          <div>
            <label className="text-sm font-medium text-gray-700">Responsibility</label>
            <textarea
              rows="3"
              placeholder="Describe responsibilities..."
              value={formData.responsibility}
              onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:ring-1 focus:ring-dark-blue focus:outline-none"
            />
          </div>
        </div>

        {/* ================= Internship Details ================= */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <div>
              <label className="text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Enter Duration"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-dark-blue focus:outline-none"
              />

            </div>

            {/* Deadline */}
            <div>
              <label className="text-sm font-medium text-gray-700">Application Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm  focus:ring-1 focus:ring-dark-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700">Internship Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter Location"
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-dark-blue focus:outline-none"
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
                        value={type}
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

        {/* ================= Actions ================= */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleSave}
            disabled={loadingActions.save}
            className="bg-dark-blue text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md shadow-blue-900/20 flex items-center gap-2"
          >
            <span>Save Changes</span>
            {loadingActions.save && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          </button>

          <button
            onClick={handleCancel}
            disabled={loadingActions.cancel}
            className="border border-red-400 text-red-500 px-6 py-2 rounded-lg text-sm shadow-md shadow-red-400/20 flex items-center gap-2"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
