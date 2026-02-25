// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import logo from "../../assets/logos/logo.png";
// import comp from "../../assets/sections/comp.png";
// import bsu from "../../assets/sections/bsu.jpg";

// const base_url = import.meta.env.VITE_BASE_URL;

// const CollegeReport = () => {
//   // const { applicationId, reportId } = useParams();
//   const applicationId = "661F79B7-67A2-4ECD-B7E1-D10C373E1CDD";
//   const reportId = "6f2ff38b-e71f-46dd-cac0-08de67f56d99";

//   const [relatedData, setRelatedData] = useState(null);
//   const [reportData, setReportData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const relatedRes = await axios.get(
//           `${base_url}/api/Application/ReportRelatedData?applicationId=${applicationId}`
//         );
//         const reportRes = await axios.get(
//           `${base_url}/api/Application/Report/${reportId}`
//         );

//         setRelatedData(relatedRes.data.data);
//         setReportData(reportRes.data.data);
//       } catch (error) {
//         console.error("Error fetching report data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [applicationId, reportId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
//       </div>
//     );
//   }

//   if (!relatedData || !reportData) {
//     return <div className="text-center mt-10">No Data Found</div>;
//   }

//   return (
//     <div>
//       <div className="max-w-5xl mx-auto py-10 px-6">
//         <div className="report-card border border-gray-200 rounded-xl shadow p-8">

//           {/* Header */}
//           <header className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={logo}
//                 alt="Platform Logo"
//                 className="h-24 w-24 rounded-full border-2 border-gray-100 shadow-sm"
//               />
//               <img
//                 src={comp}
//                 alt="Company Logo"
//                 className="h-24 w-24 rounded-full object-cover border-2 border-gray-100 shadow-sm"
//                 style={{ marginLeft: "-40px" }}
//               />
//               <div>
//                 <div className="text-sm text-gray-600 font-medium">
//                   {relatedData.companyName}
//                 </div>
//                 <div className="text-xs text-gray-400">
//                   Student Internship Office
//                 </div>
//               </div>
//             </div>

//             <div className="text-right">
//               <img
//                 src={bsu}
//                 alt="University Logo"
//                 className="h-24 w-24 rounded-full object-cover border-2 border-gray-100 shadow-sm ml-auto"
//               />
//             </div>
//           </header>

//           {/* Title */}
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-semibold">
//               Internship Completion Report
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Official record of internship completion, skills and evaluation
//             </p>
//           </div>

//           {/* Intern Information */}
//           <section className="section border border-gray-100 rounded-lg p-6 mb-6">
//             <h2 className="text-lg font-medium mb-4">Intern Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700">

//               <div>
//                 <div className="text-xs text-gray-500">Full Name</div>
//                 <div className="font-medium">{relatedData.candidateName}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">University / College</div>
//                 <div className="font-medium">{relatedData.candidateUniversityName}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Department / Major</div>
//                 <div className="font-medium">{relatedData.candidateMajor}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Intern Position</div>
//                 <div className="font-medium">{relatedData.internshipTitle}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Internship Start Date</div>
//                 <div className="font-medium">{reportData.startDate.split("T")[0]}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Internship End Date</div>
//                 <div className="font-medium">{reportData.endDate.split("T")[0]}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Total Training Hours</div>
//                 <div className="font-medium">{reportData.totalHours}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Company Name</div>
//                 <div className="font-medium">{relatedData.companyName}</div>
//               </div>

//             </div>
//           </section>

//           {/* Internship Details */}
//           <section className="section border border-gray-100 rounded-lg p-6 mb-6">
//             <h2 className="text-lg font-medium mb-4">Internship Details</h2>

//             <div className="mb-4">
//               <div className="text-sm text-gray-500 mb-2">Tasks and Responsibilities</div>
// <div className="text-sm text-gray-800 leading-relaxed space-y-2">
//   {relatedData.internshipResponsibilities
//     ?.split("<br>")
//     .map((item, index) => {
//       const cleanItem = item.replace("-", "").trim();
//       if (!cleanItem) return null;

//       return (
//         <div key={index} className="flex items-start space-x-2">
//           <div className="w-1 h-1 mt-2 rounded-full bg-black opacity-60"></div>
//           <div>{cleanItem}</div>
//         </div>
//       );
//     })}
// </div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-gray-500 mb-2">Skills Gained</div>
//               <div className="text-sm text-gray-800 leading-relaxed">{reportData.acquiredSkills}</div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-gray-500 mb-2">Performance Evaluation</div>
//               <div className="text-sm text-gray-800 leading-relaxed">{reportData.evaluation}</div>
//             </div>

//             <div>
//               <div className="text-sm text-gray-500 mb-2">Additional Notes / Comments</div>
//               <div className="text-sm text-gray-800 leading-relaxed">{reportData.comments}</div>
//             </div>
//           </section>

//           {/* Footer */}
//           <footer className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

//               <div>
//                 <div className="text-xs text-gray-500 mb-2">Supervisor</div>
//                 <div className="text-sm font-medium">{relatedData.internshipSupervisor}</div>
//               </div>

//               <div className="hidden md:block"></div>

//               <div className="text-sm text-gray-700">
//                 <div className="text-xs text-gray-500">Date of Report</div>
//                 <div className="font-medium">{reportData.createdAt.split("T")[0]}</div>
//               </div>

//             </div>

//             <div className="mt-6 text-xs text-gray-400">
//               Report Key: {reportData.uniqueKey}
//             </div>
//           </footer>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollegeReport;