import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import ArrowUp from "../../assets/sections/ArrowUp.png";
import rectangleImg from "../../assets/sections/Rectangle.png";
import defaultPerson from "../../assets/sections/person.png";
import deleteIcon from "../../assets/sections/delete.png";
import previewIcon from "../../assets/sections/preview.png";

const statusStyle = {
  New: "bg-blue-100 text-blue-600",
  Accepted: "bg-yellow-100 text-yellow-600",
  InterviewPending: "bg-purple-100 text-purple-600",
  Rejected: "bg-red-100 text-red-600",
  Finished: "bg-green-100 text-green-600",
};

export default function InternshipPreview() {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [internshipInfo, setInternshipInfo] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [filtersData, setFiltersData] = useState({ majors: [], universities: [], statuses: [], sortOptions: [] });

  const internshipStatusMap = {
    Open: 1,
    Closed: 2,
  };

  const [filters, setFilters] = useState({
    status: "",
    major: "",
    university: "",
    date: "",
    open: "Open",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(null);

  const navigate = useNavigate();
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const handleGoToFeedbacks = () => {
    setLoadingFeedback(true);
    setTimeout(() => {
      navigate("/feedback", { state: { internshipId: id } });
    }, 300);
  };

  /* ================= Fetch Internship Details ================= */
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/Internship/details/filters/${id}`)
      .then(res => {
        const data = res.data.data;
        setFiltersData({
          majors: data.majors,
          universities: data.universities,
          statuses: data.statuses,
          sortOptions: data.sortOptions,
        });
      })
      .catch(err => console.log("Error fetching filters:", err));

    fetchApplicants();
  }, [id]);

  const fetchApplicants = (statusKey = "", major = "", university = "", sortOrder = 1) => {
    axios
      .get(
        `${baseUrl}/api/Internship/details/${id}?page=${currentPage}&pageSize=${itemsPerPage}&status=${statusKey}&major=${major}&university=${university}&sortOrder=${sortOrder}`
      )
      .then(res => {
        const data = res.data.data;
        setInternshipInfo({
          title: data.title,
          type: data.type,
          status: data.status,
          startDate: new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          duration: data.duration,
          applicantsCount: data.applicantsCount,
          statusCounts: {
            New: data.newCount,
            Accepted: data.acceptedCount,
            InterviewPending: data.interviewPendingCount,
            Rejected: data.rejectedCount,
            Finished: data.finishedCount,
          },
        });

        const mappedApplicants = data.applicants.data.map(item => ({
          applicationId: item.applicationId,
          name: item.candidateName,
          major: item.major,
          university: item.universityName,
          date: new Date(item.appliedAt).toLocaleDateString(),
          status: filtersData.statuses.find(s => s.key === item.applicationStatus)?.value || "New",
          profileImage: "",
        }));
        setApplicants(mappedApplicants);
      })
      .catch(err => console.log("Error fetching internship applicants:", err));
  };

  /* ================= Filtering Logic ================= */
  const filteredApplicants = useMemo(() => {
    let data = [...applicants];

    if (filters.status) data = data.filter(a => a.status === filters.status);
    if (filters.major) data = data.filter(a => a.major === filters.major);
    if (filters.university) data = data.filter(a => a.university === filters.university);

    if (filters.date) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      data = data.filter(a => {
        const submittedDate = new Date(a.date);

        if (filters.date === "new") return submittedDate >= threeMonthsAgo;
        if (filters.date === "old") return submittedDate < threeMonthsAgo;
        return true;
      });
    }

    return data;
  }, [applicants, filters]);

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const currentData = filteredApplicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };
  const handleFilterChange = (key, value) => { setFilters(prev => ({ ...prev, [key]: value })); setCurrentPage(1); };

  // Loading Preview
  const handlePreview = async (applicationId) => {
    try {
      setLoadingPreview(applicationId);
      await new Promise((resolve) => setTimeout(resolve, 400)); // Optional
      navigate(`/user-application/${applicationId}`);
    } finally {
      setLoadingPreview(null);
    }
  };

  //Loading Delete + Toast
  const handleDelete = async (applicationId) => {
    try {
      setLoadingDelete(applicationId);

      await axios.delete(`${baseUrl}/api/Application/${applicationId}`);

      setApplicants(prev =>
        prev.filter(app => app.applicationId !== applicationId)
      );

      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error("Failed to delete application");
      console.log("Error deleting application:", error);
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleInternshipStatusChange = async (newStatus) => {
    try {
      await axios.patch(`${baseUrl}/api/Internship/status/${id}`, {
        status: internshipStatusMap[newStatus],
      });

      setInternshipInfo(prev => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.log("Error updating internship status:", error);
    }
  };

  if (!internshipInfo) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  return (
    <div className="p-6 min-h-screen w-full sm:w-[90%] mx-auto shadow">

      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl text-blue-900 font-bold">{internshipInfo.title || "Internship"}</h1>
          <div className="relative flex items-center mt-2 sm:mt-0">
            <span className="absolute left-3 w-2 h-2 rounded-full bg-green-500"></span>
            <select
              value={internshipInfo.status}
              onChange={(e) => handleInternshipStatusChange(e.target.value)}
              className="appearance-none text-sm text-green-600 border border-gray-300 rounded-md pl-7 pr-8 py-1 bg-white"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            <img src={ArrowUp} className="absolute right-3 top-1/2 -translate-y-1/2 w-3 pointer-events-none" />
          </div>
        </div>
        <button
          className="bg-dark-blue text-white px-5 py-2 rounded-xl text-sm mt-2 sm:mt-0 flex items-center gap-2"
          onClick={handleGoToFeedbacks}
          disabled={loadingFeedback}
        >
          View Feedbacks
          {loadingFeedback && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </button>
      </div>

      {/* ===== Internship Info ===== */}
      <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
        <span>{internshipInfo.type}</span>
        <span className="w-1 h-1 rounded-full bg-gray-900"></span>
        <span>{internshipInfo.startDate}</span>
        <span className="w-1 h-1 rounded-full bg-gray-900"></span>
        <span>{internshipInfo.duration}</span>
        <span className="w-1 h-1 rounded-full bg-gray-900"></span>
        <span>{filteredApplicants.length} Applicants</span>
      </div>

      {/* ===== Filters ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
        <div className="flex gap-3 mb-2 flex-wrap w-full sm:w-auto">
          {[
            { key: "status", placeholder: "Status", options: filtersData.statuses.map(s => s.value) },
            { key: "major", placeholder: "Major", options: filtersData.majors },
            { key: "university", placeholder: "University", options: filtersData.universities },
            { key: "date", placeholder: "Date", options: filtersData.sortOptions.map(s => ({ label: s.value, value: s.key === 1 ? "new" : "old" })) },
          ].map(filter => (
            <div key={filter.key} className="relative me-2">
              <select
                defaultValue=""
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="appearance-none text-xs font-semibold border border-gray-300 rounded-xl py-2 px-4 pr-8 bg-white"
              >
                <option value="" disabled hidden>{filter.placeholder}</option>
                {filter.options.map(opt => typeof opt === "string" ? (
                  <option key={opt} value={opt}>{opt}</option>
                ) : <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <img src={ArrowUp} className="absolute right-3 top-1/2 -translate-y-1/2 w-3 pointer-events-none" />
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 font-semibold mt-2 sm:mt-0">
          {filteredApplicants.length} applicants
        </div>
      </div>

      {/* ===== Status Counts ===== */}
      <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
        {Object.entries(internshipInfo.statusCounts).map(([status, count]) => (
          <React.Fragment key={status}>
            <span className={`font-bold ${statusStyle[status] ? statusStyle[status].split(" ")[1] : ""}`}>{status} ({count})</span>
            <span className="w-1 h-1 rounded-full bg-black"></span>
          </React.Fragment>
        ))}
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="text-gray-400 border-b">
            <tr>
              <th className="p-4 text-left w-[25%]">Candidate</th>
              <th className="text-left w-[15%]">Major</th>
              <th className="text-left w-[20%]">University</th>
              <th className="text-left w-[15%]">Submitted</th>
              <th className=" w-[15%] ">Status</th>
              <th className="text-center w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={rectangleImg} className="w-3 h-3" />
                  <img src={item.profileImage || defaultPerson} className="w-6 h-6 rounded-full" />
                  <span className="font-medium">{item.name}</span>
                </td>
                <td>{item.major}</td>
                <td>{item.university}</td>
                <td>{item.date}</td>
                <td className="text-center">
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="flex justify-center gap-3 py-4">
                  <button
                    onClick={() => handlePreview(item.applicationId)}
                    disabled={loadingPreview === item.applicationId}
                  >
                    {loadingPreview === item.applicationId ? (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <img src={previewIcon} className="cursor-pointer" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(item.applicationId)}
                    disabled={loadingDelete === item.applicationId}
                  >
                    {loadingDelete === item.applicationId ? (
                      <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <img src={deleteIcon} className="cursor-pointer" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Pagination ===== */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">&lt;</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => goToPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-dark-blue text-white" : "bg-gray-100"}`}>{i + 1}</button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">&gt;</button>
      </div>
    </div>
  );
}
