import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const role = state?.role || "candidate";

  const isRecruiter = role === "recruiter";

  const handleCompleteProfile = () => {
    if (isRecruiter) {
      navigate("/recruiter-onboarding");
    } else {
      navigate("/candidate-onboarding");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      <div className="w-[540px] shadow-md border rounded-xl p-10 text-center bg-white">

        {/* Circle Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full border-4 border-all flex items-center justify-center">
          <span className="text-5xl text-green-600">✔</span>
        </div>

        <h2 className="text-xl font-bold dark-blue mb-4">
         Your account has been successfully created.
        </h2>


        <ul className="text-gray-600 text-left space-y-2 mb-8">
          {isRecruiter ? (
            <>
              <li>• Start attracting top talent by posting your first internship.</li>
              <li>• Manage applications and communicate with candidates easily.</li>
              <li>• Customize your company profile for better visibility.</li>
            </>
          ) : (
            <>
              <li>• You’re now ready to search and apply for new opportunities.</li>
              <li>• Set up your profile to get matched with the best Training.</li>
              <li>• Don’t forget to upload your portfolio!</li>
            </>
          )}
        </ul>

        {isRecruiter ? (
          <button onClick={() => navigate("/post-internship")}
            className="w-full bg-dark-blue text-white py-3 rounded-md mb-4"
          >
          Post an Internship
          </button>

        ) : (
          <button onClick={()=>navigate("/home")} className="w-full bg-dark-blue text-white py-3 rounded-md mb-4">
            Browse Training
          </button>
        )}

        <button
          onClick={handleCompleteProfile}
          className="w-full border border-all dark-blue py-3 rounded-md hover:bg-blue-50 transition"
        >
          {isRecruiter ? "Complete Company Profile" : "Complete My Profile"}
        </button>

      </div>
    </div>
  );
}
