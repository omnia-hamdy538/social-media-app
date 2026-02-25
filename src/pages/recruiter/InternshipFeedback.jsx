import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// ===== Assets =====
import checkIcon from "/src/assets/sections/app.png";
import timeIcon from "/src/assets/sections/time.png";
import defaultAvatar from "/src/assets/sections/profile-pic.png";

export default function InternshipFeedback() {
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const internshipId = location.state?.internshipId;

  useEffect(() => {
    if (!internshipId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`${baseUrl}/api/Internship/feedback/${internshipId}?page=1&pageSize=10`)
      .then(res => {
        const data = res.data.data;
        setFeedbackData({
          role: data.title,
          meta: `${data.type} · ${new Date(data.createdAt).toLocaleDateString()} · ${data.duration} · ${data.applicantsCount} Applicants`,
          totalFeedback: data.totalFeedbackCount,
          feedbacks: data.feedbacks.data.map(f => ({
            name: f.fullName,
            major: f.major,
            university: f.universityName,
            location: f.location,
            date: new Date(f.createdAt).toLocaleDateString(),
            text: f.comment,
            avatar: f.profilePhotoUrl || defaultAvatar
          }))
        });
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [internshipId]);

  // ===== Return Loading / No internship / No feedback =====
  if (loading) return <div className="text-center mt-20 text-blue-600">Loading feedback...</div>;
  if (!internshipId) return <div className="text-center mt-20 text-red-600">No internship selected.</div>;
  if (!feedbackData) return <div className="text-center mt-20 text-red-600">No feedback found.</div>;

  // ===== Main Render =====
  return (
    <div className="w-[90%] mx-auto min-h-screen p-6 sm:p-4">
      {/* ===== Header ===== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold dark-blue">{feedbackData.role}</h1>
          <p className="text-sm text-gray-800">{feedbackData.meta}</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl lg:me-5">
          <div className="w-16 h-16 flex items-center justify-center rounded-lg me-5">
            <img src={checkIcon} alt="check" className="w-full" />
          </div>
          <div className="text-md">
            <p className="font-bold dark-blue text-2xl">{feedbackData.totalFeedback}</p>
            <p className="dark-blue">Total Feedback Count</p>
          </div>
        </div>
      </div>

      {/* ===== Feedback Cards ===== */}
      <div className="space-y-4">
        {feedbackData.feedbacks.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              {/* Left Section */}
              <div className="flex items-start gap-4">
                <img
                  src={item.avatar}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-2xl lg:text-3xl mb-3">{item.name}</h3>
                  <p className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
                    <span className="me-3">{item.major}</span>
                    <span className="me-3">·</span>
                    <span className="me-3">{item.university}</span>
                    <span className="me-3">·</span>
                    <span className="me-3">{item.location}</span>
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1 text-sm lg:me-10 self-start lg:self-auto">
                <span>({item.date})</span>
                <img src={timeIcon} alt="time" className="w-5 h-5" />
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
