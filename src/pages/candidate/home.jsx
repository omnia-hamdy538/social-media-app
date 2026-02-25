import React, { useState } from "react";
import { Link } from "react-router-dom";
import collegeLogo from "/src/assets/sections/collegelogo.png";

/* ================= Categories ================= */
const categories = [
  "All",
  "Software Engineering",
  "Data & AI",
  "Cybersecurity",
  "Cloud & DevOps",
  "Design",
  "Marketing",
  "Accounting",
  "Business",
  "Sales",
];

/* ================= Jobs ================= */
const jobs = [
  {
    id: 1,
    company: "Vodafone",
    title: "Business & Marketing Intern",
    field: "Marketing / Business / Communication",
    duration: "6 Weeks",
    location: "Giza, Egypt",
    mode: "On-site",
    paid: "Free",
    deadline: "10 Dec 2025",
    daysLeft: "9 days left",
    verified: true,
  },
  {
    id: 2,
    company: "Meta",
    title: "Frontend Development Intern",
    field: "Computer Science / Frontend Engineering",
    duration: "2 months",
    location: "Dubai, UAE",
    mode: "Remote",
    paid: "Paid",
    deadline: "4 Dec 2025",
    daysLeft: "6 days left",
    verified: false,
  },

  {
    id: 3,
    company: "Amazon",
    title: "Backend Software Intern",
    field: "Software Engineering / Backend",
    duration: "3 months",
    location: "Cairo, Egypt",
    mode: "On-site",
    paid: "Paid",
    deadline: "7 Dec 2025",
    daysLeft: "8 days left",
    verified: false,
  },
  {
    id: 4,
    company: "Google",
    title: "Software Engineering Intern",
    field: "Computer Science / Software Engineering",
    duration: "3 months",
    location: "Cairo, Egypt",
    mode: "Hybrid",
    paid: "Paid",
    deadline: "3 Dec 2025",
    daysLeft: "5 days left",
    verified: true,
  },
  {
    id: 5,
    company: "IBM",
    title: "Data Science Intern",
    field: "Data Science / AI / Analytics",
    duration: "1 month",
    location: "Alexandria, Egypt",
    mode: "Remote",
    paid: "Free",
    deadline: "1 Dec 2025",
    daysLeft: "3 days left",
    verified: true,
  },
];

/* ================= Governorates ================= */
const governorates = [
  "All",
  ...new Set(
    jobs
      .filter((job) => job.location.includes("Egypt"))
      .map((job) => job.location.split(",")[0])
  ),
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("");
  const [activeGovernorate, setActiveGovernorate] = useState("All");

  /* ================= Filtering ================= */
  const filteredJobs = jobs.filter((job) => {
    const matchCategory =
      activeCategory === "All" ||
      job.field.toLowerCase().includes(activeCategory.toLowerCase());

    const matchType = !activeType || job.mode === activeType;

    const matchGovernorate =
      activeGovernorate === "All" ||
      job.location.startsWith(activeGovernorate);

    return matchCategory && matchType && matchGovernorate;
  });

  return (
    <div className="min-h-screen">
      {/* ================= Hero ================= */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex justify-center">
        <div className="border rounded-xl bg-white px-6 py-3 mb-5 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-[90%] lg:w-[60%]">
          <img
            src="/src/assets/sections/home.png"
            alt="hero"
            className="w-24 sm:w-32"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Find the Opportunity That Fits You
            </h2>
            <p className="text-sm mt-1 w-full sm:w-[76%]">
              Explore internships that match your skills, interests, and career goals.
            </p>
          </div>
        </div>
      </div>

      {/* ================= Filters ================= */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 w-full lg:max-w-[70%]">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActiveCategory(item)}
                className={`w-full sm:w-[155px] py-2 rounded-lg text-sm transition
                  ${
                    activeCategory === item
                      ? "bg-dark-blue-without-hover text-white"
                      : "border text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden lg:block h-20 w-px bg-gray-300" />

          <div className="flex flex-col gap-4 w-full lg:w-[40%]">
            {/* Type */}
            <div className="flex flex-col gap-2">

              <div className="flex items-center border rounded-lg overflow-hidden w-full">
                {["On-site", "Remote", "Hybrid"].map((type, index) => (
                  <React.Fragment key={type}>
                    <button
                      onClick={() => setActiveType(type)}
                      className={`flex-1 px-5 py-2 text-sm transition
                        ${
                          activeType === type
                            ? "bg-dark-blue-without-hover text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {type}
                    </button>
                    {index !== 2 && (
                      <div className="h-6 w-px bg-gray-300" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <select
              className="lg:w-[100%] bg-dark-blue rounded-full text-white p-2 pr-4 appearance-none cursor-pointer text-center  sm:w-[180px] w-full "
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 20 20'%3E%3Cpath d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.032l-6 6-6-6z'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(50% + 35px) center",
                backgroundSize: "0.9rem",
              }}
            >
              <option value="" disabled selected>
                location
              </option>
              <option value="cairo">Cairo</option>
              <option value="alex">Alexandria</option>
              <option value="giza">Giza</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= Results ================= */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-black">
              {filteredJobs.length}
            </span>{" "}
            Internship Found
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Sort by:</span>
            <select className="rounded-lg px-3 py-1.5 bg-white bg-transparent font-medium focus:outline-none cursor-pointer">
              <option>Newest Post</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* ================= Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredJobs.map((job) => (
            <Link key={job.id} to={`/home/internship/${job.id}`}>
              <div className="bg-white border rounded-xl p-5 hover:shadow-md transition h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-9 h-9">
                  <img
                    src="/src/assets/sections/vodafone.png"
                    alt={job.company}
                    className="w-9 h-9 object-contain"
                  />

                  {job.verified && (
                    <div className="absolute -bottom-1 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                      <img
                        src={collegeLogo}
                        alt="Verified by Faculty"
                        className="w-3 h-3 object-contain"
                      />
                    </div>
                  )}
                </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </h2>
                    <span className="text-sm font-semibold text-gray-800">
                      {job.company}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-3">
                  {job.field}
                </p>

                <p className="text-sm text-gray-500">
                  {job.duration} · {job.location} · {job.mode} · {job.paid}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span>
                    {job.daysLeft} (Deadline: {job.deadline})
                  </span>
                  <img
                    src="/src/assets/sections/time.png"
                    alt="time"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
