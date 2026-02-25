import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgetPass from "../../assets/sections/forgetpass.jpg"
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="w-[540px] shadow-md border rounded-xl p-10 text-center bg-white">

        {!submitted ? (
          <>
            <div className="mx-auto mb-6 w-20 h-20 rounded-full border-4 border-all flex items-center justify-center overflow-hidden bg-gray-50">
<img
  src={forgetPass}
  alt="Forgot Password"
  className="w-full h-full object-cover"
/>

</div>


            <h2 className="text-xl font-bold dark-blue mb-4">
              Forgot Your Password?
            </h2>

            <p className="text-gray-600 mb-8">
              Enter your email address and we’ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>

            <button
            type="button"
            onClick={() => navigate("/reset")}
            className="w-full bg-dark-blue text-white py-3 rounded-md"
            >
            Send Reset Link
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
              Reset Link Sent
            </h2>

            <p className="text-gray-600 mb-8">
              If an account with that email exists, we have sent a password reset link.
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