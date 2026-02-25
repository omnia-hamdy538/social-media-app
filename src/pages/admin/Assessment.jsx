import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Assessments() {
  const [isPosting, setIsPosting] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    id: null,
    type: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    questionsNumber: "",
    cooldownPeriod: "",
  });

  const handleEdit = (assessment) => {
    setActionLoading({ id: assessment.id, type: "edit" });
    setEditingAssessment(assessment);

    setFormData({
      name: assessment.title,
      description: assessment.description,
      questionsNumber: assessment.questions,
      cooldownPeriod: assessment.cooldown || "",
    });

    setIsOpen(true);

    setTimeout(() => {
      setActionLoading({ id: null, type: "" });
    }, 300);
  };

  const fetchAssessments = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/Assessments?page=1&pageSize=10`
      );

      const data = res.data.data.data;

      const mapped = data.map((item) => ({
        id: item.assessmentId,
        title: item.name,
        description: item.description,
        questions: item.questionsNumber,
        passed: item.passedCount,
        failed: item.failedCount,
      }));

      setAssessments(mapped);
    } catch (err) {
      console.log("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleDelete = async (id) => {
    try {
      setActionLoading({ id, type: "delete" });
      await axios.delete(`${BASE_URL}/api/Admin/Assessment/${id}`);
      setAssessments(assessments.filter((a) => a.id !== id));
      setActionLoading({ id: null, type: "" });
    } catch (err) {
      console.log(err);
      setActionLoading({ id: null, type: "" });
    }
  };

  const handleCreateClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(true);
    }, 800);
  };

  const handlePost = async () => {
    try {
      setIsPosting(true);

      const payload = {
        ...formData,
        adminId: "4D5F8C2D-417E-41DA-9BAB-AB57E0235410",
      };

      if (editingAssessment) {
        await axios.put(
          `${BASE_URL}/api/Admin/Assessment/${editingAssessment.id}`,
          payload
        );
        setEditingAssessment(null);
      } else {
        await axios.post(`${BASE_URL}/api/Admin/Assessment`, payload);
      }

      setIsOpen(false);
      fetchAssessments();
    } catch (err) {
      console.log("❌ Post error:", err.response || err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <>
      <div className="p-6 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold dark-blue">Assessments</h1>
            <p className="text-gray-500 mt-1">
              Manage and create student assessments
            </p>
          </div>

          <button
            onClick={handleCreateClick}
            className="bg-dark-blue text-white px-4 py-2 rounded flex items-center gap-2"
          >
            + Create New Assessment
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
          </button>
        </div>

        <h2 className="dark-blue font-semibold mb-4">Existing Assessments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="border border-gray-200 rounded-xl p-4 shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold mb-2">{assessment.title}</h3>
                <p className="text-gray-600 text-sm">{assessment.description}</p>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex gap-3 text-sm text-gray-700">
                  <span className="px-2 py-1 bg-gray-100 rounded-xl">
                    Questions: {assessment.questions}
                  </span>
                  <span className="px-2 py-1 bg-green-100 rounded-xl">
                    Passed: {assessment.passed}
                  </span>
                  <span className="px-2 py-1 bg-red-100 rounded-xl">
                    Failed: {assessment.failed}
                  </span>
                </div>

                <div className="flex justify-center gap-5">
                  <button
                    className="bg-dark-blue text-white px-10 py-1 rounded-xl flex items-center justify-center gap-2"
                    onClick={() => handleEdit(assessment)}
                    disabled={
                      actionLoading.id === assessment.id &&
                      actionLoading.type === "edit"
                    }
                  >
                    Edit
                    {actionLoading.id === assessment.id &&
                      actionLoading.type === "edit" && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      )}
                  </button>

                  <button
                    onClick={() => handleDelete(assessment.id)}
                    className="border border-red-500 text-red-500 px-9 py-1 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50"
                    disabled={
                      actionLoading.id === assessment.id &&
                      actionLoading.type === "delete"
                    }
                  >
                    {actionLoading.id === assessment.id &&
                    actionLoading.type === "delete" ? (
                      <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-semibold dark-blue mb-6">
              Create New Assessment
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Assessment Title
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 outline-none resize-none focus:ring-1 focus:ring-dark-blue"
                />
              </div>

              <div className="flex justify-between ">
                <div className="relative flex flex-col gap-1 w-1/2 me-2">
                  <label className="text-sm font-medium ">Cooldown Period</label>
                  <select
                    value={formData.cooldownPeriod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cooldownPeriod: Number(e.target.value),
                      })
                    }
                    className="appearance-none border border-gray-300 shadow rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue w-full"
                  >
                    <option value="" disabled hidden>
                      Select days
                    </option>
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                  </select>

                  <img
                    src="/src/assets/sections/arrowup.png"
                    alt="Arrow"
                    className="pointer-events-none absolute right-3 bottom-1 -translate-y-1/2 w-4 h-4"
                  />
                </div>

                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-medium ">Number of Questions</label>
                  <input
                    type="text"
                    placeholder="Enter number"
                    value={formData.questionsNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        questionsNumber: Number(e.target.value),
                      })
                    }
                    className="border border-gray-300 shadow rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1 border rounded-lg border-red-600 text-red-600 hover:bg-red-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={isPosting}
                  className="bg-dark-blue text-white px-4 py-1 rounded-lg flex items-center gap-2"
                >
                  Post
                  {isPosting && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}