import { useState } from "react";
import googleLogo from "../../assets/sections/google.png";
import timeIcon from "../../assets/sections/time.png";
import cardImg from "../../assets/sections/profile.png";
import locationIcon from "../../assets/sections/location.png";
import mesIcon from "../../assets/sections/mes.png";
import phoneIcon from "../../assets/sections/phone.png";
import linkedinIcon from "../../assets/sections/linkedin.png";
import collegeLogo from "/src/assets/sections/collegelogo.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import toast from "react-hot-toast";

export default function CompanyDetailsInCandidate() {
  const companyData = {
    name: "Google",
    location: "New York",
    email: "sarahjohnson@gmail.com",
    phone: "+251 912 345 678",
    linkedin: "linkedin.com/in/hamadasee",
    description:
      "Google is a global technology leader focused on organizing the world’s information and making it universally accessible and useful. The  company builds innovative products and platforms across search, advertising, cloud computing, artificial intelligence, hardware, and software.",
  };

  const teamMembers = [
    {
      name: "Asmaa M.",
      role: "UI Designer @Blulu",
      quote:
        "My experience with the UI/UX training on Forasity platform was really helpful and straightforward.",
    },
    {
      name: "Mohammed A.",
      role: "Machine Learning @Youth",
      quote:
        "My experience with the Machine Learning training on the Forasity platform was very valuable.",
    },
    {
      name: "Noor A.",
      role: "Flutter Developer @Boo",
      quote:
        "My experience with the Flutter training on the Forasity platform was useful and practical.",
    },
    {
      name: "Ahmed S.",
      role: "Backend Developer @TechX",
      quote:
        "The backend training gave me practical skills that I could immediately apply at work.",
    },
    {
      name: "Sara K.",
      role: "Frontend Developer @Designo",
      quote:
        "I learned so much about modern frontend development and responsive design.",
    },
    {
      name: "Hassan T.",
      role: "AI Specialist @NextGen",
      quote:
        "AI courses on Forasity helped me improve my skills and work on real projects confidently.",
    },
  ];

  const internships = [
    {
      id: 1,
      title: "Software Engineer Internship",
      company: "Google",
      place: "Remote",
      location: "Cairo",
      type: "Paid",
      duration: "3 Months",
      date: "12 Jan 2024",
      description:
        "Software Engineer Internship Description Software Engineer Internship Description Software Engineer Internship Description.",
      status: "open",
    },
    {
      id: 2,
      title: "Frontend Internship",
      company: "Google",
      place: "On-site",
      location: "Cairo",
      type: "Paid",
      duration: "3 Months",
      date: "10 Jan 2024",
      description:
        "Frontend Internship Description Frontend Internship Description Software Engineer Internship Description.",
      status: "closed",
    },
    {
      id: 3,
      title: "Backend Internship",
      company: "Google",
      place: "Remote",
      location: "Alexandria",
      type: "Unpaid",
      duration: "6 Months",
      date: "08 Jan 2024",
      description:
        "Backend Internship Description Backend Internship Description Software Engineer Internship Description.",
      status: "open",
    },
    {
      id: 4,
      title: "UI UX Internship",
      company: "Google",
      place: "On-site",
      location: "Cairo",
      type: "Paid",
      duration: "3 Months",
      date: "05 Jan 2024",
      description:
        "UI UX Internship Description UI UX Internship Description Software Engineer Internship Description.",
      status: "closed",
    },
    {
      id: 5,
      title: "Mobile Internship",
      company: "Google",
      place: "Remote",
      location: "Giza",
      type: "Paid",
      duration: "4 Months",
      date: "02 Jan 2024",
      description:
        "Mobile Internship Description Mobile Internship Description Software Engineer Internship Description.",
      status: "open",
    },
    {
      id: 6,
      title: "AI Internship",
      company: "Google",
      place: "Remote",
      location: "Cairo",
      type: "Paid",
      duration: "6 Months",
      date: "01 Jan 2024",
      description:
        "AI Internship Description AI Internship Description Software Engineer Internship Description.",
      status: "open",
    },
    {
  id: 7,
  title: "Data Science Internship",
  company: "Google",
  place: "Remote",
  location: "Cairo",
  type: "Paid",
  duration: "3 Months",
  date: "28 Dec 2023",
  description:
    "Data Science Internship Description Data Science Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 8,
  title: "DevOps Internship",
  company: "Google",
  place: "On-site",
  location: "Giza",
  type: "Paid",
  duration: "4 Months",
  date: "25 Dec 2023",
  description:
    "DevOps Internship Description DevOps Internship Description Software Engineer Internship Description.",
  status: "closed",
},
{
  id: 9,
  title: "Cyber Security Internship",
  company: "Google",
  place: "Remote",
  location: "Alexandria",
  type: "Paid",
  duration: "6 Months",
  date: "22 Dec 2023",
  description:
    "Cyber Security Internship Description Cyber Security Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 10,
  title: "Product Management Internship",
  company: "Google",
  place: "On-site",
  location: "Cairo",
  type: "Unpaid",
  duration: "3 Months",
  date: "20 Dec 2023",
  description:
    "Product Management Internship Description Product Management Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 11,
  title: "Cloud Computing Internship",
  company: "Google",
  place: "Remote",
  location: "Remote",
  type: "Paid",
  duration: "6 Months",
  date: "18 Dec 2023",
  description:
    "Cloud Computing Internship Description Cloud Computing Internship Description Software Engineer Internship Description.",
  status: "closed",
},
{
  id: 12,
  title: "QA Testing Internship",
  company: "Google",
  place: "On-site",
  location: "Cairo",
  type: "Paid",
  duration: "2 Months",
  date: "15 Dec 2023",
  description:
    "QA Testing Internship Description QA Testing Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 13,
  title: "Game Development Internship",
  company: "Google",
  place: "Remote",
  location: "Remote",
  type: "Paid",
  duration: "5 Months",
  date: "12 Dec 2023",
  description:
    "Game Development Internship Description Game Development Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 14,
  title: "AR / VR Internship",
  company: "Google",
  place: "On-site",
  location: "Giza",
  type: "Paid",
  duration: "4 Months",
  date: "10 Dec 2023",
  description:
    "AR VR Internship Description AR VR Internship Description Software Engineer Internship Description.",
  status: "closed",
},
{
  id: 15,
  title: "Embedded Systems Internship",
  company: "Google",
  place: "On-site",
  location: "Alexandria",
  type: "Unpaid",
  duration: "6 Months",
  date: "08 Dec 2023",
  description:
    "Embedded Systems Internship Description Embedded Systems Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 16,
  title: "Blockchain Internship",
  company: "Google",
  place: "Remote",
  location: "Remote",
  type: "Paid",
  duration: "3 Months",
  date: "05 Dec 2023",
  description:
    "Blockchain Internship Description Blockchain Internship Description Software Engineer Internship Description.",
  status: "open",
},
{
  id: 17,
  title: "Technical Support Internship",
  company: "Google",
  place: "On-site",
  location: "Cairo",
  type: "Paid",
  duration: "2 Months",
  date: "03 Dec 2023",
  description:
    "Technical Support Internship Description Technical Support Internship Description Software Engineer Internship Description.",
  status: "closed",
},
{
  id: 18,
  title: "UI Development Internship",
  company: "Google",
  place: "Remote",
  location: "Giza",
  type: "Paid",
  duration: "4 Months",
  date: "01 Dec 2023",
  description:
    "UI Development Internship Description UI Development Internship Description Software Engineer Internship Description.",
  status: "open",
},

  ];

  const [isVerified, setIsVerified] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [loadingButton, setLoadingButton] = useState(null); 
  const handleButtonClick = async (action, internshipId = null) => {
  setLoadingButton(action === "details" ? `details-${internshipId}` : action);


  await new Promise((resolve) => setTimeout(resolve, 1000)); 

  setLoadingButton(null); 

  
  switch (action) {
    case "visitWebsite":
      toast.success("Website Opened!");
      break;
    case "removeVerification":
      toast.success("Verification Removed!");
      break;
    case "markVerified":
      toast.success("Marked as Verified!");
      break;
    case "details":
      toast.success(`Details Loaded for internship ${internshipId}!`);
      break;
    default:
      break;
  }
};


  const totalPages = Math.ceil(internships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInternships = internships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6 w-[90%] mx-auto">
       {/* Company Header */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col lg:flex-row gap-6 relative">
        
        {/* Left */}
      <div className="flex flex-col sm:flex-row gap-6 flex-1 items-center sm:items-start">
        {/* Logo */}
        <div className="relative w-30 h-30">
          <img
            src={googleLogo}
            className="w-30 h-30 rounded-full object-cover"
          />

          {isVerified && (
            <div className="absolute -bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
              <img
                src={collegeLogo}
                alt="Verified by Faculty"
                className="w-4 h-4 object-contain"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold">
              {companyData.name}
            </h1>

            {isVerified && (
              <img
                src={collegeLogo}
                alt="Verified by Faculty"
                className="w-5 h-5 object-contain"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-10 justify-center sm:justify-end w-full">
            <button
              className="bg-dark-blue text-white px-6 sm:px-10 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={() => handleButtonClick("visitWebsite")}
              disabled={loadingButton === "visitWebsite"}
            >
              {loadingButton === "visitWebsite" && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Visit Website
            </button>
          </div>
        </div>
      </div>

        {/* Separator */}
        <div className="hidden lg:block w-[1px] bg-gray-300"></div>

        {/* Right */}
<div className="flex flex-col gap-4 text-sm text-gray-600 me-50 ms-10">
  <div className="flex items-center gap-2">
    <img src={locationIcon} className="w-5 h-5" />
    {companyData.location}
  </div>

  <div className="flex items-center gap-2">
    <img src={mesIcon} className="w-5 h-5" />
    <a
      href={`mailto:${companyData.email}`}
      className="underline"
    >
      {companyData.email}
    </a>
  </div>

  <div className="flex items-center gap-2">
    <img src={phoneIcon} className="w-5 h-5" />
    {companyData.phone}
  </div>

  <div className="flex items-center gap-2">
    <img src={linkedinIcon} className="w-5 h-5" />
    <a
      href={companyData.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className=""
    >
      {companyData.linkedin}
    </a>
  </div>
</div>

      </div>


      {/* About Company */}
      <div className="bg-white rounded-lg shadow p-6 mt-6 ">
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
          className="pt-10 "
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="mb-10 border border-gray-200 rounded-2xl p-8 h-full bg-white flex flex-col items-center">
                {/* Circle with image */}
                <img
                  src={cardImg}
                  alt={member.name}
                  className="w-16 h-16 rounded-full mb-4 object-cover"
                />

                <h3 className="font-bold text-center">{member.name}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{member.role}</p>

                <p className="text-gray-600 text-sm text-center">“{member.quote}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Internships */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
        {currentInternships.map((internship) => (
          <div
            key={internship.id}
            className="bg-[#EAF6FF] p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-3 mb-2">
              <img
                src={googleLogo}
                alt=""
                className="w-10 h-10 rounded-full border object-cover"
              />
              <div className="flex justify-between  w-full">
                <div>
                  <h3 className="font-semibold">{internship.title}</h3>
                  <p className="text-sm text-gray-500">{internship.company}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-800">
                  {internship.date}
                  <img src={timeIcon} alt="" className="w-6 h-6" />
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-800 mb-4">{internship.description}</p>

            <div className="flex gap-3 text-xs text-gray-900 mb-3">
              <span className="px-3 py-2 border rounded-3xl">{internship.place}</span>
              <span className="px-3 py-2 border rounded-3xl">{internship.location}</span>
              <span className="px-3 py-2 border rounded-3xl">{internship.type}</span>
              <span className="px-3 py-2 border rounded-3xl">{internship.duration}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between w-full gap-3">
                <span
                  className={`text-xs font-medium ${
                    internship.status === "open" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ● {internship.status === "open" ? "Open" : "Closed"}
                </span>

            <button
              className="bg-dark-blue text-white px-4 py-1.5 rounded-2xl text-sm flex items-center justify-center gap-2"
              onClick={() => handleButtonClick("details", internship.id)}
              disabled={loadingButton === `details-${internship.id}`}
            >
              {loadingButton === `details-${internship.id}` && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Details
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
            className={`w-8 h-8 rounded-full flex items-center justify-center
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
          className={`w-8 h-8 flex items-center justify-center rounded-full
            ${
              currentPage >= totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-gray-200"
            }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
