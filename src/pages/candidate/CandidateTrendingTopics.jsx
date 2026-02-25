import React, { useState } from "react";
import timeIcon from "../../assets/sections/time.png";
const mockData = {
  title: "Artificial Intelligence",
  subtitle:
    "Explore internships focused on machine learning, data analysis, and intelligent systems",
  count: "800",
  sortBy: "Newest Post",
};

const mockInternships = Array.from({ length: 9 }).map((_, idx) => ({
  id: idx + 1,
  company: "IBM",
  role: "Data Science Intern",
  tags: "Data Science / AI / Analytics",
  duration: "1 months",
  location: "Cairo, Egypt",
  mode: "Remote",
  deadline: "3 days left (Deadline: 1 Dec 2025)",
}));

const CandidateTrendingTopics = () => {
  const [sort, setSort] = useState("Newest Post");
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 min-h-screen bg-white">
      {/* Header */}
      <div className="mb-3 lg:ms-5">
        <h1 className="text-2xl font-bold dark-blue ">{mockData.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{mockData.subtitle}</p>
      </div>

      {/* Top row */}
      <div className="flex justify-between items-center mb-3 lg:ms-5">
        <div className="text-sm font-semibold ">
          {mockData.count}{" "}
          <span className="text-gray-400">Internship Found</span>
        </div>

        {/* Select Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm text-gray-600 rounded-md px-3 py-1"
          >
            <span className="text-gray-400 font-semibold">Sort by:</span>
            <span className="font-semibold text-gray-700">{sort}</span>
            <span className="ml-2">▼</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <div
                onClick={() => {
                  setSort("Newest Post");
                  setOpen(false);
                }}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Newest Post
              </div>
              <div
                onClick={() => {
                  setSort("Oldest Post");
                  setOpen(false);
                }}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Oldest Post
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockInternships.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-md p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0f4b8a] flex items-center justify-center text-white font-bold">
                {item.company[0]}
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-800">
                  {item.company}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-xl font-bold dark-blue">
                {item.role}
              </h2>
              <p className="text-xs text-gray-600 ">{item.tags}</p>
            </div>

            <div className="mt-1 text-xs text-gray-600">
              <span className="">{item.duration}</span>{" "}
              • {item.location} • {item.mode}
            </div>

            <div className="mt-1 text-xs flex items-center gap-2">
            <span>{item.deadline}</span>
            <img src={timeIcon} alt="time" className="w-4 h-4" />
            
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateTrendingTopics;
