import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import resetPassImg from "../../assets/sections/forgetpass.jpg";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="w-[540px] shadow-md border rounded-xl p-10 text-center bg-white">

        {!submitted ? (
          <>
            <div className="mx-auto mb-6 w-20 h-20 rounded-full border-4 border-all flex items-center justify-center overflow-hidden bg-gray-50">
              <img
                src={resetPassImg}
                alt="Reset Password"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-bold dark-blue mb-4">
              Reset Your Password
            </h2>

            <p className="text-gray-600 mb-8">
              Enter your new password and confirm it below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-sm font-medium">New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-dark-blue text-white py-3 rounded-md"
              >
                Reset Password
              </button>
            </form>

            <button
              onClick={() => navigate("/login")}
              className="w-full border border-all dark-blue py-3 rounded-md hover:bg-blue-50 transition mt-4"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 w-20 h-20 rounded-full border-4 border-all flex items-center justify-center">
              <span className="text-5xl text-green-600">✔</span>
            </div>

            <h2 className="text-xl font-bold dark-blue mb-4">
              Password Reset Successful
            </h2>

            <p className="text-gray-600 mb-8">
              Your password has been updated successfully. You can now login with your new password.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-dark-blue text-white py-3 rounded-md mb-4"
            >
              Back to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}
