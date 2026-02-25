// src/pages/UserApplication.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


// Icons
import locationIcon from "/src/assets/sections/location.png";
import phoneIcon from "/src/assets/sections/phone.png";
import mesIcon from "/src/assets/sections/mes.png";
import downloadIcon from "/src/assets/sections/download.png";
import linkedinIcon from "/src/assets/sections/linkedin.png";

// ===== Helpers =====
const statusStyles = {
  new: "bg-blue-100 text-blue-700",
  "interview pending": "bg-purple-100 text-purple-700",
  accepted: "bg-yellow-50 text-yellow-400",
  finished: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-700",
};

const mapStatus = (status) => {
  switch (status) {
    case 1:
      return "new";
    case 3:
      return "interview pending";
    case 2:
      return "accepted";
    case 4:
      return "finished";
    case 5:
      return "rejected";
    default:
       return "unknown";

  }
};

const normalizeUrl = (url) => {
  if (!url) return null;
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};

const displayUrl = (url) => {
  if (!url) return "Not exist";
  return url.replace(/^https?:\/\//, "");
};

export default function UserApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const base_url = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [applicationOverview, setApplicationOverview] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [assessment, setAssessment] = useState(null);

  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const fetchOverview = async () => {
    const overviewRes = await axios.get(
      `${base_url}/api/Application/GetApplicationOverview/${id}`
    );
    const overviewData = overviewRes.data?.data || null;
    setApplicationOverview(overviewData);
    return overviewData;
  };

  const updateApplicationStatus = async (newStatus) => {
    try {
      const res = await axios.patch(
        `${base_url}/api/Application/status/${id}`,
        { status: newStatus }
      );

      console.log("PATCH /status response:", res.data);

      if (res.data?.succeeded) {
        await fetchOverview();

        toast.success("Report updated successfully ✅");


        return true;
      } else {
        toast.error(res.data?.message || "Status update failed ❌");
        return false;
      }
    } catch (err) {
      console.error("PATCH /status error:", err);
      toast.error("Status update failed ❌");
      return false;
    }
  };

  const rejectApplication = async () => {
    try {
      setLoadingReject(true);
      const ok = await updateApplicationStatus(5);
      setLoadingReject(false);
      if (!ok) return;
    } catch {
      toast.error("Reject failed ❌");
      setLoadingReject(false);
    }
  };

  useEffect(() => {
const fetchAll = async () => {
  try {
    setLoading(true);

    const overviewData = await fetchOverview();
    const candidateId = overviewData?.candidateId;

    if (!candidateId) {
      setAssessment(null);
      return;
    }



        const candidateRes = await axios.get(
          `${base_url}/api/Application/GetCandidate/${candidateId}`
        );
        setCandidate(candidateRes.data?.data || null);

        const academicRes = await axios.get(
          `${base_url}/api/Application/GetAcademicDetails/${candidateId}`
        );
        setAcademic(academicRes.data?.data || null);

        const projectsRes = await axios.get(
          `${base_url}/api/Application/GetCandidateProjects/${candidateId}`
        );
        setProjects(projectsRes.data?.data || []);

        const expRes = await axios.get(
          `${base_url}/api/Application/GetCandidateExperiences/${candidateId}`
        );
        setExperience(expRes.data?.data || []);

        const certRes = await axios.get(
          `${base_url}/api/Application/GetCandidateCertificates/${candidateId}`
        );
        setCertifications(certRes.data?.data || []);

        const skillsRes = await axios.get(
          `${base_url}/api/Application/GetCandidateSkills/${candidateId}`
        );
        setSkills(skillsRes.data?.data || []);

        // ===== Assessment =====
        try {
          const assessRes = await axios.get(
            `${base_url}/api/Application/GetCandidateAssessments/${candidateId}`
          );

          if (assessRes.data?.succeeded && assessRes.data?.data) {
            setAssessment(assessRes.data.data);
          } else {
            setAssessment({
              title: "No assessment for this student",
              status: "Not exist",
            });
          }
        } catch (err) {
          if (
            err.response?.data?.message ===
            "No assessments found for the specified candidate."
          ) {
            setAssessment({
              title: "No assessment for this student",
              status: "Not exist",
            });
          } else {
            console.error("Assessment API Error:", err);
            setAssessment({
              title: "No assessment for this student",
              status: "Not exist",
            });
          }
        }
      } catch (err) {
        console.error("API Error:", err);
        toast.error("Failed to load application data ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

    // ===== userData =====
  const userData = {
    name: candidate?.fullName || "Not exist",
    phone: candidate?.phoneNumber || "Not exist",
    email: candidate?.email || null,
    location: candidate?.location || "Not exist",
    github: normalizeUrl(candidate?.githubUrl) || null,
    linkedin: normalizeUrl(candidate?.linkedinUrl) || null,
    portfolio: normalizeUrl(candidate?.portfolioUrl) || null,
    resume: candidate?.cvUrl || null,
    profilePhotoUrl: candidate?.profilePhotoUrl || null,

    academic: academic || {
      university: "Not exist",
      gpa: "Not exist",
      degree: "Not exist",
      major: "Not exist",
      grade: "Not exist",
      department: "Not exist",
    },

    projects:
      projects.length > 0
        ? projects.map((p) => ({
            title: p.title || "Not exist",
            role: p.role || "Not exist",
            description: [
              p.description || "Not exist",
              `Technologies: ${p.technologies || "Not exist"}`,
              `GitHub: ${p.projectUrl || "Not exist"}`,
            ],
          }))
        : [
            {
              title: "Not exist",
              role: "Not exist",
              description: ["Not exist"],
            },
          ],

    experience:
      experience.length > 0
        ? experience.map((e) => ({
            title: `${e.position || "Not exist"} – ${
              e.companyName || "Not exist"
            }`,
            duration:
              e.startDate && e.endDate
                ? `${new Date(e.startDate).toLocaleDateString()} - ${new Date(
                    e.endDate
                  ).toLocaleDateString()}`
                : "Not exist",
            description: e.description || "Not exist",
          }))
        : [
            {
              title: "Not exist",
              duration: "Not exist",
              description: "Not exist",
            },
          ],

    certifications:
      certifications.length > 0
        ? certifications.map((c) => ({
            title: c.certificateName || "Not exist",
            provider: c.issuer || "Not exist",
            expiry: c.expiryDate
              ? new Date(c.expiryDate).toLocaleDateString()
              : "No Expiry",
            from: c.issueDate
              ? new Date(c.issueDate).toLocaleDateString()
              : "Not exist",
            to: c.expiryDate
              ? new Date(c.expiryDate).toLocaleDateString()
              : "Not exist",
          }))
        : [
            {
              title: "Not exist",
              provider: "Not exist",
              expiry: "No Expiry",
              from: "Not exist",
              to: "Not exist",
            },
          ],

    skills:
      skills.length > 0
        ? skills.map((s) => s.skillName || "Not exist")
        : ["Not exist"],

      assessment: assessment || {
        title: "Not exist",
        status: "Not exist",
      },


    application: {
      title: applicationOverview?.internshipTitle || "Not exist",
      appliedOn: applicationOverview?.appliedAt
        ? new Date(applicationOverview.appliedAt).toLocaleDateString()
        : "Not exist",
      status: applicationOverview
        ? mapStatus(applicationOverview.status)
        : "Not exist",
    },
  };

  const status = userData.application.status;

  
  console.log(applicationOverview);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-dark-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ===== Left Section ===== */}
        <div className="bg-white p-6 rounded-2xl w-full lg:w-1/3 border border-gray-200 shadow">
          <div className="flex flex-col items-center">
            <img
              src={
                userData.profilePhotoUrl ||
                "/src/assets/sections/profile-pic.png"
              }
              alt="Profile"
              className="mt-10 w-60 h-60 rounded-full mb-4"
            />
            <h2 className="text-3xl font-bold">{userData.name}</h2>
            <p className="text-blue-800 font-bold mb-6">
              {applicationOverview?.internshipTitle}
            </p>

            {/* ===== Dynamic Buttons ===== */}
            <div className="flex gap-2 mb-6">
              {status === "new" && (
                <>
                  <button
                    className="bg-dark-blue text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                    disabled={loadingSchedule}
                    onClick={async () => {
                      setLoadingSchedule(true);

                      const ok = await updateApplicationStatus(3);

                      setLoadingSchedule(false);
                      if (!ok) return;
                    }}
                  >
                    {loadingSchedule && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    Schedule Interview
                  </button>

                  <button
                    className="border border-red-600 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                    disabled={loadingReject}
                    onClick={rejectApplication}
                  >
                    {loadingReject && (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    Reject
                  </button>
                </>
              )}

              {status === "interview pending" && (
                <>
                  <button
                    className="bg-dark-blue text-white px-10 py-2 rounded-lg flex items-center justify-center gap-2"
                    disabled={loadingAccept}
                    onClick={async () => {
                      setLoadingAccept(true);

                      const ok = await updateApplicationStatus(2);

                      setLoadingAccept(false);
                      if (!ok) return;
                    }}
                  >
                    {loadingAccept && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    Accept
                  </button>

                  <button
                    className="border border-red-600 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                    disabled={loadingReject}
                    onClick={rejectApplication}
                  >
                    {loadingReject && (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    Reject
                  </button>
                </>
              )}

              {status === "accepted" && (
                <button
                  className="bg-dark-blue text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
                    disabled={loadingReport}
                    onClick={async () => {
                      setLoadingReport(true);

                      
                      await new Promise((resolve) => setTimeout(resolve, 700));

                     navigate(`/write-internship-report/${id}`, {
                        state: {
                          companyId: applicationOverview.companyId,
                        },
                      });


                      setLoadingReport(false);
                    }}
                  >
                    {loadingReport && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    Write Internship Report
                  </button>
                )}

              {status === "finished" && (
                <button
                  className="bg-dark-blue text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
                  disabled={loadingReport}
                  onClick={async () => {
                    setLoadingReport(true);
                    await new Promise((resolve) => setTimeout(resolve, 700));
                     navigate(`/edit-internship-report/${id}`, {
                      state: {
                        applicationId: id,
                        reportId: applicationOverview?.reportId,
                      },
                    });



                    setLoadingReport(false);
                  }}
                >
                  {loadingReport && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  View & Edit Report Data
                </button>
              )}
            </div>

            {/* Contact Info */}
            <div className="w-full space-y-4 text-sm text-gray-800">
              <p className="flex items-center gap-2">
                <img src={locationIcon} className="w-4 h-4" />
                {userData.location}
              </p>

              <p className="flex items-center gap-2">
                <img src={mesIcon} className="w-4 h-4" />
                {userData.email ? (
                  <a
                    href={`mailto:${userData.email}`}
                    className="text-black hover:underline"
                  >
                    {userData.email}
                  </a>
                ) : (
                  "Not exist"
                )}
              </p>

              <p className="flex items-center gap-2">
                <img src={phoneIcon} className="w-4 h-4" />
                <a
                  href={`tel:${userData.phone}`}
                  className="text-black hover:underline"
                >
                  {userData.phone}
                </a>
              </p>

              <p>
                {userData.github ? (
                  <a
                    href={userData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    🔗 {displayUrl(userData.github)}
                  </a>
                ) : (
                  "Not exist"
                )}
              </p>

              <p>
                <img src={linkedinIcon} className="w-4 h-4 inline" />{" "}
                {userData.linkedin ? (
                  <a
                    href={userData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    {displayUrl(userData.linkedin)}
                  </a>
                ) : (
                  "Not exist"
                )}
              </p>

              <p>
                {userData.portfolio ? (
                  <a
                    href={userData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    🔗 {displayUrl(userData.portfolio)}
                  </a>
                ) : (
                  "Not exist"
                )}
              </p>

              <p className="flex items-center gap-2">
                <img src={downloadIcon} className="w-4 h-4" />
                {userData.resume ? (
                  <a
                    href={userData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Download CV
                  </a>
                ) : (
                  "Not exist"
                )}
              </p>
            </div>

            {/* Skills */}
            <div className="mt-10 border py-5 border-gray-200 rounded-xl px-3">
              <h3 className="font-bold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Right Section ===== */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow">
            <h3 className="font-bold text-xl mb-2">Application Overview</h3>

            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Internship Title</p>
                <p className="font-medium">{userData.application.title}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Applied On</p>
                <p className="font-medium">{userData.application.appliedOn}</p>
              </div>

              <div className="lg:me-30">
                <p className="text-gray-500 text-sm">Application Status</p>
                <p
                  className={`px-3 py-1 rounded text-sm font-bold capitalize text-center ${statusStyles[status]}`}
                >
                  {status}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Profile */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow ">
            <h3 className="font-bold text-xl mb-4">Academic Profile</h3>
            <div className="grid grid-cols-3 gap-4 gap-x-18 text-sm">
              <div>
                <p className="text-gray-500 text-sm">University</p>
                <p className="font-medium text-md">
                  {userData.academic.university}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">GPA</p>
                <p className="font-medium text-md">{userData.academic.gpa}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Degree</p>
                <p className="font-medium text-md">
                  {userData.academic.degree}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Major</p>
                <p className="font-medium text-md">{userData.academic.major}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Grade</p>
                <p className="font-medium text-md">{userData.academic.grade}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Department</p>
                <p className="font-medium text-md">
                  {userData.academic.department}
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow ">
            <h3 className="font-bold text-xl mb-2">Projects</h3>
            {userData.projects.map((project, idx) => (
              <div key={idx} className="mb-2 text-sm">
                <p className="font-medium">{project.title}</p>
                <p className="text-gray-500">Role: {project.role}</p>
                <ul className="list-disc list-inside text-gray-500 ms-5">
                  {project.description.map((desc, i) => {
                    const isLink =
                      desc.toLowerCase().includes("github.com") ||
                      desc.toLowerCase().includes("portfolio.com");

                    const showBullet = i < 2;

                    return (
                      <li
                        key={i}
                        className={`mb-1 ${!showBullet ? "list-none" : ""}`}
                      >
                        {isLink ? (
                          <a
                            href={`https://${desc.split(": ")[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            🔗 {desc.split(": ")[1]}
                          </a>
                        ) : (
                          desc
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow ">
            <h3 className="font-bold text-xl mb-2">Experience</h3>
            {userData.experience.map((exp, idx) => (
              <div key={idx} className="mb-2 text-sm">
                <p className="font-medium">{exp.title}</p>
                <p className="text-gray-500">{exp.duration}</p>
                <p className="text-gray-500">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow">
            <h3 className="font-bold text-xl mb-4">Certifications</h3>
            {userData.certifications.map((cert, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium text-gray-700 mb-2">
                  {cert.title}
                </p>
                <div className="flex flex-wrap gap-25 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    {cert.provider}
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    {cert.expiry}
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    {cert.from}
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    {cert.to}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Assessment */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow ">
            <h3 className="font-bold text-xl mb-2">Assessment</h3>
            <p className="text-sm">{userData.assessment.title}</p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              Status: {userData.assessment.status}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}



















