import React, { useState } from "react";
import savedImage from "../../assets/sections/saved.png"
import applicationImage from "../../assets/sections/application.png";
import SelectArrow from "../../assets/sections/ArrowUp.png";
import googleLogo from "../../assets/sections/google.png";
import timeIcon from "../../assets/sections/time.png";
import collegeLogo from "/src/assets/sections/collegelogo.png";
import unsavedIcon from "../../assets/sections/heart.png";
import xIcon from "../../assets/sections/x.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const stats = [
  { label: "Saved Internships", value: 20},
  { label: "Application Submitted", value: 20 },
];
const itemsPerPage = 5;
const InternshipStatus = {
  New: 1,
  Accepted: 2,
  InterviewPending: 3,
  Finished: 4,
  Rejected: 5,
};
  const getStatusLabel = (status) => {
  switch(status) {
    case InternshipStatus.New: return "New";
    case InternshipStatus.Accepted: return "Accepted";
    case InternshipStatus.InterviewPending: return "Interview Pending";
    case InternshipStatus.Finished: return "Finished";
    case InternshipStatus.Rejected: return "Rejected";
    default: return "";
  }
};
const internships = [
  {
   
    id: 1,
    title: "UI/UX Designer for Mobile App",
    company: "Vodafone",
    category: "Computer Science / Software Engineering",
    startDate: "June 2025",
    duration: "2 months",
    mode: "Remote",
    paid: "Paid",
    level: "Giza",
    status: InternshipStatus.New, 
    date: "Mar 15, 2025",
    verified: true,
  
  },
  {
    id: 2,
    title: "UI/UX Designer for Mobile App",
    company: "Vodafone",
    category: "Computer Science / Software Engineering",
    startDate: "June 2025",
    duration: "2 months",
    mode: "Remote",
    paid: "Paid",
    level: "Giza",
      status: InternshipStatus.Finished,
    date: "Mar 15, 2025",
    actions: ["View Details"],
    verified: false,
  },
  {
    id: 3,
    title: "UI/UX Designer for Mobile App",
    company: "Vodafone",
    category: "Computer Science / Software Engineering",
    startDate: "June 2025",
    duration: "2 months",
    mode: "Remote",
    paid: "Paid",
    level: "Giza",
      status: InternshipStatus.Finished,
    date: "Mar 15, 2025",
    actions: ["Report", "Feedback"],
    verified: true,
  },
  {
    id: 4,
    title: "UI/UX Designer for Mobile App",
    company: "Vodafone",
    category: "Computer Science / Software Engineering",
    startDate: "June 2025",
    duration: "2 months",
    mode: "Remote",
    paid: "Paid",
    level: "Giza",
     status: InternshipStatus.New,
    date: "Mar 15, 2025",
    actions: ["Report", "Feedback"],
    verified: false,
  },
  {
    id: 5,
    title: "UI/UX Designer for Mobile App",
    company: "Vodafone",
    category: "Computer Science / Software Engineering",
    startDate: "June 2025",
    duration: "2 months",
    mode: "Remote",
    paid: "Paid",
    level: "Giza",
      status: InternshipStatus.Finished,
    date: "Mar 15, 2025",
    actions: ["Report", "Feedback"],
    verified: true,
  },
];


const savedInternships = [
  {
    id: 101,
    title: "Frontend Developer Intern",
    company: "Google",
    category: "Computer Science / Web Development",
    startDate: "July 2025",
    duration: "3 months",
    mode: "Hybrid",
    paid: "Paid",
    level: "Cairo",

    date: "Apr 10, 2025",
    verified: true,
  },
  {
    id: 102,
    title: "Backend Developer Intern",
    company: "Microsoft",
    category: "Computer Science / Backend",
    startDate: "August 2025",
    duration: "2 months",
    mode: "Onsite",
    paid: "Unpaid",
    level: "Alex",

    date: "Apr 5, 2025",
    verified: false,
  },
  {
    id: 103,
    title: "UI Designer Intern",
    company: "Amazon",
    category: "Design / UI UX",
    startDate: "September 2025",
    duration: "4 months",
    mode: "Remote",
    paid: "Paid",
    level: "Giza",

    date: "Apr 1, 2025",
    verified: false,
  },
];


const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { tab: urlTab } = useParams();

