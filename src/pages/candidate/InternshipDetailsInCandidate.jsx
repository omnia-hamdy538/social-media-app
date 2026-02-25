import React from "react";
import googleLogo from "../../assets/sections/google.png";
import applyIcon from "../../assets/sections/hand.png";
import statusIcon from "../../assets/sections/circle.png";
import timeIcon from "../../assets/sections/time.png";
import collegeLogo from "/src/assets/sections/collegelogo.png";
import ApplyButton from "../../Component/ApplyButton";

const mockJob = {
  title: "Software Engineering Intern",
  company: "Google",
  description:
    "Work with Google's engineering team to build and test scalable features. You'll learn real-world coding practices, debugging, and agile development workflows.",
  field: "Computer Science",
  supervisor: "Ahmed",
  duration: "3 months",
  arrangement: "Hybrid",
  location: "Cairo, Egypt",
  responsibilities: [
    "Work with Google's engineering team to design, develop, and test scalable features.",
    "Debug, optimize, and refactor code to improve performance and reliability.",
    "Participate in daily stand-ups, sprint planning, and Agile development cycles.",
    "Collaborate with senior engineers through code reviews and technical discussions.",
    "Write documentation for tools, APIs, or internal systems you work on.",
  ],
  status: "Open", // Open | Closed
  postedDate: "May 30, 2025",
  applyBy: "May 30, 2025",
  verified: true,
};

const InternshipDetailsInCandidate = () => {
  const isClosed = mockJob.status.toLowerCase() === "closed";

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md w-full max-w-5xl p-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={googleLogo}
                alt="company"
                className="w-full h-full object-cover"
              />
               {mockJob.verified&& (
                  <div className="absolute -bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                    <img
                      src={collegeLogo}
                      alt="Verified by Faculty"
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                )}
            </div>


          </div>

          <h1 className="text-2xl font-semibold mt-4">
            {mockJob.title}
          </h1>

          <p className="text-gray-800 mt-2 max-w-xl">
            {mockJob.description}
          </p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 md:grid-cols-5 mt-10 text-center">
          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{mockJob.field}</p>
            <p className="text-sm text-gray-400">Field</p>
          </div>

          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{mockJob.supervisor}</p>
            <p className="text-sm text-gray-400">Supervisor</p>
          </div>

          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{mockJob.duration}</p>
            <p className="text-sm text-gray-400">Project Duration</p>
          </div>

          <div className="py-4 md:border-r border-gray-300">
            <p className="font-medium">{mockJob.arrangement}</p>
            <p className="text-sm text-gray-400">Work Arrangement</p>
          </div>

          <div className="py-4">
            <p className="font-medium">{mockJob.location}</p>
            <p className="text-sm text-gray-400">Location</p>
          </div>
        </div>
<div className="flex justify-center mt-3">
  <ApplyButton isClosed={isClosed} candidateId={123} />
</div>
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
          {/* Responsibilities */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full bg-dark-blue flex items-center justify-center text-white text-sm">
                ✓
              </span>
              <h2 className="font-semibold">Responsibilities:</h2>
            </div>

            <ul className="space-y-5 text-gray-600 text-sm">
              {mockJob.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-dark-blue">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="pr-6 border-l border-gray-300 space-y-5 mt-6 md:mt-0">
            <div className="flex items-center gap-3">
              <img src={statusIcon} className="w-7 mb-5 ms-5" />
              <div>
                <p className="text-sm">Internship Status</p>
                <span
                  className={`inline-block mt-1 px-3 py-1 text-sm rounded font-medium ${
                    isClosed
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {mockJob.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={timeIcon} className="w-7 mb-5 ms-5" />
              <div>
                <p className="text-sm">Posted Date</p>
                <p className="font-medium text-gray-400">
                  {mockJob.postedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={applyIcon} className="w-7 mb-5 ms-5" />
              <div>
                <p className="text-sm">Apply By</p>
                <p className="font-medium text-gray-400">
                  {mockJob.applyBy}
                </p>
              </div>
            </div>

            { mockJob.verified && (
              <div className="flex items-center gap-2 ms-5 text-sm font-medium">
                <img
                  src={collegeLogo}
                  alt="Verified by Faculty"
                  className="w-5 h-5 object-contain"
                />
                Verified by Faculty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsInCandidate;
