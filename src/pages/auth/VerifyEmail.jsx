// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const inputsRef = useRef([]);
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//   const handleChange = (value, index) => {
//     if (/^\d?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < 5) {
//         inputsRef.current[index + 1].focus();
//       }
//     }
//   };

//   const handleBack = () => navigate(-1);

//   const handleSubmit = () => {
//     const code = otp.join("");

//     if (code.length === 6) {
//       console.log("Entered OTP:", code);
//       navigate("/success", { state: { role: "recruiter" } });

//     } else {
//       alert("Please enter all 6 digits");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-white">

//       {/* BACK BUTTON */}
//       <button 
//         onClick={handleBack} 
//         className="absolute left-6 top-6 text-3xl dark-blue"
//       >
//         ←
//       </button>

//       {/* TITLE */}
//       <h1 className="text-4xl font-bold dark-blue mb-3">Login</h1>
//       <p className="text-gray-600 mb-8">
//         Please enter the 6-digit code sent to your email
//       </p>

//       {/* OTP INPUTS */}
//       <div className="flex gap-4 mb-4">
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputsRef.current[index] = el)}
//             type="text"
//             maxLength="1"
//             value={digit}
//             onChange={(e) => handleChange(e.target.value, index)}
//             className="w-14 h-14 border rounded-md text-center text-2xl focus:outline-blue-500"
//           />
//         ))}
//       </div>

//       <p className="text-gray-600 text-sm mb-10">
//         Didn’t Receive Code
//       </p>

//       {/* NEXT BUTTON */}
//       <button
//         onClick={handleSubmit}
//         className="bg-dark-blue text-white w-80 py-3 rounded-md text-lg"
//       >
//         Next
//       </button>
//     </div>
//   );
// }
