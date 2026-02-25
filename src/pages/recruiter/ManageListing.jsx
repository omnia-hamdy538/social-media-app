import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PlusIcon from "../../assets/sections/plus-icon.png";
import users from "../../assets/sections/users.png";
import activity from "../../assets/sections/activity.png";
import checkcircle from "../../assets/sections/check-circle.png";
// import ArrowUp from "../../assets/sections/arrow-up.png";
import SelectArrow from "../../assets/sections/ArrowUp.png";
import editIcon from "../../assets/sections/edit.png";
import deleteIcon from "../../assets/sections/delete.png";
import previewIcon from "../../assets/sections/preview.png";
import rec from "../../assets/sections/Rectangle.png";
import toast from "react-hot-toast";

const locations = ["Cairo", "Alexandria", "Remote"];
const statuses = ["Open", "Closed"];
const dates = ["Newest", "Oldest"];
const types = ["On-site", "Remote", "Hybrid"];

export default function ManagementList() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [internships, setInternships] = useState([]);
  const [stats, setStats] = useState({ totalApplications: 0, completedInternships: 0, activeNowInternships: 0 });
  const [filters, setFilters] = useState({ location: "", status: "", type: "", date: "" });

  const [loadingEdit, setLoadingEdit] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/CompanyManagement/stats?companyId=8CD28A44-84CB-4364-8426-089BE1B9D65E`)
      .then((res) => setStats(res.data.data))
      .catch((err) => toast.error(err.response?.data?.message || "Error fetching stats"));

    fetchInternships();
  }, [baseUrl]);

  const fetchInternships = () => {
    axios
      .get(
        `${baseUrl}/api/CompanyManagement/internships?companyId=BD586793-9A42-4B95-B64F-04BD3F894120&page=1&pageSize=10&type=1&status=1&sortOrder=1`
      )
      .then((res) => {
          setInternships(
            res.data.data?.data?.map((item, index) => ({
              id: item.internshipId, 

              title: item.title,
              type: item.workType === 0 ? "On-site" : item.workType === 1 ? "Remote" : "Hybrid",
              applicants: item.applicantsCount,
              status: item.status === 1 ? "Open" : "Closed",
              postedOn: new Date(item.createdAt).toLocaleDateString(),
              createdAt: new Date(item.createdAt), 
            })) || []
          );

      })
      .catch((err) => toast.error(err.response?.data?.message || "Error fetching internships"));
  };

const filteredInternships = internships.filter((item) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  let dateMatch = true;

  if (filters.date === "Newest") {
    dateMatch = item.createdAt >= threeMonthsAgo;
  }

  if (filters.date === "Oldest") {
    dateMatch = item.createdAt < threeMonthsAgo;
  }

  return (
    (!filters.location || item.location === filters.location) &&
    (!filters.status || item.status === filters.status) &&
    (!filters.type || item.type === filters.type) &&
    dateMatch
  );
});


  const hasData = filteredInternships.length > 0;

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const currentData = filteredInternships.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">

      {/* ===== Cards ===== */}
      <div className="bg-white shadow-sm rounded-lg mb-8 py-6 w-full lg:w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          <div className="p-6 flex items-center relative">
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-px bg-gray-200" />
            <div className="w-16 h-16 me-4 bg-blue-100 rounded-full flex items-center justify-center">
              <img src={users} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Applicants</p>
              <p className="text-xl font-bold">{stats.totalApplications}</p>
              {/* <p className="text-sm mt-1 flex items-center gap-1">
                <img src={ArrowUp} className="w-4 h-4" />
                <span className="soft-blue font-bold">0%</span>
                this month
              </p> */}
            </div>
          </div>

          <div className="p-6 flex items-center relative">
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-px bg-gray-200" />
            <div className="w-16 h-16 me-4 bg-blue-100 rounded-full flex items-center justify-center">
              <img src={checkcircle} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-xl font-bold">{stats.completedInternships}</p>
            </div>
          </div>

          <div className="p-6 flex items-center">
            <div className="w-16 h-16 me-4 bg-blue-100 rounded-full flex items-center justify-center">
              <img src={activity} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Now</p>
              <p className="text-xl font-bold">{stats.activeNowInternships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="soft-blue font-semibold mb-6 text-lg">All Internships Summary Table</h2>

        {/* ===== Filters ===== */}
        <div className="flex flex-wrap gap-4 mb-10 items-center">
          {[
            { label: "Location", key: "location", data: locations },
            { label: "Status", key: "status", data: statuses },
            { label: "Date", key: "date", data: dates },
            { label: "Type", key: "type", data: types },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <select
                value={filters[item.key]}
                onChange={(e) => {
                  setFilters({ ...filters, [item.key]: e.target.value });
                  setCurrentPage(1);
                }}
                className="appearance-none text-xs font-semibold border border-gray-200 rounded-2xl py-2 px-6 pr-10"
              >
                <option value="">{item.label}</option>
                {item.data.map((el, i) => (
                  <option key={i} value={el}>{el}</option>
                ))}
              </select>
              <img src={SelectArrow} className="absolute right-4 top-1/2 -translate-y-1/2 w-3" />
            </div>
          ))}

          <p className="text-xs text-gray-600 ms-50">{filteredInternships.length} Internships</p>

          <button
            disabled={loadingReset}
            onClick={() => {
              setLoadingReset(true);
              setTimeout(() => {
                setFilters({ location: "", status: "", type: "", date: "" });
                setCurrentPage(1);
                setLoadingReset(false);
              }, 500);
            }}
            className="soft-blue font-bold ms-60 flex items-center gap-2 disabled:opacity-60"
          >
            Reset
            {loadingReset && <div className="w-3 h-3 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />}
          </button>
        </div>

        {/* ===== Data / Empty ===== */}
        {hasData ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full text-sm">
                <thead className="text-gray-400 border-b">
                  <tr>
                    <th className="text-left py-3">Internship Title</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Applicants</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Posted On</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <img src={rec} className="w-3 h-3" />
                        <span className="font-medium">{item.title}</span>
                      </td>
                      <td className="text-center">{item.type}</td>
                      <td className="text-center">{item.applicants}</td>
                      <td className="text-center">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${item.status === "Open" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-center">{item.postedOn}</td>
                      <td className="flex justify-center gap-3 py-4">
                        <button
                          disabled={loadingEdit === item.id}
                            onClick={() => {
                              setLoadingEdit(item.id);
                              setTimeout(() => {
                                navigate(`/dashboard/internship/${item.id}/edit`);
                                setLoadingEdit(null);
                              }, 700);
                            }}

                        >
                          {loadingEdit === item.id ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <img src={editIcon} className="cursor-pointer" />
                          )}
                        </button>

                        <button
                          disabled={loadingDelete === item.id}
                          onClick={() => {
                            setLoadingDelete(item.id);
                            axios.delete(`${baseUrl}/api/Internship/${item.id}`)
                              .then((res) => {
                                console.log("Internship deleted successfully"); // Console log
                                toast.success("Internship deleted successfully 🗑️"); // Toast
                                setInternships((prev) => prev.filter((i) => i.id !== item.id));
                              })
                              .catch((err) => toast.error(err.response?.data?.message || "Error deleting internship"))
                              .finally(() => setLoadingDelete(null));
                          }}
                        >
                          {loadingDelete === item.id ? (
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <img src={deleteIcon} className="cursor-pointer" />
                          )}
                        </button>

                        <button
                          disabled={loadingPreview === item.id}
                          onClick={() => {
                            setLoadingPreview(item.id);
                            setTimeout(() => {
                              navigate(`/dashboard/internship/${item.id}`);
                              setLoadingPreview(null);
                            }, 700);
                          }}
                        >
                          {loadingPreview === item.id ? (
                            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <img src={previewIcon} className="cursor-pointer" />
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
                <button key={i} onClick={() => goToPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-dark-blue text-white" : "bg-gray-100"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">&gt;</button>
            </div>
          </>
        ) : (
          <div className="w-full lg:w-[90%] mx-auto border border-gray-200 rounded-lg p-10 mt-30 flex flex-col items-center">
            <img src={PlusIcon} className="mb-6 mt-10" />
            <p className="dark-blue font-bold mb-12">No Internship Created yet</p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                disabled={loadingCreate}
                onClick={() => {
                  setLoadingCreate(true);
                  setTimeout(() => {
                    navigate("/post-internship");
                    setLoadingCreate(false);
                  }, 700);
                }}
                className="bg-dark-blue text-white px-6 py-2 rounded flex items-center justify-center gap-2"
              >
                Create your First internship
                {loadingCreate && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              </button>

              <button
                disabled={loadingDashboard}
                onClick={() => {
                  setLoadingDashboard(true);
                  setTimeout(() => {
                    navigate("/dashboard");
                    setLoadingDashboard(false);
                  }, 700);
                }}
                className="border border-blue-900 text-blue-900 px-6 py-2 rounded flex items-center justify-center gap-2"
              >
                Go to dashboard
                {loadingDashboard && <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
