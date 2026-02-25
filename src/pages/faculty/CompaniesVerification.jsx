import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usersIcon from "../../assets/sections/users.png";
import checkCircleIcon from "../../assets/sections/check-circle.png";
import locationIcon from "../../assets/sections/location.png";

const CompaniesVerification = () => {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [trustedCompaniesCount, setTrustedCompaniesCount] = useState(0);
  const [loadingButton, setLoadingButton] = useState(""); 

  const itemsPerPage = 6;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const COLLAGE_ID = "3548AFCD-EEAD-4DA7-B9B0-DC764DCBE6E4";

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, [currentPage]);

  const fetchCompanies = async () => {
    try {
      const query = new URLSearchParams({
        collageId: COLLAGE_ID,
        page: currentPage,
        pageSize: itemsPerPage,
      }).toString();

      const res = await fetch(`${BASE_URL}/api/College/Companies?${query}`);
      const result = await res.json();

      if (result.succeeded) {
        const companiesData = result.data.companies.data || [];
        const mappedCompanies = companiesData.map((c) => ({
          id: c.companyId,
          name: c.companyName,
          location: c.location,
          description: c.description ,
          verified: c.isTrusted,
          logoUrl: c.logoUrl,
        }));

        setCompanies(mappedCompanies);
        setTotalCompanies(result.data.totalCompanies || 0);
        setTrustedCompaniesCount(result.data.trustedCompaniesCount || 0);
        setTotalPages(result.data.companies.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const removeVerification = async (companyId) => {
    setLoadingButton(companyId); 
    try {
      const query = new URLSearchParams({
        collageId: COLLAGE_ID,
        companyId,
      }).toString();

      const res = await fetch(`${BASE_URL}/api/College/CollegeCompany?${query}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.succeeded) {
        setCompanies((prev) =>
          prev.map((c) =>
            c.id === companyId ? { ...c, verified: false } : c
          )
        );
        setTrustedCompaniesCount((prev) => prev - 1);
        console.log(result); 
      } else {
        alert(result.message || "Failed to remove verification");
      }
    } catch (error) {
      console.error("Failed to remove verification:", error);
    } finally {
      setLoadingButton(""); 
    }
  };

  const addVerification = async (companyId) => {
    setLoadingButton(companyId); 
    try {
      const res = await fetch(`${BASE_URL}/api/College/CollegeCompany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collageId: COLLAGE_ID,
          companyId: companyId,
        }),
      });

      const result = await res.json();

      if (result.succeeded) {
        setCompanies((prev) =>
          prev.map((c) =>
            c.id === companyId ? { ...c, verified: true } : c
          )
        );
        setTrustedCompaniesCount((prev) => prev + 1);
        console.log(result); 
      } else {
        alert(result.message || "Failed to add verification");
      }
    } catch (error) {
      console.error("Failed to add verification:", error);
    } finally {
      setLoadingButton(""); 
    }
  };

  const filteredCompanies =
    filter === "all"
      ? companies
      : companies.filter((c) => (filter === "verified" ? c.verified : !c.verified));

  return (
    <div className="p-4 sm:p-6 min-h-screen w-[95%] mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">
            Companies Verification
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Review and approve companies before allowing students to apply for internships.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
            <img src={usersIcon} alt="" className="w-12 h-12 sm:w-14 sm:h-14" />
            <div>
              <p className="text-xs text-gray-400">Total Company</p>
              <p className="font-bold">{totalCompanies}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
            <img src={checkCircleIcon} alt="" className="w-12 h-12 sm:w-14 sm:h-14" />
            <div>
              <p className="text-xs text-gray-400">Verified</p>
              <p className="font-bold">{trustedCompaniesCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 text-sm mb-3 mt-4">
        {["all", "verified", "not"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filter"
              checked={filter === type}
              onChange={() => {
                setFilter(type);
                setCurrentPage(1);
              }}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                filter === type ? "border-dark-blue" : "border-gray-400"
              }`}
            >
              {filter === type && <span className="w-2 h-2 rounded-full bg-dark-blue"></span>}
            </span>
            {type === "all" ? "All" : type === "verified" ? "Verified" : "Not Verified"}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-[#EAF6FF] p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <img src={company.logoUrl} alt="" className="rounded-full object-cover w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <img src={locationIcon} alt="" className="w-3 h-3" />
                    {company.location}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-medium ${company.verified ? "text-green-600" : "text-gray-500"}`}
              >
                ● {company.verified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <p className="text-sm text-gray-800 mb-4">{company.description}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setLoadingButton(`details-${company.id}`);
                  navigate(`/companies/${company.id}`);
                }}
                disabled={loadingButton === `details-${company.id}`}
                className="bg-dark-blue text-white px-4 py-1.5 rounded-lg text-sm flex items-center justify-center"
              >
                {loadingButton === `details-${company.id}` ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Details"
                )}
              </button>

              {company.verified ? (
                <button
                  onClick={() => removeVerification(company.id)}
                  disabled={loadingButton === company.id}
                  className="px-4 py-1.5 rounded-lg text-sm text-white bg-gray-400 hover:bg-gray-500 flex items-center justify-center"
                >
                  {loadingButton === company.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Remove Verification"
                  )}
                </button>
              ) : (
                <button
                  onClick={() => addVerification(company.id)}
                  disabled={loadingButton === company.id}
                  className="px-4 py-1.5 rounded-lg text-sm text-white bg-green-500 hover:bg-green-600 flex items-center justify-center"
                >
                  {loadingButton === company.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Mark as Verified"
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-start mt-8 gap-2 text-sm items-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${currentPage === i + 1 ? "bg-dark-blue text-white" : "text-gray-500 hover:bg-gray-100"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-full 
                    ${currentPage >= totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-gray-200"}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CompaniesVerification;