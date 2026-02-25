// CandidateAssessment.jsx
import React, { useState } from "react";
import correctIcon from "../../assets/sections/correct.png";
import failedIcon from "../../assets/sections/failedImg.png";
const mockAssessments = [
  {
    id: 1,
    title: "Technical Skills Assessment",
    description:
      "This assessment evaluates the student's technical knowledge and problem-solving skills related to software development.",
    questions: 20,
    cooldown: 14,
    status: "available", // available / passed / failed / closed
    score: null,
    attempts: 0,
    closedUntil: null,
  },
  {
    id: 2,
    title: "Technical Skills Assessment",
    description:
      "This assessment evaluates the student's technical knowledge and problem-solving skills related to software development.",
    questions: 20,
    cooldown: 14,
    status: "passed",
    score: 85,
    attempts: 2,
    closedUntil: null,
  },
  {
    id: 3,
    title: "Technical Skills Assessment",
    description:
      "This assessment evaluates the student's technical knowledge and problem-solving skills related to software development.",
    questions: 20,
    cooldown: 14,
    status: "failed",
    score: 20,
    attempts: 1,
    closedUntil: "Mar 3, 2025",
  },
  {
    id: 4,
    title: "Technical Skills Assessment",
    description:
      "This assessment evaluates the student's technical knowledge and problem-solving skills related to software development.",
    questions: 20,
    cooldown: 14,
    status: "available",
    score: null,
    attempts: 0,
    closedUntil: null,
  },
  {
    id: 5,
    title: "Technical Skills Assessment",
    description:
      "This assessment evaluates the student's technical knowledge and problem-solving skills related to software development.",
    questions: 20,
    cooldown: 14,
    status: "passed",
    score: 85,
    attempts: 2,
    closedUntil: null,
  },
  {
    id: 6,
    title: "Technical Skills Assessment",
    description:
      "This assessment evaluates the student's technical knowledge and problem-solving skills related to software development.",
    questions: 20,
    cooldown: 14,
    status: "failed",
    score: 20,
    attempts: 1,
    closedUntil: "Mar 3, 2025",
  },
];


const passedCount = mockAssessments.filter(a => a.status === "passed").length;
const CandidateAssessment = () => {
  const [tab, setTab] = useState("all"); // all / passed

  const filteredAssessments =
    tab === "all"
      ? mockAssessments
      : mockAssessments.filter((a) => a.status === "passed");

  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold dark-blue">Assessments</h1>
        <p className="ms-2 text-gray-600">Test your skills and track your assessment history in one place</p>
        </div>
<div className="bg-blue-50 px-4 sm:px-5 py-3 sm:py-4 rounded-xl flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[150px]">
  <img
    src={correctIcon}
    alt="Passed"
    className="w-8 h-8 sm:w-10 sm:h-10"
  />
  <div>
    <p className="text-blue-900 font-bold text-xl sm:text-2xl">{passedCount}</p>
    <p className="text-xs text-blue-900">Passed Assessments</p>
  </div>
</div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button
          className={`pb-2 font-medium ${tab === "all" ? "border-b-2 border-bottom dark-blue" : "text-gray-600"}`}
          onClick={() => setTab("all")}
        >
          All Assessments
        </button>
        <button
          className={`pb-2 font-medium ${tab === "passed" ? "border-b-2 border-bottom dark-blue" : "text-gray-600"}`}
          onClick={() => setTab("passed")}
        >
          Passed
        </button>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{assessment.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{assessment.description}</p>
              <div className="flex gap-4  text-sm mb-4">
                <span className="bg-gray-200 rounded-full px-2 py-1">Questions: {assessment.questions}</span>
                <span className="bg-gray-200 rounded-full px-2 py-1">Cooldown period: {assessment.cooldown} Days</span>
              </div>
            </div>

            <div>
              {assessment.status === "available" && (
               <div className="flex justify-end">
                 <button className="bg-dark-blue text-white px-4 py-2 rounded-lg">
                  Take Assessment
                </button>
               </div>
              )}
                {assessment.status === "passed" && (
                    <>
                  <div className="flex justify-between">
                <div className="flex items-center text-gray-500 px-4 py-2 rounded-lg gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center text-white text-xs">
          ✓
        </div>
                    <span>
                    Passed: {assessment.score}% | Attempts: {assessment.attempts}
                    </span>
                </div>
                  <button className=" px-10 flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">

                     <span className="">Passed</span>
                     </button>
                  </div>



                  </>
                )}

{assessment.status === "failed" && (
  <div className="flex items-center gap-2">
    <img 
      src={failedIcon} 
      alt="Failed" 
      className="w-5 h-5" 
    />
    <div className="flex justify-between  w-full">
        <div className="flex gap-1 items-center">
      <div className="text-gray-500 px-2 rounded-lg text-sm">
        Failed: {assessment.score}%
      </div>
      {assessment.closedUntil && (
        <div className="text-gray-500 text-sm">
          | Closed Until: {assessment.closedUntil}
        </div>
      )}
    </div>

  <button
    disabled
    className="flex items-center gap-2 bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed"
  >
   
    <span>Take Assessment</span>
  </button>

    </div>
  </div>
)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateAssessment;