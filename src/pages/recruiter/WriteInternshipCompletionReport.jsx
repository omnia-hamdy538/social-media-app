
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WriteInternshipCompletionReport = () => {
const location = useLocation();
const companyId = location.state?.companyId;
  const { applicationId } = useParams();
  const base_url = import.meta.env.VITE_BASE_URL;

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
 const navigate = useNavigate();
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
      companyLogo: "",
    },
    skills: "",
    tasks: "",
    performance: "",
    feedback: "",
    attendance: "",
    evaluationDate: "",
  });

  const [candidateId, setCandidateId] = useState("");
  const [internshipId, setInternshipId] = useState("");

  const mapType = (type) => {
    switch (type) {
      case 1:
        return "Onsite";
      case 2:
        return "Remote";
      case 3:
        return "Hybrid";
      default:
        return "Not exist";
    }
  };

  useEffect(() => {
    const fetchReportRelatedData = async () => {
      try {
        const res = await axios.get(
          `${base_url}/api/Application/ReportRelatedData?applicationId=${applicationId}`
        );

        const data = res.data?.data;

        if (!data) {
          toast.error("Failed to load report related data");
          return;
        }

        setCandidateId(data.candidateId || "");
        setInternshipId(data.internshipId || "");

        setReportData((prev) => ({
          ...prev,
          intern: {
            ...prev.intern,
            name: data.candidateName || "",
            role: data.internshipTitle || "",
            field: data.requiredField || "",
            university: data.candidateUniversityName || "",
            appliedDate: data.appliedAt
              ? new Date(data.appliedAt).toLocaleDateString()
              : "",
            image: data.candidateProfilePhotoUrl || "",
          },
          internship: {
            ...prev.internship,
            company: data.companyName || "",
            supervisor: data.internshipSupervisor || "",
            location: data.companyLocation || "",
            duration: data.duration || "",
            category: data.requiredField || "",
            type: mapType(data.type),
          },
          tasks: data.internshipResponsibilities
            ? data.internshipResponsibilities.replace(/<br>/g, "\n")
            : "",
        }));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch report related data ❌");
      }
    };

    if (applicationId) fetchReportRelatedData();
  }, [applicationId]);

  return (
    <div className="min-h-screen  px-4 sm:px-6 py-6">
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
              src={
                reportData.intern.image ||
                "/src/assets/sections/profile.png"
              }
              alt="company logo"
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
                <p className="text-base sm:text-lg font-semibold">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dates & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            ["Start Date", "date", reportData.internship.startDate, "startDate"],
            ["End Date", "date", reportData.internship.endDate, "endDate"],
            ["Total Hours", "number", reportData.internship.totalHours, "totalHours"],
          ].map(([label, type, value, key]) => (
            <div key={key}>
              <label className="text-base sm:text-lg font-bold">
                {label}
              </label>
              <input
                placeholder={label === "Total Hours" ? "240 Hours" : ""}
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
                placeholder="100"
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    attendance: e.target.value,
                  })
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
                  setReportData({
                    ...reportData,
                    evaluationDate: e.target.value,
                  })
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
            onClick={async () => {
              setLoadingSubmit(true);

              try {
                if (!candidateId || !internshipId) {
                  toast.error("Missing candidateId or internshipId");
                  setLoadingSubmit(false);
                  return;
                }

                           
                const start = new Date(reportData.internship.startDate);
                const end = new Date(reportData.internship.endDate);

                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                  toast.error("Start Date or End Date is invalid");
                  setLoadingSubmit(false);
                  return;
                }


                if (start.getTime() > end.getTime()) {
                  toast.error("End Date must be after Start Date");
                  setLoadingSubmit(false);
                  return;
                }

                
                const attendanceValue = Number(reportData.attendance);
                if (isNaN(attendanceValue) || attendanceValue < 0 || attendanceValue > 100) {
                  toast.error("Attendance Rate must be between 0 and 100");
                  setLoadingSubmit(false);
                  return;
                }

                const body = {
                  candidateId,
                  internshipId,
                  startDate: start.toISOString(),
                  endDate: end.toISOString(),
                  attendanceRate: attendanceValue,
                  totalHours: Number(reportData.internship.totalHours) || 0,
                  acquiredSkills: reportData.skills,
                  evaluation: reportData.performance,
                  comments: reportData.feedback,
                  evaluationDate: reportData.evaluationDate || null,
                };

                if (!companyId) {
                    toast.error("Missing companyId");
                    setLoadingSubmit(false);
                    return;
                  }


                console.log("POST body:", body);

                const res = await axios.post(
                `${base_url}/api/Application/Report?companyId=${companyId}`,
                body
              );


                if (res.data?.succeeded) {
                  toast.success("Report Submitted ✅");
                  navigate(`/user-application/${applicationId}`);
                } else {
                  toast.error(res.data?.message || "Submission failed ❌");
                }
              } catch (err) {
                console.log(err.response?.data);
                const msg = err.response?.data?.message;
                if (msg?.includes("Report already exists")) {
                  toast.error("Report already exists for this candidate.");
                } else {
                  toast.error("Submission failed ❌");
                }
              }

              setLoadingSubmit(false);
            }}
          >
            {loadingSubmit && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Submit
          </button>

          <button
            className="px-6 py-2 rounded-lg border text-sm text-red-500 flex items-center justify-center gap-2"
            disabled={loadingCancel}
            onClick={async () => {
              setLoadingCancel(true);
              await new Promise((resolve) => setTimeout(resolve, 700));
              setLoadingCancel(false);
              
            }}
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

export default WriteInternshipCompletionReport;




















