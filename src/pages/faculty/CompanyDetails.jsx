import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import googleLogo from "../../assets/sections/google.png";
import timeIcon from "../../assets/sections/time.png";
import defaultPerson from "../../assets/sections/defaultperson.jpg";
import locationIcon from "../../assets/sections/location.png";
import mesIcon from "../../assets/sections/mes.png";
import phoneIcon from "../../assets/sections/phone.png";
import linkedinIcon from "../../assets/sections/linkedin.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";


export default function CompanyDetails() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
  const { companyId } = useParams(); 
  const collageId = "3548AFCD-EEAD-4DA7-B9B0-DC764DCBE6E4";

  const [companyData, setCompanyData] = useState(null);
  const [internships, setInternships] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  const [loadingButton, setLoadingButton] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const WORK_TYPE_LABELS = {
  1: "On-site",
  2: "Remote",
  3: "Hybrid"
};
  useEffect(() => {
    fetchCompanyDetails();
    fetchCompanyInternships(currentPage);
    fetchCompanyFeedbacks();
    fetchCompanyTrustStatus();
  }, [companyId, currentPage]);

  const fetchCompanyDetails = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/College/Company-details/${companyId}?collageId=${collageId}`);
      const result = await res.json();
      if (result.succeeded) setCompanyData(result.data);
      else toast.error("Failed to load company details");
    } catch {
      toast.error("Failed to load company details");
    }
  };

  const fetchCompanyInternships = async (page) => {
    try {
      const res = await fetch(`${BASE_URL}/api/College/Company-Internships/${companyId}?page=${page}&pageSize=10`);
      const result = await res.json();
      if (result.succeeded) setInternships(result.data.data || []);
      else toast.error("Failed to load internships");
    } catch {
      toast.error("Failed to load internships");
    }
  };

  const fetchCompanyFeedbacks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/College/Company-Feedbacks/${companyId}?page=1&pageSize=10`);
      const result = await res.json();
      if (result.succeeded) setFeedbacks(result.data.data || []);
    } catch (error) {
  console.error("Failed to fetch feedbacks:", error);
  toast.error("Failed to load feedbacks");
}
  };

