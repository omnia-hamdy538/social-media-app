import React, { useState, useEffect } from "react";
import axios from "axios";

import back from "../../assets/sections/back.jpg";
import google from "../../assets/sections/google.png"; 
import documents from "../../assets/sections/documents.png";
import active from "../../assets/sections/active.png";
import app from "../../assets/sections/app.png";
import ongoing from "../../assets/sections/ongoing.png";
import timeIcon from "../../assets/sections/time.png";
import locationIcon from "../../assets/sections/location.png";
import arrowUp from "../../assets/sections/arrowup.png";
import linkedinIcon from "../../assets/sections/linkedin.png";
import phoneIcon from "../../assets/sections/phone.png";

const ITEMS_PER_PAGE = 6;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminDashboard() {
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });

  const [statsData, setStatsData] = useState([
    { id: 1, title: "Company", value: 0, image: documents },
    { id: 2, title: "Colleges", value: 0, image: active },
    { id: 3, title: "Students", value: 0, image: app },
    { id: 4, title: "Internships", value: 0, image: ongoing },
  ]);

  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dates, setDates] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const userId = "906932F0-4B13-4003-809F-F1A343FFAB2C";

  useEffect(() => {
    fetchDashboardDetails();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchPendingCompanies();
  }, [currentPage, selectedLocation, selectedDate]);

  const fetchDashboardDetails = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/dashboard-details`,
        { params: { UserId: userId } }
      );

      const data = res.data.data;

console.log("Dashboard Details Success ✅", data);


      setStatsData([
        { id: 1, title: "Company", value: data.recruitersCount, image: documents },
        { id: 2, title: "Colleges", value: data.universityAdminsCount, image: active },
        { id: 3, title: "Students", value: data.candidatesCount, image: app },
        { id: 4, title: "Internships", value: data.internshipsCount, image: ongoing },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

const fetchFilters = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/Admin/dashboard/filters`);

    const data = res.data.data;

console.log("Filters Loaded ✅", data);


    setLocations(data.locations || []);
    setDates(data.sortOrders || []);
  } catch (err) {
    console.log(err);
  }
};


  const fetchPendingCompanies = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/dashboard-PendingCompanies`,
        {
          params: {
            page: currentPage,
            pageSize: ITEMS_PER_PAGE,
            location: selectedLocation || undefined,
            sortOrder: selectedDate || undefined,
          },
        }
      );

      const response = res.data.data;

console.log("Pending Companies Loaded ✅", response);


      setPendingCompanies(
        (response.data || []).map((item) => ({
          id: item.companyId,
          name: item.companyName,
          location: item.location,
          description: item.description,
          website: item.websiteUrl,
          linkedin: item.linkedinUrl,
          phone: item.phoneNumber,
          date: new Date(item.createdAt).toLocaleDateString("en-GB"),
          image: item.logoUrl || google,
          status: item.verified,
        }))
      );

      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.log(err);
    }
  };

const handleVerify = async (id) => {
  try {
    setActionLoading({ id, type: "verify" });

    const res = await axios.patch(
      `${BASE_URL}/api/Admin/CompanyVerification/${id}`
    );

    console.log("✅ Company Verified Response:", res.data);

    fetchPendingCompanies();
  } catch (err) {
    console.log("❌ Error:", err.response?.data || err.message);
  } finally {
    setActionLoading({ id: null, type: null });
  }
};


  // const handleReject = async (id) => {
  //   try {
  //     setActionLoading({ id, type: "reject" });

  //     await axios.patch(
  //       `${BASE_URL}/api/Admin/CompanyVerification/${id}`,
  //       { status: "Rejected" }
  //     );
  //     console.log("Company Rejected ❌", id);

  //     fetchPendingCompanies();
  //   } catch (err) {
  //     console.log(err.response?.data?.message);
  //   } finally {
  //     setActionLoading({ id: null, type: null });
  //   }
  // };

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 justify-between">
        <div className="max-w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome back, Admin!
          </h1>
          <p className="text-gray-500 text-sm whitespace-nowrap overflow-auto mt-2">
            Review company verifications, manage users, and track internship applications and progress platform-wide.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden py-7">
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
                <p className="dark-blue text-xl sm:text-2xl font-bold">{stat.value}</p>
                <p className="dark-blue text-sm">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h2 className="text-xl font-bold dark-blue">Pending Companies</h2>

          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <select
                className="appearance-none border rounded-md ps-3 pe-12 py-1 text-sm w-full sm:w-auto"
                defaultValue=""
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="" disabled>
                  Location
                </option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <img src={arrowUp} className="absolute top-1/2 -translate-y-1/2 end-3 me-5 w-3 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none border rounded-md ps-3 pe-12 py-1 text-sm w-full sm:w-auto"
                defaultValue=""
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="" disabled>
                  Date
                </option>
                {dates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <img src={arrowUp} className="absolute top-1/2 -translate-y-1/2 end-3 me-5 w-3 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {pendingCompanies.map((company) => (
            <div key={company.id} className="bg-blue-100 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div className="flex gap-4 items-start sm:items-center">
                  <img src={company.image} className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 flex-wrap">
                      <img src={locationIcon} className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm flex-shrink-0 mt-1 sm:mt-0">
                  <span>{company.date}</span>
                  <img src={timeIcon} className="w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-6">
                <p className="text-gray-600 text-sm max-w-full lg:max-w-3xl">
                  {company.description}
                </p>

                <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 mt-2 lg:mt-0 w-full sm:w-auto">
                  <button
                    onClick={() => handleVerify(company.id)}
                    disabled={actionLoading.id === company.id && actionLoading.type === "verify"}
                    className="px-8 py-1.5 rounded-full bg-dark-blue text-white text-sm flex items-center justify-center disabled:opacity-50"
                  >
                    {actionLoading.id === company.id && actionLoading.type === "verify" ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Verify"
                    )}
                  </button>


                  {/* <button
                    onClick={() => handleReject(company.id)}
                    disabled={actionLoading.id === company.id}
                    className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm flex items-center justify-center"
                  >
                    {actionLoading.id === company.id && actionLoading.type === "reject"
                      ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      : "Reject"}
                  </button> */}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-40 text-sm text-black mt-2">
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  🔗{company.website}
                </a>

                <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} className="w-4 h-4 inline" /> {company.linkedin}
                </a>

                <a href={`tel:${company.phone}`}>
                  <img src={phoneIcon} className="w-4 h-4 inline" /> {company.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    

        <div className="flex flex-wrap justify-center gap-2 mt-8">
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
                currentPage === i + 1 ? "bg-dark-blue text-white" : "bg-gray-100"
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

  );
}