const [tab, setTab] = useState(
  urlTab === "Saved" ? "Saved" : "Internships"
);

  const [loadingButton, setLoadingButton] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const totalPages = Math.ceil(internships.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInternships = internships.slice(indexOfFirstItem, indexOfLastItem);

  const handleTabChange = (item) => {
    setTab(item);
  };

const handleCollegeReport = (id) => {
  setLoadingButton(`college-${id}`); 

  setTimeout(() => {
    setLoadingButton(""); 
    console.log("College Report for internship:", id);
    

    window.open("/src/public/college-report.html", "_blank");
  }, 1000);
};
const handleDetails = (id) => {
  setLoadingButton(`details-${id}`); 

  setTimeout(() => {
    setLoadingButton(""); 
    navigate(`/home/internship/${id}`);
  }, 1000);
};

const handleReport = (id) => {
  setLoadingButton(`report-${id}`);

  setTimeout(() => {
    setLoadingButton("");

    window.open("/src/public/personal-report.html", "_blank");
  }, 1000);
};

  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  
  const handleFeedback = (internship) => {
    setLoadingButton(`feedback-${internship.id}`);
    setTimeout(() => {
      setLoadingButton("");
      setSelectedInternship(internship);
      setShowFeedbackModal(true);
    }, 800);
  };


  const activeInternships =
  tab === "Internships" ? internships : savedInternships;
useEffect(() => {
  if (urlTab === "Saved") {
    setTab("Saved");
  } else {
    setTab("Internships");
  }
}, [urlTab]);

  return (
    <div className="min-h-screen w-full lg:w-[95%] mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6 lg:mb-8">
        <div className="w-full lg:w-auto mb-4 lg:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold">Welcome, Yara</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            View and manage all internships you've applied to, and track the
            progress of each application.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 w-full lg:w-auto lg:mt-0">
          {stats.map((stat, index) => (
            <div

              key={index}
              className="bg-blue-50 px-4 sm:px-5 py-3 sm:py-4 rounded-xl flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[150px]"
            >
              <img
                src={index === 0 ? savedImage : applicationImage}
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <div>
                <p className="text-blue-900 font-bold text-xl sm:text-2xl">{stat.value}</p>
                <p className="text-xs text-blue-900">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 border-b mb-4 text-xs sm:text-sm overflow-x-auto">
        {["Internships", "Saved"].map((item) => (
          <button
            key={item}
            onClick={() => handleTabChange(item)}
            className={`pb-3 capitalize whitespace-nowrap ${
              tab === item
                ? "border-b-2 border-dark-blue dark-blue font-bold"
                : "text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>



{/* Filters */}
<div className="flex flex-wrap gap-3 sm:gap-4 mb-8 lg:mb-10 items-center">
  {(tab === "Internships"
    ? [
        { label: "State" },
        { label: "Company" },
        { label: "Date" },
        { label: "Type" },
      ]
    : [
        { label: "Company" },
        { label: "Date" },
        { label: "Type" },
      ]
  ).map((item, idx) => (
    <div key={idx} className="relative flex-shrink-0">
      <select
        className="appearance-none text-xs font-semibold border border-gray-200 rounded-2xl py-2 px-4 sm:px-6 pr-8 sm:pr-10 w-full sm:w-auto min-w-[100px]"
      >
        <option value="">{item.label}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <img
        src={SelectArrow}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 pointer-events-none"
      />
    </div>
  ))}
</div>



      {/* Internships */}
      <div
              className={`grid gap-4 sm:gap-6 mt-6 lg:mt-8 ${
                tab === "Saved"
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >

        {activeInternships.map((internship) => (
          <div
            key={internship.id}
            className="bg-[#EAF6FF] p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="relative flex-shrink-0">
                <img
                  src={googleLogo}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                {internship.verified && (
                  <div className="absolute -bottom-1 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                    <img
                      src={collegeLogo}
                      alt="Verified by Faculty"
                      className="w-3 h-3 object-contain"
                    />
                  </div>
                )}
              </div>

<div className="flex justify-between w-full gap-2">
  <div className="flex-1 min-w-0">
    <h3 className="font-semibold text-lg sm:text-xl break-words">{internship.title}</h3>
    <p className="text-sm text-gray-800 break-words">{internship.company}</p>
    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 break-words">
  {internship.category}
</p>
  </div>

{tab === "Internships" && (
  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 flex-shrink-0 lg:mb-10">
    <img src={timeIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />

    <span className="truncate max-w-[120px] sm:max-w-none">
      {internship.date}
    </span>
  </div>
)}
</div>



            </div>

<div
  className={`${
    tab === "Saved"
      ? "flex flex-col"
      : "flex flex-col lg:flex-row justify-between"
  }`}
>

  {/* badges */}
  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-900 mb-4 h-auto lg:h-[2px]">
    <span className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold rounded-3xl bg-white whitespace-nowrap">
      {internship.startDate}
    </span>
    <span className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold rounded-3xl bg-white whitespace-nowrap">
      {internship.duration}
    </span>
    <span className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold rounded-3xl bg-white whitespace-nowrap">
      {internship.mode}
    </span>
    <span className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold rounded-3xl bg-white whitespace-nowrap">
      {internship.paid}
    </span>
    <span className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold rounded-3xl bg-white whitespace-nowrap">
      {internship.level}
    </span>
  </div>

  {/* buttons in separate row */}
  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">

{/* buttons in separate row */}
<div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
  {tab === "Saved" ? (
    <>
      <button
        className="lg:ms-65 bg-dark-blue mt-3 sm:mt-5 text-white px-6 sm:px-10 py-2 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-60 flex-1 sm:flex-initial min-w-[120px]"
        onClick={() => handleDetails(internship.id)}
        disabled={loadingButton === `details-${internship.id}`}
      >
        {loadingButton === `details-${internship.id}` && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        Details
      </button>

      <button
        className="mt-3 sm:mt-5 py-2 border border-all bg-transparent px-4 sm:px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 flex-1 sm:flex-initial min-w-[100px]"
        onClick={() => console.log("Unsave:", internship.id)}
      >
        <span className="relative w-3 h-3 bg-red-50 flex-shrink-0">
          <img src={unsavedIcon} alt="" className="w-3 h-3" />
          <img
            src={xIcon}
            alt=""
            className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2"
          />
        </span>
        Unsave
      </button>
    </>
  ) : (
    <>
      {internship.status === InternshipStatus.Finished ? (
    
        <div className="flex sm:flex-row gap-2 sm:gap-3 mt-0 lg:mt-[-30px] mb-3 w-full sm:w-auto">
          {internship.verified && (
            <button
              className="bg-dark-blue text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-60 w-full sm:w-auto"
              onClick={() => handleCollegeReport(internship.id)}
              disabled={loadingButton === `college-${internship.id}`}
            >
              {loadingButton === `college-${internship.id}` && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              College Report
            </button>
          )}

          <button
            className="bg-dark-blue text-white px-6 sm:px-10 py-2 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-60 w-full sm:w-auto"
            onClick={() => handleReport(internship.id)}
            disabled={loadingButton === `report-${internship.id}`}
          >
            {loadingButton === `report-${internship.id}` && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Report
          </button>

          <button
            className="bg-dark-blue text-white py-2 border px-4 sm:px-6 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-60 w-full sm:w-auto"
            onClick={() => handleFeedback(internship)}
            disabled={
              loadingButton === `feedback-${internship.id}` ||
              submittedFeedback.includes(internship.id)
            }
          >
            {loadingButton === `feedback-${internship.id}` && (
              <div className="w-4 h-4 border-2 border-all border-t-transparent rounded-full animate-spin" />
            )}
            Feedback
          </button>
        </div>
      ) : (
    
        <button
          className="bg-dark-blue text-white px-4 sm:px-6 py-2 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-90 w-full sm:w-auto"
          onClick={() => handleDetails(internship.id)}
          disabled={loadingButton === `details-${internship.id}`}
        >
          {loadingButton === `details-${internship.id}` && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          View Details
        </button>
      )}
    </>
  )}
</div>

  </div>
</div>


{tab === "Internships" && (
  <div className="flex justify-between items-center mt-2">
    <div className="flex items-center justify-between w-full gap-3">
      <span
  className={`text-xs font-medium  ${
    internship.status === InternshipStatus.New ||
    internship.status === InternshipStatus.Accepted
      ? "text-green-600"
      : internship.status === InternshipStatus.Finished
      ? "text-blue-600"
      : "text-red-500"
  }`}
>
  ● {getStatusLabel(internship.status)}
</span>
    </div>
  </div>
)}

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-6 sm:mt-8 gap-2 text-sm items-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm
              ${
                currentPage === i + 1
                  ? "bg-dark-blue text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm
            ${
              currentPage >= totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-gray-200"
            }`}
        >
          &gt;
        </button>
      </div>

      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-lg text-center">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              Session feedback
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Please rate your experience below
            </p>

            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 text-start">
              Additional Feedback
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="My feedback!"
              className="w-full border border-gray-200 rounded-xl p-3 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows={4}
            />

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <button
                className="px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm bg-dark-blue text-white flex items-center justify-center gap-2 disabled:opacity-60 w-full sm:w-auto order-2 sm:order-1"
                disabled={loadingFeedback}
                onClick={() => {
                  setLoadingFeedback(true);

                  setTimeout(() => {
                    console.log("Feedback:", feedbackText);
                    setLoadingFeedback(false);
                    setShowFeedbackModal(false);
                    setFeedbackText("");
                    setSubmittedFeedback((prev) => [...prev, selectedInternship.id]);
                  }, 1500);
                }}
              >
                {loadingFeedback && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Submit feedback
              </button>
              

              <button
                className="px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm border border-gray-300 text-gray-700 disabled:opacity-60 w-full sm:w-auto order-1 sm:order-2"
                disabled={loadingFeedback}
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackText("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;