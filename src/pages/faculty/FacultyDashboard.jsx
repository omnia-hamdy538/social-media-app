import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import keyIcon from "../../assets/sections/copy.png";
import userImg from "../../assets/sections/person.png";
import previewIcon from "../../assets/sections/preview.png";

import documents from "../../assets/sections/documents.png";
import active from "../../assets/sections/active.png";
import app from "../../assets/sections/app.png";
import ongoing from "../../assets/sections/ongoing.png";
import back from "../../assets/sections/back.jpg";
import arrowUp from "../../assets/sections/arrowup.png";
import teleIcon from "../../assets/sections/tele.png";

const ITEMS_PER_PAGE = 10;
const COLLEGE_ID = "3548AFCD-EEAD-4DA7-B9B0-DC764DCBE6E4";
const BASE_URL =  import.meta.env.VITE_BASE_URL;
const FacultyDashboard = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [affiliationKey, setAffiliationKey] = useState("");
  const [previewLoadingId, setPreviewLoadingId] = useState(null);

  const [collegeName, setCollegeName] = useState("");
  const [universityName, setUniversityName] = useState("");

  const [statsData, setStatsData] = useState([
    { id: 1, title: "Verified Companies", value: 0, image: documents },
    { id: 2, title: "Completed Internships", value: 0, image: active },
    { id: 3, title: "Affiliated Students", value: 0, image: app },
    { id: 4, title: "Completed Hours", value: 0, image: ongoing },
  ]);

  const [studentsData, setStudentsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [academicYears, setAcademicYears] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetchDashboardDetails();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, selectedYear, selectedDepartment]);

  const fetchDashboardDetails = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/College/dashboard-details?collageId=${COLLEGE_ID}`
      );
      const result = await res.json();

      if (result.succeeded) {
        const data = result.data;
        setCollegeName(data.collageName);
        setUniversityName(data.universityName);
        setAffiliationKey(data.key);

        setStatsData([
          {
            id: 1,
            title: "Verified Companies",
            value: data.companiesCount,
            image: documents,
          },
          {
            id: 2,
            title: "Completed Internships",
            value: data.reportsCount,
            image: active,
          },
          {
            id: 3,
            title: "Affiliated Students",
            value: data.studentsCount,
            image: app,
          },
          {
            id: 4,
            title: "Completed Hours",
            value: data.totalTrainingHours,
            image: ongoing,
          },
        ]);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/College/dashboard/filters/${COLLEGE_ID}`
      );
      const result = await res.json();

      if (result.succeeded) {
        setAcademicYears(result.data.academicYears || []);
        setDepartments(result.data.departments || []);
      }
    } catch (error) {
      toast.error("Failed to load filters");
    }
  };

  const fetchStudents = async () => {
    try {
      const query = new URLSearchParams({
        collageId: COLLEGE_ID,
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
        academicYear: selectedYear || "",
        department: selectedDepartment || "",
      }).toString();

      const res = await fetch(
        `${BASE_URL}/api/College/dashboard-AffiliatedStudents?${query}`
      );
      const result = await res.json();

      if (result.succeeded) {
        setStudentsData(result.data.data || []);
        setTotalPages(result.data.totalPages || 1);
      }
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(affiliationKey);
    toast.success("Affiliation Key Copied!");
  };

const handleRegenerateKey = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/College/Regenerate-Key/${COLLEGE_ID}`,
      {
        method: "PATCH",
      }
    );

    const result = await res.json();

    if (result.succeeded) {
      setAffiliationKey(result.data);
      navigator.clipboard.writeText(result.data);
      toast.success("New Key Generated & Copied!");

      console.log("Key regenerated successfully ✅");
      console.log("New Key:", result.data);
    } else {
      console.log("Regenerate failed ❌", result);
    }
  } catch (error) {
    console.error("Error while regenerating key ❌", error);
  }
};

const handlePreview = async (studentId) => {
  setPreviewLoadingId(studentId);
  await new Promise((resolve) => setTimeout(resolve, 800));
  setPreviewLoadingId(null);
  navigate("/student-profile", { state: { studentId } });
};

  return (
    <div className="min-h-screen relative">
      

      <div className="px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome back, {collegeName} - {universityName}!
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Manage your verified companies and track your affiliated students
            internships progress.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4 w-full sm:w-[420px]">
          <div className="flex items-start gap-3">
            <img src={teleIcon} className="w-10 h-10 shrink-0" />
            <div className="w-full">
              <p className="font-bold dark-blue text-lg mb-2">
                Students Affiliation Key
              </p>

              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <span className="text-sm truncate flex-1">
                  {affiliationKey}
                </span>
                <button
                  onClick={handleCopyKey}
                  className="p-2 rounded hover:bg-gray-200 shrink-0"
                >
                  <img src={keyIcon} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleRegenerateKey}
            className="mt-3 w-full bg-dark-blue text-white py-2 rounded-lg text-sm"
          >
            Regenerate Key
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${back})` }}
        />
        <div className="absolute inset-0 bg-dark-blue-without-hover opacity-85" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-10">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-5 flex items-center gap-4"
            >
              <img src={stat.image} className="w-10 sm:w-12" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
            <h2 className="font-bold text-xl dark-blue">
              Affiliated Students
            </h2>
            <div className="flex gap-3">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none border border-gray-700 rounded-lg px-4 py-2 text-sm pr-10 bg-no-repeat bg-right"
                style={{
                  backgroundImage: `url(${arrowUp})`,
                  backgroundPosition: "right 12px center",
                  backgroundSize: "14px",
                }}
              >
                <option value="" disabled>Academic Year</option>
                {academicYears.map((year, i) => (
                  <option key={i} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none border border-gray-700 rounded-lg px-4 py-2 text-sm pr-10 bg-no-repeat bg-right"
                style={{
                  backgroundImage: `url(${arrowUp})`,
                  backgroundPosition: "right 12px center",
                  backgroundSize: "14px",
                }}
              >
                <option value="" disabled>Department</option>
                {departments.map((dep, i) => (
                  <option key={i} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="border-b text-gray-400">
                <tr>
                  <th className="text-left py-3">Student Name</th>
                  <th>Academic Year</th>
                  <th>Department</th>
                  <th>Enrollment Date</th>
                  <th>Student Code</th>
                  <th>Completed Internships</th>
                  <th>Completed Hours</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {studentsData.map((student) => (
                  <tr
                    key={student.candidateId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 flex items-center gap-2">
                      <img
                        src={userImg}
                        className="w-8 h-8 rounded-full"
                      />
                      {student.fullName}
                    </td>
                    <td className="text-center">
                      {student.academicYear}
                    </td>
                    <td className="text-center">
                      {student.department}
                    </td>
                    <td className="text-center">
                      {new Date(
                        student.enrollmentDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {student.studentCode}
                    </td>
                    <td className="text-center">
                      {student.completionReportsCount}
                    </td>
                    <td className="text-center">
                      {student.totalTrainingHours}
                    </td>
                    <td className="text-center">
                      <button
                        className="p-2 rounded hover:bg-gray-100 flex items-center justify-center"
                        onClick={() =>
                          handlePreview(student.candidateId)
                        }
                        disabled={
                          previewLoadingId === student.candidateId
                        }
                      >
                        {previewLoadingId ===
                        student.candidateId ? (
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <img
                            src={previewIcon}
                            className="w-5 mx-auto"
                          />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-dark-blue text-white"
                    : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;