const fetchCompanyTrustStatus = async () => {
  try {
    console.log("Fetching companies list...");
    const res = await fetch(`${BASE_URL}/api/College/Companies?collageId=${collageId}`);
    const result = await res.json();

    console.log("Response from Companies API:", result); 

    if (result.succeeded) {
      
      const company = result.data.companies.data.find(c => c.companyId === companyId);
      console.log("Found company:", company); 
      setIsVerified(company?.isTrusted || false);
    } else {
      console.warn("Failed to fetch companies:", result.message || "Unknown error");
      setIsVerified(false);
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
    setIsVerified(false);
  }
};

const handleButtonClick = async (action, internshipId = null) => {
  try {
    switch (action) {
      case "visitWebsite":
  setLoadingButton("visitWebsite");

  if (companyData?.websiteUrl) {
    setTimeout(() => {
      window.open(companyData.websiteUrl, "_blank");
      setLoadingButton(null);
    }, 400); 
  } else {
    setLoadingButton(null);
  }
  break;

      case "removeVerification":
        setLoadingButton("removeVerification");
        {
          const res = await fetch(
            `${BASE_URL}/api/College/CollegeCompany?collageId=${collageId}&companyId=${companyId}`,
            { method: "DELETE" }
          );
          const result = await res.json();
          if (result.succeeded) {
            toast.success(result.meta || "Verification Removed!");
            setIsVerified(false);
          } else {
            toast.error(result.message || "Failed to remove verification");
          }
        }
        setLoadingButton(null);
        break;

      case "markVerified":
        setLoadingButton("markVerified");
        {
          const res = await fetch(`${BASE_URL}/api/College/CollegeCompany`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collageId, companyId }),
          });
          const result = await res.json();
          if (result.succeeded) {
            toast.success(result.meta || "Marked as Verified!");
            setIsVerified(true);
          } else {
            toast.error(result.message || "Failed to mark as verified");
          }
        }
        setLoadingButton(null);
        break;

      case "details":
        setLoadingButton(`details-${internshipId}`);
        setTimeout(() => {
          navigate(`/internship-details-in-faculty/${internshipId}`);
          
        }, 300); 
        break;

      default:
        break;
    }
  } catch (error) {
    console.error("API Error:", error);
    toast.error("Something went wrong");
    setLoadingButton(null); 
  }
};

  const totalPages = Math.ceil(internships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInternships = internships.slice(startIndex, startIndex + itemsPerPage);

  if (!companyData) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 w-[90%] mx-auto">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col lg:flex-row gap-6 relative">
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          <img src={companyData.logoUrl || googleLogo} className="w-24 h-24 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{companyData.companyName}</h1>
              {isVerified && (
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                className="bg-dark-blue text-white px-6 py-2 rounded-md text-sm flex items-center justify-center gap-2"
                onClick={() => handleButtonClick("visitWebsite")}
                disabled={loadingButton === "visitWebsite"}
              >
                {loadingButton === "visitWebsite" && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Visit Website
              </button>

              <button
                className={`px-6 py-2 rounded-md text-sm text-white flex items-center justify-center gap-2 ${
                  isVerified ? "bg-gray-400 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() =>
                  handleButtonClick(isVerified ? "removeVerification" : "markVerified")
                }
                disabled={loadingButton === "removeVerification" || loadingButton === "markVerified"}
              >
                {(loadingButton === "removeVerification" || loadingButton === "markVerified") && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isVerified ? "Remove Verification" : "Mark as Verified"}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[1px] bg-gray-300"></div>
<div className="flex flex-col gap-4 text-sm text-gray-600 me-30">
  <div className="flex items-center gap-2">
    <img src={locationIcon} className="w-5 h-5" />
    {companyData.location}
  </div>
  
  <div className="flex items-center gap-2">
    <img src={mesIcon} className="w-5 h-5" />
    <a href={`mailto:${companyData.contactEmail}`} className="">
      {companyData.contactEmail}
    </a>
  </div>
  
  <div className="flex items-center gap-2">
    <img src={phoneIcon} className="w-5 h-5" />
    <a href={`tel:${companyData.phoneNumber}`} className="">
      {companyData.phoneNumber}
    </a>
  </div>
  
  <div className="flex items-center gap-2">
    <img src={linkedinIcon} className="w-5 h-5" />
    <a href={companyData.linkedInUrl} target="_blank" rel="noopener noreferrer" className="">
      {companyData.linkedInUrl}
    </a>
  </div>
</div>
      </div>

      {/* About Company */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl dark-blue font-bold mb-2">About Company</h2>
        <p className="text-gray-600">{companyData.description}</p>
      </div>

      {/* Team Section with Swiper */}
      <section className="mt-10 px-6 md:px-16">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          navigation={false}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pt-10"
        >
          {feedbacks.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="mb-10 border border-gray-200 rounded-2xl p-8 h-full bg-white flex flex-col items-center">
                <img
  src={member.profilePhotoUrl || defaultPerson} 
  alt={member.fullName || "User"}
  className="w-16 h-16 rounded-full mb-4 object-cover"
/>
                <h3 className="font-bold text-center">{member.fullName || "Anonymous"}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{member.internshipTitle}</p>
                <p className="text-gray-600 text-sm text-center">“{member.comment}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Internships */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
        {currentInternships.map((internship) => (
          <div key={internship.internshipId} className="bg-[#EAF6FF] p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-3 mb-2">
              <img src={companyData.logoUrl || googleLogo} alt="" className="w-10 h-10 rounded-full border object-cover" />
              <div className="flex justify-between w-full">
                <div>
                  <h3 className="font-semibold">{internship.title}</h3>
                  <p className="text-sm text-gray-500">{companyData.companyName}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-800">
                  {new Date(internship.createdAt).toLocaleDateString()}
                  <img src={timeIcon} alt="" className="w-6 h-6" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-800 mb-4">{internship.description}</p>
            <div className="flex gap-3 text-xs text-gray-900 mb-3">
            <span className="px-3 py-2 border rounded-3xl">
              {WORK_TYPE_LABELS[internship.workType] || "Unknown"}
            </span>
              <span className="px-3 py-2 border rounded-3xl">{internship.location}</span>
              <span className="px-3 py-2 border rounded-3xl">{internship.isPaid ? "Paid" : "Unpaid"}</span>
              <span className="px-3 py-2 border rounded-3xl">{internship.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-medium ${internship.status === 1 ? "text-green-600" : "text-red-500"}`}>
                  ● {internship.status === 1 ? "Open" : "Closed"}
                </span>
                <button
  className="bg-dark-blue text-white px-4 py-1.5 rounded-2xl text-sm flex items-center justify-center gap-2"
  onClick={() => handleButtonClick("details", internship.internshipId)}
  disabled={loadingButton === `details-${internship.internshipId}`}
>
  {loadingButton === `details-${internship.internshipId}` ? (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  ) : (
    "Details"
  )}
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-start mt-8 gap-2 text-sm items-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === i + 1 ? "bg-dark-blue text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage >= totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-gray-200"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}