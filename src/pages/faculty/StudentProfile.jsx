import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import personImage from "../../assets/sections/profile.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function StudentProfile() {
  const { state } = useLocation();
  const candidateId = state?.studentId;

  const [loadingReportId, setLoadingReportId] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    if (candidateId) {
      fetchCandidateDetails();
      fetchInternshipsHistory();
    }
  }, [candidateId]);

  const fetchCandidateDetails = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/College/Candidate-details/${candidateId}`
      );
      const result = await res.json();

      if (result.succeeded) {
        setStudentProfile(result.data);
      }
    } catch {
      toast.error("Failed to load student profile");
    }
  };

  const fetchInternshipsHistory = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/College/Candidate-InternshipsHistory/${candidateId}`
      );
      const result = await res.json();

      if (result.succeeded) {
        setInternships(result.data || []);
      }
    } catch {
      toast.error("Failed to load internships history");
    }
  };

  const handleViewReport = async (id) => {
    setLoadingReportId(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoadingReportId(null);
    console.log("View Report for reportId:", id);
  };

  if (!studentProfile) return null;

  return (
    <div className="min-h-screen w-full lg:w-[90%] mx-auto p-4 lg:p-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 shadow">
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          <img
            src={studentProfile.profilePhotoUrl || personImage}
            alt="avatar"
            className="w-24 h-24 lg:w-30 lg:h-30 rounded-full object-cover mx-auto lg:mx-0"
          />

          <div className="flex flex-col w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl lg:text-3xl font-semibold">
                  {studentProfile.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  Student Code: {studentProfile.studentCode}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg self-start lg:self-auto">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 text-white font-semibold">
                  ⏱
                </div>
                <div>
                  <p className="dark-blue font-bold text-xl">
                    {internships.reduce(
                      (acc, i) => acc + i.totalHours,
                      0
                    )}
                  </p>
                  <p className="text-sm dark-blue">
                    Total Training Hours
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between text-sm text-gray-600 mt-4 gap-2">
              <span>
                <span className="font-bold text-black">Academic Year:</span>{" "}
                {studentProfile.academicYear}
              </span>
              <span className="hidden lg:inline">|</span>
              <span>
                <span className="font-bold text-black">Department:</span>{" "}
                {studentProfile.department}
              </span>
              <span className="hidden lg:inline">|</span>
              <span>
                <span className="font-bold text-black">
                  Enrollment Date:
                </span>{" "}
                {new Date(
                  studentProfile.enrollmentDate
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-2 text-sm">
              <span>
                <span className="font-bold">GPA:</span>{" "}
                {studentProfile.gpa}
              </span>
              <span className="hidden lg:inline lg:ms-43 lg:me-15">|</span>
              <span>
                <span className="font-bold">Grade:</span>{" "}
                {studentProfile.grade}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg my-10 shadow">
        <h3 className="text-xl lg:text-2xl ps-6 lg:ps-10 font-bold mt-6 mb-4 dark-blue">
          Internships History
        </h3>

        <div className="space-y-5 mx-4 lg:mx-10 my-5">
          {internships.map((item) => (
            <div
              key={item.reportId}
              className="bg-blue-50 rounded-xl p-4 lg:p-5 border border-blue-200"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex gap-4 items-start">
<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
  <img
    src={item.companyLogoUrl}
    alt="company logo"
    className="w-full h-full object-cover"
  />
</div>

                  <div>
                    <h4 className="font-bold text-lg lg:text-xl">
                      {item.internshipTitle}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.companyName}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      <div className="px-3 py-1 rounded-full text-gray-600 border">
                        <span className="font-bold">
                          Attendance Rate:
                        </span>{" "}
                        {item.attendanceRate}%
                      </div>

                      <div className="px-3 py-1 rounded-full text-gray-600 border">
                        <span className="font-bold">
                          Total Hours:
                        </span>{" "}
                        {item.totalHours}H
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 self-start lg:self-auto">
                  {new Date(item.startDate).toLocaleDateString()} -{" "}
                  {new Date(item.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4">
                <h5 className="font-bold text-sm mb-1">
                  Performance Evaluation
                </h5>
                <p className="text-sm text-gray-600">
                  {item.evaluation}
                </p>
              </div>

<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 gap-3">
  <div className="flex items-center gap-2 text-green-600 text-sm">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>
    {(() => {
      switch(item.applicationStatus) {
        case 1: return "New";
        case 2: return "Accepted";
        case 3: return "Interview Pending";
        case 4: return "Finished";
        case 5: return "Rejected";
        default: return "Unknown";
      }
    })()}
  </div>

  <button
    className="bg-dark-blue text-white px-4 py-2 rounded-lg text-sm w-full lg:w-auto flex items-center justify-center gap-2"
    onClick={() => handleViewReport(item.reportId)}
    disabled={loadingReportId === item.reportId} 
  >
    {loadingReportId === item.reportId && (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    )}
    View Report
  </button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}