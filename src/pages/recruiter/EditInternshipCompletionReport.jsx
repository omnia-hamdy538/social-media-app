






import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const EditInternshipCompletionReport = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const { state } = useLocation();

  const applicationId = state?.applicationId;

const reportId = state?.reportId;

    const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [reportData, setReportData] = useState({
    intern: {
      name: "",
      role: "",
      image: "",
      field: "",
      university: "",
      appliedDate: "",
    },
    internship: {
      company: "",
      supervisor: "",
      location: "",
      duration: "",
      category: "",
      type: "",
      startDate: "",
      endDate: "",
      totalHours: "",
    },
    skills: "",
    tasks: "",
    performance: "",
    feedback: "",
    attendance: "",
    evaluationDate: "",
  });


  const [ids, setIds] = useState({
    candidateId: "",
    internshipId: "",
  });


  useEffect(() => {
    if (!applicationId ) {
      toast.error("Missing applicationId ");
      setLoadingData(false);
      return;
    }

    const fetchRelatedData = async () => {
      try {
 
        const relatedRes = await axios.get(
          `${base_url}/api/Application/ReportRelatedData?applicationId=${applicationId}`
        );
        const relatedData = relatedRes.data?.data;

        if (!relatedData) {
          toast.error("No data returned from API");
          setLoadingData(false);
          return;
        }

        setIds({
          candidateId: relatedData.candidateId,
          internshipId: relatedData.internshipId,
        });

 
        const reportRes = await axios.get(
          `${base_url}/api/Application/Report/${reportId}`
        );
         const report = reportRes.data?.data;;


 setReportData((prev) => ({
  ...prev,
  intern: {
    ...prev.intern,
    name: relatedData.candidateName || "Unknown",
    role: relatedData.candidateMajor || "Unknown",
    image: relatedData.candidateProfilePhotoUrl || "/src/assets/sections/profile.png",
    field: relatedData.requiredField || "Unknown",
    university: relatedData.candidateUniversityName || "Unknown",
    appliedDate: relatedData.appliedAt
      ? new Date(relatedData.appliedAt).toLocaleDateString()
      : "",
  },
  internship: {
    ...prev.internship,
    company: relatedData.companyName || "Unknown",
    supervisor: relatedData.internshipSupervisor || "Unknown",
    location: relatedData.companyLocation || "Unknown",
    duration: relatedData.duration || "Unknown",
    category: relatedData.requiredField || "Unknown",
    type: relatedData.type === 1 ? "Full Time" : "Part Time",
    startDate: report?.startDate
      ? new Date(report.startDate).toISOString().split("T")[0]
      : "",
    endDate: report?.endDate
      ? new Date(report.endDate).toISOString().split("T")[0]
      : "",
    totalHours: report?.totalHours || "",
  },

  // هنا بقى
  evaluationDate: report?.createdAt
    ? new Date(report.createdAt).toISOString().split("T")[0]
    : "",

  skills: report?.acquiredSkills || "",
  performance: report?.evaluation || "",
  feedback: report?.comments || "",
  attendance: report?.attendanceRate || "",
  tasks: (relatedData.internshipResponsibilities || "").replace(/<br>/g, "\n"),
}));

        setLoadingData(false);
      } catch (err) {
        toast.error("Failed to fetch data");
        setLoadingData(false);
      }
    };

    fetchRelatedData();
  },[applicationId, reportId]);

  const submitReport = async () => {
    setLoadingSubmit(true);

    try {
      const body = {
        candidateId: ids.candidateId,
        internshipId: ids.internshipId,
        startDate: reportData.internship.startDate,
        endDate: reportData.internship.endDate,
        attendanceRate: Number(reportData.attendance),
        totalHours: Number(reportData.internship.totalHours),
        createdAt: reportData.evaluationDate,

        acquiredSkills: reportData.skills,
        evaluation: reportData.performance,
        comments: reportData.feedback,
      };

       console.log("PUT body:", body);
    console.log("PUT body (JSON):", JSON.stringify(body, null, 2));
      const res = await axios.put(
        `${base_url}/api/Application/Report/${reportId}`,
        body
      );

      if (res.data?.succeeded) {
        toast.success("Report updated successfully ✅");
        navigate(`/user-application/${applicationId}`);

      } else {
        toast.error(res.data?.message || "Update failed ❌");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update report ❌"
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

    const cancelAction = async () => {
      setLoadingCancel(true);
      await new Promise((resolve) => setTimeout(resolve, 700));

      setLoadingCancel(false);
      navigate(`/user-application/${applicationId}`);
    };


  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  if (!reportId) {
  toast.error("Missing reportId");
  setLoadingData(false);
  return;
}

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6 sm:ms-10">
        <h2 className="text-xl sm:text-2xl font-bold">
          Internship Completion Report
        </h2>
        <p className="text-gray-500 text-sm">
          Evaluate the intern's performance and provide feedback
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-4 sm:p-6">
        {/* Intern Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex items-center gap-4 flex-1">
            <img
              src={reportData.intern.image}
              alt="profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-2xl sm:text-3xl">
                {reportData.intern.name}
              </h3>
              <p className="ms-2 text-sm sm:text-md font-bold dark-blue">
                {reportData.intern.role}
              </p>
            </div>
          </div>

          <div className="flex-1 border border-gray-200 shadow rounded-xl p-4 text-sm space-y-2">
            <p className="font-bold">💻 {reportData.intern.field}</p>
            <p className="font-bold">🎓 {reportData.intern.university}</p>
            <p className="font-bold">
              📅 Applied On: {reportData.intern.appliedDate}
            </p>
          </div>
        </div>

        {/* Internship Reference */}
        <div className="border border-gray-200 shadow rounded-xl p-4 sm:p-5 mb-6">
          <h4 className="font-bold text-lg sm:text-xl mb-4">
            Internship Reference
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {[
              ["Company Name", reportData.internship.company],
              ["Supervisor Name", reportData.internship.supervisor],
              ["Company Location", reportData.internship.location],
              ["Internship Duration", reportData.internship.duration],
              ["Internship Category", reportData.internship.category],
              ["Internship Type", reportData.internship.type],
            ].map(([label, value], idx) => (
              <div key={idx}>
                <p className="text-gray-500">{label}</p>
                <p className="text-base sm:text-lg font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dates & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            ["Start Date", "date", reportData.internship.startDate, "startDate"],
            ["End Date", "date", reportData.internship.endDate, "endDate"],
            ["Total Hours", "text", reportData.internship.totalHours, "totalHours"],
          ].map(([label, type, value, key]) => (
            <div key={key}>
              <label className="text-base sm:text-lg font-semibold">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    internship: {
                      ...reportData.internship,
                      [key]: e.target.value,
                    },
                  })
                }
                className="w-full border rounded-lg px-3 py-2 border-black "
              />
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="text-lg font-bold">Skills Gained</label>
          <p className="text-gray-500 text-sm ms-2 sm:ms-5">
            Please indicate the skills acquired by the student throughout the internship period.
          </p>
          <input
            type="text"
            placeholder="e.g. UI/UX"
            value={reportData.skills}
            onChange={(e) =>
              setReportData({ ...reportData, skills: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-2"
          />
        </div>

        {/* Tasks */}
        <div className="mb-6">
          <label className="text-lg font-bold">
            Tasks & Responsibilities
          </label>
          <textarea
            rows="4"
            maxLength={500}
            value={reportData.tasks}
            onChange={(e) =>
              setReportData({ ...reportData, tasks: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-2"
          />
          <p className="text-right text-xs text-gray-400">
            {reportData.tasks.length} / 500
          </p>
        </div>

        {/* Performance */}
        <div className="mb-6">
          <label className="text-lg font-bold">
            Performance Evaluation
          </label>
          <textarea
            rows="4"
            maxLength={500}
            value={reportData.performance}
            onChange={(e) =>
              setReportData({ ...reportData, performance: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-2"
          />
          <p className="text-right text-xs text-gray-400">
            {reportData.performance.length} / 500
          </p>
        </div>

        {/* Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <label className="text-lg font-bold">
              Supervisor Feedback
            </label>
            <textarea
              rows="4"
              value={reportData.feedback}
              onChange={(e) =>
                setReportData({ ...reportData, feedback: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-2"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-bold text-sm">
                Attendance Rate
              </label>
              <input
                type="text"
                value={reportData.attendance}
                onChange={(e) =>
                  setReportData({ ...reportData, attendance: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="font-bold text-sm">
                Evaluation Date
              </label>
              <input
                type="date"
                value={reportData.evaluationDate}
                onChange={(e) =>
                  setReportData({ ...reportData, evaluationDate: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 border-black "
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            className="px-6 py-2 rounded-lg bg-dark-blue text-white text-sm flex items-center justify-center gap-2"
            disabled={loadingSubmit}
            onClick={submitReport}
          >
            {loadingSubmit && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Submit
          </button>

          <button
            className="px-6 py-2 rounded-lg border text-sm text-red-500 flex items-center justify-center gap-2"
            disabled={loadingCancel}
            onClick={cancelAction}
          >
            {loadingCancel && (
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            )}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInternshipCompletionReport;




