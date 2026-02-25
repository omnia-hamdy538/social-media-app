import React, { useEffect, useState } from "react";
import applyIcon from "../../assets/sections/hand.png";
import statusIcon from "../../assets/sections/circle.png";
import timeIcon from "../../assets/sections/time.png";
import { useParams } from "react-router-dom";
const InternshipDetailsInFaculty = () => {
  const [jobData, setJobData] = useState(null);
const { internshipId } = useParams();
  // const internshipId = "6490819f-938c-4d8a-91a2-08de64e05682";
  const collageId = "3548AFCD-EEAD-4DA7-B9B0-DC764DCBE6E4";
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/College/Company/Internship-Details/${internshipId}?collageId=${collageId}`
        );
        const result = await response.json();
        if (result.succeeded) {
          setJobData(result.data);
        }
      } catch (error) {
        console.error("Error fetching internship details:", error);
      }
    };

    fetchInternshipDetails();
  }, []);

  if (!jobData) return null;

  const statusMap = {
    1: "Open",
    2: "Closed",
  };

  const typeMap = {
    1: "Onsite",
    2: "Remote",
    3: "Hybrid",
  };

  const responsibilitiesList = jobData.responsibilities
    ? jobData.responsibilities.split("-").filter((item) => item.trim() !== "")
    : [];

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md w-full max-w-5xl p-10">

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={jobData.companyLogoUrl}
                alt="company"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-2 left-19 -translate-x-1/2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm z-10">
              ✓
            </div>
          </div>

          <h1 className="text-2xl font-semibold mt-4">
            {jobData.title}
          </h1>

          <p className="text-gray-800 mt-2 max-w-xl">
            {jobData.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 mt-10 text-center">
          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{jobData.requiredField}</p>
            <p className="text-sm text-gray-400">Field</p>
          </div>

          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{jobData.supervisor}</p>
            <p className="text-sm text-gray-400">Supervisor</p>
          </div>

          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{jobData.duration}</p>
            <p className="text-sm text-gray-400">Project Duration</p>
          </div>

          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{typeMap[jobData.type]}</p>
            <p className="text-sm text-gray-400">Work Arrangement</p>
          </div>

          <div className="py-4">
            <p className="font-medium">{jobData.location}</p>
            <p className="text-sm text-gray-400">Location</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full bg-dark-blue flex items-center justify-center text-white text-sm">
                ✓
              </span>
              <h2 className="font-semibold">Responsibilities:</h2>
            </div>

            <ul className="space-y-5 text-gray-600 text-sm">
              {responsibilitiesList.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-dark-blue">•</span>
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div className="pr-6 border-l border-gray-300 space-y-5 mt-6 md:mt-0">
            <div className="flex items-center gap-3">
              <img src={statusIcon} className="w-7 mb-5 ms-5" />
              <div>
                <p className="text-sm">Internship Status</p>
                <span className="inline-block mt-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded font-medium">
                  {statusMap[jobData.status]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={timeIcon} className="w-7 mb-5 ms-5" />
              <div>
                <p className="text-sm">Posted Date</p>
                <p className="font-medium text-gray-400">
                  {new Date(jobData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={applyIcon} className="w-7 mb-5 ms-5" />
              <div>
                <p className="text-sm">Apply By</p>
                <p className="font-medium text-gray-400">
                  {new Date(jobData.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 ms-5 text-sm font-medium">
              <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Verified By Faculty
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsInFaculty;