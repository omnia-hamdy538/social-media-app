import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import StatCard from "../../Component/StatCard";
import ActiveInternshipsTable from "../../Component/ActiveInternshipsTable";
import RecentApplicantsTable from "../../Component/RecentApplicantsTable";

import active from "../../assets/sections/active.png";
import app from "../../assets/sections/app.png";
import documents from "../../assets/sections/documents.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [statsData, setStatsData] = useState([]);
  const [activeInternships, setActiveInternships] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const companyId = "BD586793-9A42-4B95-B64F-04BD3F894120";

  // ===== Fetch Stats =====
  const fetchStats = () => {
    axios
      .get(`${baseUrl}/api/company/dashboard/stats?companyId=${companyId}`)
      .then(res => {
        const apiData = res.data.data;
        setStatsData([
          { id: 1, title: "Total Internships Posts", value: apiData.totalInternships, image: documents },
          { id: 2, title: "Active Internships", value: apiData.activeInternships, image: active },
          { id: 3, title: "Total Applications", value: apiData.totalApplications, image: app },
        ]);
      })
      .catch(err => setError(err.response?.data?.message || "Error fetching stats"));
  };

  // ===== Fetch Active Internships =====
  const fetchActiveInternships = () => {
    axios
      .get(`${baseUrl}/api/company/dashboard/active-internships?companyId=${companyId}&page=1&pageSize=10`)
      .then(res => {
        const mappedData = res.data.data.data.map(item => ({
          id: item.internshipId,
          title: item.title,
          createdAt: item.createdAt,
          status: item.status,
          applicationsCount: item.applicationsCount,
        }));
        setActiveInternships(mappedData);
      })
      .catch(err => setError(err.response?.data?.message || "Error fetching active internships"));
  };

  // ===== Fetch Recent Applicants =====
  const fetchRecentApplicants = () => {
    axios
      .get(`${baseUrl}/api/company/dashboard/recent-applicants?companyId=${companyId}&limit=5`)
      .then(res => {
        const mappedData = res.data.data.map(item => ({
          id: item.applicationId,
          fullName: item.candidateName,
          internshipTitle: item.internshipTitle,
          appliedAt: item.appliedAt,
          status: item.status,
          avatar: item.profilePhotoUrl,
        }));
        setRecentApplicants(mappedData);
      })
      .catch(err => setError(err.response?.data?.message || "Error fetching recent applicants"));
  };

  // ===== useEffect =====
  useEffect(() => {
    fetchStats();
    fetchActiveInternships();
    fetchRecentApplicants();
  }, [baseUrl]);

  // ===== Handlers =====
  const handleActivePreview = (internshipId) => {
    navigate(`/dashboard/internship/${internshipId}`);
  };

  const handleEdit = (internshipId) => {
    navigate(`/dashboard/internship/${internshipId}/edit`);
  };

  const handleDelete = async (internshipId, stopLoading) => {
    try {
      await axios.delete(`${baseUrl}/api/Internship/${internshipId}`);
      setActiveInternships(prev => prev.filter(item => item.id !== internshipId));
      toast.success("Internship deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete internship");
    } finally {
      stopLoading();
    }
  };

  const handleApplicantPreview = (applicantId) => {
    navigate(`/user-application/${applicantId}`);
  };

  const handleCreateInternship = async () => {
    setBtnLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    navigate("/post-internship");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ===== Header ===== */}
      <div className="px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, TechCrop!</h1>
          <p className="text-gray-500">
            Here is what is happening with your internship programs today.
          </p>
        </div>

        <button
          onClick={handleCreateInternship}
          disabled={btnLoading}
          className="bg-dark-blue text-white px-7 py-2 rounded-lg flex items-center gap-2 w-fit"
        >
          {btnLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-lg">+</span>
          )}
          Post New Internship
        </button>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/sections/back.jpg')" }}
        />
        <div className="absolute inset-0 bg-dark-blue-without-hover opacity-85" />
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-14 place-items-center">
          {statsData.map(stat => (
            <div className="w-full max-w-[280px]" key={stat.id}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Tables ===== */}
      <div className="px-6 py-8 space-y-10">
        <ActiveInternshipsTable
          data={activeInternships}
          onPreview={handleActivePreview}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <RecentApplicantsTable
          data={recentApplicants}
          onPreview={handleApplicantPreview}
        />
      </div>
    </div>
  );
}
