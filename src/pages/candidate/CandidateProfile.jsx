










import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaPhone, FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { MdEmail, MdFileDownload } from "react-icons/md";
import profileImg from "../../assets/sections/profile-pic.png"
import editIcon from "../../assets/sections/whiteedit.png"
import deleteIcon from "../../assets/sections/delete.png"
import plusIcon from "../../assets/sections/plus.png"
import whiteLocation from "../../assets/sections/whitelocation.png";
import downloadIcon from "../../assets/sections/download.png";
import linkedinIcon from "/src/assets/sections/linkedin.png";
import phoneIcon from "/src/assets/sections/phone.png";
import skillsIcon from "/src/assets/sections/skills.png"
import softSkillsIcon from "/src/assets/sections/softskills.png"
import certificateImg from "/src/assets/sections/certificate.png"
import projectsImg from "/src/assets/sections/projects.png"
import cameraIcon from "/src/assets/sections/camera.png"
const CandidateProfile = () => {
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showSoftSkillInput, setShowSoftSkillInput] = useState(false);
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [newSkill, setNewSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [languageLevel, setLanguageLevel] = useState("Native");
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const [editingExperience, setEditingExperience] = useState(null);
const [experienceForm, setExperienceForm] = useState({
  company: "",
  title: "",
  duration: "",
  description: "",
  startDate: "",
  endDate: ""
});

const [editingEducation, setEditingEducation] = useState(null);
const [educationForm, setEducationForm] = useState({
  degree: "",
  field: "",
  university: "",
  gpa: "",
  startDate: "",
  endDate: ""
});


const [editingCertificate, setEditingCertificate] = useState(null);
const [certificateForm, setCertificateForm] = useState({
  name: "",
  issuer: "",
  date: "",
  expiry: ""
});



const [projectForm, setProjectForm] = useState({
  title: "",
  technologies: "",
  description: "",
  project_url: "",
});
const [editingProject, setEditingProject] = useState(null);

const addProject = (project) => {
  setProjects([...projects, project]);
};


const updateProject = (index, updatedProject) => {
  const newProjects = [...projects];
  newProjects[index] = updatedProject;
  setProjects(newProjects);
};


  const [showEducationModal, setShowEducationModal] = useState(false);

  const [skills, setSkills] = useState([
    "Figma", "User Research", "Wireframing", "Wireframing", "Wireframing", 
    "Prototyping", "Prototyping"
  ]);

  const [softSkills, setSoftSkills] = useState([
    "Figma", "User Research", "Wireframing", "Wireframing", "Wireframing", 
    "Prototyping", "Prototyping", "Prototyping"
  ]);

  const [interests, setInterests] = useState([
    "Figma", "User Research", "Wireframing", "Wireframing", "Wireframing", 
    "Prototyping", "Prototyping", "Prototyping", "Prototyping",
    "Figma", "User Research", "Wireframing"
  ]);

  const [languages, setLanguages] = useState([
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" }
  ]);

  const [education, setEducation] = useState([
    {
      degree: "Bachelor of Computer Science",
      field: "Computer Science",
      university: "Cairo University",
      gpa: "3.02",
      grade:"good",
      startDate: "Mar 15, 2025",
      endDate: "Mar 15, 2025"
    }
  ]);

  const [experience, setExperience] = useState([
    {
      title: "Software Development Intern",
      company: "ABC Tech Solutions",
      duration: "6 Months",
      position:"Manager",
      startDate: "Mar 15, 2025",
      endDate: "Mar 15, 2025",
      description: "Worked on developing and testing web applications using modern frameworks. Collaborated with senior developers and participated in agile sprint planning."
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      name: "Data Structures & Algorithms Certificate",
      issuer: "Coursera",
      date: "Mar 15, 2025",
      expiry: "Mar 15, 2025"
    }
  ]);

  const [projects, setProjects] = useState([
    {
       title: "Internship Management Platform",
      description: "A web-based platform that connects students with internship opportunities and tracks application status.",
      technologies: "ReactJS, Express, SQL, Stripe, NodeJs",
       project_url: "github.com/simpleproject"
      
    }
  ]);


  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setSoftSkills([...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill("");
      setShowSoftSkillInput(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
      setShowInterestInput(false);
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, { name: newLanguage.trim(), level: languageLevel }]);
      setNewLanguage("");
      setLanguageLevel("Native");
      setShowLanguageInput(false);
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const removeSoftSkill = (index) => {
    setSoftSkills(softSkills.filter((_, i) => i !== index));
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8 ">
      <div className=" p-6 sm:p-8 gap-3 flex flex-col">






   {/* Header Section */}
<div className="bg-white rounded-2xl shadow-sm p-3">

      <div className="flex flex-col sm:flex-row items-start gap-4  pb-6 ">

{/* Profile Image */}
<div className="relative">
  <img
    src={profileImg}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover"
  />

  {/* Edit Button */}
  <button
    onClick={() => setShowPhotoPopup(true)}
    className="absolute -bottom-1 -right-1 w-6 h-6 bg-dark-blue rounded-full flex items-center justify-center shadow"
  >
    <img src={editIcon} alt="edit" className="w-3 h-3"/>
  </button>

  {/* Photo Popup */}

          {showPhotoPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden relative">

            {/* Close Button */}
            <button
              onClick={() => setShowPhotoPopup(false)}
              className="absolute top-3 right-3 text-gray-500 text-lg"
            >
              ✕
            </button>

            {/* Title */}
            <div className="p-4">
              <h2 className="dark-blue font-medium">
                Photo Profile
              </h2>
            </div>

            {/* Image */}
            <div className="flex justify-center py-4">
              <img
                src={profileImg}
                alt="Profile Preview"
                className="w-40 h-40 rounded-full object-cover"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-around items-center bg-gray-100 py-4">

              {/* Update */}
              <button className="flex flex-col items-center text-black hover:opacity-80">
                <img src={cameraIcon} alt="update" className="w-6 h-6 mb-1" />
                <span className="text-sm">Update Photo</span>
              </button>

              {/* Delete */}
              <button className="flex flex-col items-center text-red-600 hover:opacity-80">
                <img src={deleteIcon} alt="delete" className="w-6 h-6 mb-1" />
                <span className="text-sm">Delete</span>
              </button>

            </div>

          </div>
        </div>
           )}
</div>

        {/* Name and Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">

            <div>
              <h1 className="text-xl font-bold text-gray-900">Yara Mohamed</h1>
              <p className="text-sm dark-blue">Mobile App UI/UX</p>
              <p className="text-xs text-gray-800 flex items-center gap-1 mt-1">
                <img src={whiteLocation} alt="location" className="w-3 h-3 object-contain" />
                bani-suef
              </p>
            </div>

            {/* Edit Circle */}
            <div className="relative flex mt-2 sm:mt-0">

              
              <div className="w-6 h-6 bg-dark-blue rounded-full flex items-center justify-center shadow">
                <img src={editIcon} alt="edit" className="w-3 h-3" />
              </div>
            </div>

          </div>

          {/* Bio */}
          <p className="text-sm text-gray-500 mb-3">
            I'm Lian, a dedicated UI/UX designer and frontend developer with a sharp focus on creating smooth user experiences and 
            transforming designs into reality. I'm Lian, a dedicated UI/UX designer and frontend developer with a sharp focus on creating 
            smooth user experiences and transforming designs into reality.
          </p>
        </div>
        
      </div>
    {/* Links Section */}
      <div className="flex flex-wrap gap-4 text-xs text-black ">
        {/* GitHub */}
        <a
          href="https://github.com/iamdahmad"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <span className="text-sm">🔗</span>
          github.com/iamdahmad
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/iamdahmad"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <img src={linkedinIcon} alt="linkedin" className="w-4 h-4 object-contain" />
          Linkedin.com/in/iamdahmad
        </a>

        {/* Portfolio */}
        <a
          href="https://www.portfolio.com/iamdahmadesse"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <span className="text-sm">🔗</span>
          Portfolio | www.portfolio.com/iamdahmadesse
        </a>

{/* Resume */}
<a
  href="https://www.resume.com/YaraMohamed.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 hover:underline"
>
  <span className="text-sm">🔗</span>
  Resume | Yara Mohamed
</a>
        {/* Phone */}
        <a
          href="tel:+20112345678"
          className="flex items-center gap-1 hover:underline"
        >
          <img src={phoneIcon} alt="phone" className="w-4 h-4 object-contain" />
          +20 112 345 678
        </a>
      </div>
</div>



        {/* Skills Section */}
        <div className=" pb-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
               <img src={skillsIcon} alt="" className="w-5 h-5" />
              <h2 className="text-base font-semibold text-gray-900">Skills</h2>
            </div>
            <div className="flex items-center gap-2">
              
              <button
                onClick={() => setShowSkillInput(!showSkillInput)}
                className="me-4 w-8 h-8 bg-dark-blue text-white rounded-lg flex items-center justify-center"
              >
                {showSkillInput ? <FaTimes className="w-4 h-4" /> : <FaPlus className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {showSkillInput && (
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Enter skill name"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-dark-blue text-white text-sm rounded-lg "
              >
                Add
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <FaTimes className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className=" pb-6 bg-white rounded-2xl shadow-sm p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={softSkillsIcon} alt="" className="w-5 h-5" />
              <h2 className="text-base font-semibold text-gray-900">Soft Skills</h2>
            </div>
            <div className="flex items-center gap-2">
              
              <button
                onClick={() => setShowSoftSkillInput(!showSoftSkillInput)}
                className="me-4 w-8 h-8 bg-dark-blue text-white rounded-lg flex items-center justify-center "
              >
                {showSoftSkillInput ? <FaTimes className="w-4 h-4" /> : <FaPlus className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {showSoftSkillInput && (
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSoftSkill()}
                placeholder="Enter soft skill name"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
              />
              <button
                onClick={handleAddSoftSkill}
                className="px-4 py-2 bg-dark-blue  text-white text-sm rounded-lg "
              >
                Add
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="group relative px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {skill}
                <button
                  onClick={() => removeSoftSkill(index)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <FaTimes className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className=" pb-6 bg-white border-gray-200 p-3 rounded-2xl shadow-sm ">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">Interests</h2>
            </div>
            <div className="flex items-center gap-2">
             
              <button
                onClick={() => setShowInterestInput(!showInterestInput)}
                className="me-4 w-8 h-8 bg-dark-blue  text-white rounded-lg flex items-center justify-center "
              >
                {showInterestInput ? <FaTimes className="w-4 h-4" /> : <FaPlus className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {showInterestInput && (
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                placeholder="Enter interest"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
              />
              <button
                onClick={handleAddInterest}
                className="px-4 py-2 bg-dark-blue  text-white text-sm rounded-lg"
              >
                Add
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="group relative px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {interest}
                <button
                  onClick={() => removeInterest(index)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <FaTimes className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="pb-6 bg-white rounded-2xl shadow-sm p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">Languages</h2>
            </div>
            <div className="flex items-center gap-2">
              
              {/* <select className="text-xs border border-gray-300 rounded px-2 py-1">
                <option>Native</option>
              </select> */}
              <button
                onClick={() => setShowLanguageInput(!showLanguageInput)}
                className="me-4 w-8 h-8 bg-dark-blue  text-white rounded-lg flex items-center justify-center "
              >
                {showLanguageInput ? <FaTimes className="w-4 h-4" /> : <FaPlus className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {showLanguageInput && (
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                placeholder="Enter language"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
              />
              <select
                value={languageLevel}
                onChange={(e) => setLanguageLevel(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option>Native</option>
                <option>Fluent</option>
                <option>Intermediate</option>
                <option>Beginner</option>
              </select>
              <button
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-dark-blue  text-white text-sm rounded-lg "
              >
                Add
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="group relative px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {lang.name}: {lang.level}
                <button
                  onClick={() => removeLanguage(index)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <FaTimes className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Education Section */}
        <div className="pb-6 bg-white rounded-2xl shadow-sm p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <h2 className="text-base font-semibold text-gray-900">Education</h2>
            </div>

            {/* Add Button */}
            <button
            onClick={() => {
                setEditingEducation(null);
                setEducationForm({
                degree: "",
                field: "",
                university: "",
                gpa: "",
                startDate: "",
                endDate: ""
                });
                setShowEducationModal(true);
            }}
            className="me-4 rounded-lg flex items-center justify-center"
            >
            <img src={plusIcon} alt="add" className="w-6 h-6" />
            </button>
        </div>

        {education.map((edu, index) => (
            <div key={index} className="rounded-lg p-4 border-b last:border-none">
            <div className="flex justify-between items-start mb-2">
                
                {/* Left Info */}
                <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                </h3>

                <p className="text-sm text-gray-600 my-2 ps-2">
                    {edu.field} - {edu.university}
                </p>

                <p className="text-sm text-gray-500 ps-2">
                    <span className="text-gray-600">GPA: </span>
                    {edu.gpa}
                </p>
                </div>

                {/* Right Actions */}
                <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                </span>

                {/* Delete */}
                <button
                    onClick={() =>
                    setEducation(education.filter((_, i) => i !== index))
                    }
                    className="w-6 h-6 rounded-full flex items-center justify-center shadow border-2 border-red-500"
                >
                    <img src={deleteIcon} alt="delete" className="w-3 h-3" />
                </button>

                {/* Edit */}
               <button
                onClick={() => {
                    setEditingEducation(index);
                    setEducationForm({
                    ...edu,
                    startDate: new Date(edu.startDate).toISOString().split("T")[0],
                    endDate: new Date(edu.endDate).toISOString().split("T")[0]
                    });
                    setShowEducationModal(true);
                }}
                className="w-6 h-6 bg-dark-blue rounded-full flex items-center justify-center shadow"
                >
                <img src={editIcon} alt="edit" className="w-3 h-3" />
                </button>

                </div>
            </div>
            </div>
        ))}
        </div>


        {/* Experience Section */}
        <div className="pb-6 bg-white rounded-2xl shadow-sm p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">Experience</h2>
            </div>
            <button
            onClick={() => setShowExperienceModal(true)}
            className="me-4 rounded-lg flex items-center justify-center"
            >
            <img src={plusIcon} alt="add" className="w-6 h-6" />
            </button>

          </div>

          {experience.map((exp, index) => (
            <div key={index} className=" rounded-lg p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-sm text-gray-600">{exp.company} - Duration: {exp.duration}</p>
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs ">{exp.startDate} - {exp.endDate}</span>
                  
                  <button className="w-6 h-6  rounded-full flex items-center justify-center shadow border border-2 border-red-500">
                    <img src={deleteIcon} alt="delete" className="w-3 h-3" />
                  </button>
                 <button
  onClick={() => {
    setEditingExperience(index);
    setExperienceForm({
      ...exp,
      startDate: new Date(exp.startDate).toISOString().split("T")[0],
      endDate: new Date(exp.endDate).toISOString().split("T")[0],
    }); 
    setShowExperienceModal(true);
  }}
  className="w-6 h-6 bg-dark-blue rounded-full flex items-center justify-center shadow"
>
  <img src={editIcon} alt="edit" className="w-3 h-3" />
</button>


                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className=" pb-6 bg-white rounded-2xl shadow-sm p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={certificateImg} alt="edit" className="w-6 h-6" />
              <h2 className="text-base font-semibold text-gray-900">Certifications</h2>
            </div>
            <button
  onClick={() => {
    setEditingCertificate(null);
    setCertificateForm({
      name: "",
      issuer: "",
      expiry: "",
      date: "",
    });
    setShowCertificateModal(true);
  }}
  className="me-4 rounded-lg flex items-center justify-center"
>
  <img src={plusIcon} alt="add" className="w-6 h-6" />
</button>

          </div>

          {certifications.map((cert, index) => (
            <div key={index} className=" rounded-lg p-4 ">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Issued by:</span> {cert.issuer}</p>
                  <p className="text-sm text-gray-500"><span className="font-semibold">Expiry Date:</span>{cert.expiry}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs ">{cert.date}</span>
                  
                  <button className="w-6 h-6  rounded-full flex items-center justify-center shadow border border-2 border-red-500">
                    <img src={deleteIcon} alt="delete" className="w-3 h-3" />
                  </button>
                <button
  onClick={() => {
    setEditingCertificate(index); 
    setCertificateForm({
      ...cert,
      expiry: cert.expiry ? new Date(cert.expiry).toISOString().split("T")[0] : "",
      date: cert.date ? new Date(cert.date).toISOString().split("T")[0] : "",
    });
    setShowCertificateModal(true);
  }}
  className="w-6 h-6 bg-dark-blue rounded-full flex items-center justify-center shadow"
>
  <img src={editIcon} alt="edit" className="w-3 h-3" />
</button>


                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className=" bg-white rounded-2xl shadow-sm p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={projectsImg} alt="edit" className="w-6 h-6" />
              <h2 className="text-base font-semibold text-gray-900">Projects</h2>
            </div>
<button
  onClick={() => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      technologies: "",
      description: "",
      project_url: "",
    });
    setShowProjectModal(true);
  }}
  className="me-4 rounded-lg flex items-center justify-center"
>
  <img src={plusIcon} alt="add" className="w-6 h-6" />
</button>


          </div>

          {projects.map((project, index) => (
            <div key={index} className=" rounded-lg p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-bold">Technologies:</span> {project.technologies}
                    </p>
                    {/* GitHub */}
                            <a
                            href="https://github.com/iamdahmad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                            >
                            <span className="text-sm">🔗</span>
                            github.com/iamdahmad
                            </a>
                    </div>
                    <div className="flex flex-col items-end gap-2">
               
                  
                  <button className="w-6 h-6  rounded-full flex items-center justify-center shadow border border-2 border-red-500">
                    <img src={deleteIcon} alt="delete" className="w-3 h-3" />
                  </button>
                  <button
  onClick={() => {
    setEditingProject(index);
    setProjectForm({
      ...project,
     
      startDate: project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "",
      endDate: project.endDate ? new Date(project.endDate).toISOString().split("T")[0] : "",
    });
    setShowProjectModal(true);
  }}
  className="w-6 h-6 bg-dark-blue rounded-full flex items-center justify-center shadow"
>
  <img src={editIcon} alt="edit" className="w-3 h-3" />
</button>

                </div>
                    
                </div>
             
            </div>
          ))}
        </div>
      </div>


{showEducationModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white w-full max-w-[90%] sm:max-w-[600px] lg:max-w-[700px] rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-base sm:text-lg font-bold dark-blue">
          {editingEducation !== null ? "Edit Education" : "Add Education"}
        </h2>
        <button
          onClick={() => {
            setShowEducationModal(false);
            setEditingEducation(null);
          }}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

        {/* University */}
        <div>
          <label className="text-xs sm:text-sm font-medium">University Name</label>
          <input
            type="text"
            value={educationForm.university}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                university: e.target.value,
              })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Field */}
        <div>
          <label className="text-xs sm:text-sm font-medium">Field of Study</label>
          <input
            type="text"
            value={educationForm.field}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                field: e.target.value,
              })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* GPA */}
        <div>
          <label className="text-xs sm:text-sm font-medium">GPA</label>
          <input
            type="text"
            value={educationForm.gpa}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                gpa: e.target.value,
              })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>


{/* Degree */}
<div>
  <label className="text-xs sm:text-sm font-medium">Degree</label>
  <input
    type="text"
    value={educationForm.degree}
    onChange={(e) =>
      setEducationForm({
        ...educationForm,
        degree: e.target.value,
      })
    }
    className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
  />
</div>

        {/* Start Date */}
        <div>
          <label className="text-xs sm:text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={educationForm.startDate}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                startDate: e.target.value,
              })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="text-xs sm:text-sm font-medium">End Date</label>
          <input
            type="date"
            value={educationForm.endDate}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                endDate: e.target.value,
              })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 rounded-b-2xl sticky bottom-0">



        <button
          onClick={() => {
            if (editingEducation !== null) {
              const updated = [...education];
              updated[editingEducation] = educationForm;
              setEducation(updated);
            } else {
              setEducation([...education, educationForm]);
            }

            setEducationForm({
              company: "",
              position: "",
              duration: "",
              description: "",
              startDate: "",
              endDate: "",
            });

            setEditingEducation(null);
            setShowEducationModal(false);
          }}
          className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm bg-dark-blue text-white rounded-lg"
        >
          {editingEducation !== null ? "Update" : "Save"}
        </button>

      </div>

    </div>
  </div>
)}


{showExperienceModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white w-full max-w-[90%] sm:max-w-[650px] lg:max-w-[750px] rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-base sm:text-lg font-bold dark-blue">
          {editingExperience !== null ? "Edit Experience" : "Add Experience"}
        </h2>
        <button
          onClick={() => {
            setShowExperienceModal(false);
            setEditingExperience(null);
            setExperienceForm({
              company: "",
              position: "",
              duration: "",
              description: "",
              startDate: "",
              endDate: "",
            });
          }}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

        {/* Company Name */}
        <div className="sm:col-span-2">
          <label className="text-xs sm:text-sm font-medium">Company Name</label>
          <input
            type="text"
            value={experienceForm.company}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, company: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Position */}
        <div>
          <label className="text-xs sm:text-sm font-medium">Position</label>
          <input
            type="text"
            value={experienceForm.position}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, position: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-xs sm:text-sm font-medium">Duration</label>
          <select
            value={experienceForm.duration}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, duration: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          >
            <option value="">Select Duration</option>
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="text-xs sm:text-sm font-medium">Description</label>
          <textarea
            rows="4"
            value={experienceForm.description}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, description: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="text-xs sm:text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={experienceForm.startDate}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, startDate: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="text-xs sm:text-sm font-medium">End Date</label>
          <input
            type="date"
            value={experienceForm.endDate}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, endDate: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 rounded-b-2xl sticky bottom-0">



        <button
          onClick={() => {
            if (editingExperience !== null) {
              const updated = [...experience];
              updated[editingExperience] = experienceForm;
              setExperience(updated);
            } else {
              setExperience([...experience, experienceForm]);
            }

            setExperienceForm({
              company: "",
              position: "",
              duration: "",
              description: "",
              startDate: "",
              endDate: "",
            });

            setEditingExperience(null);
            setShowExperienceModal(false);
          }}
          className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm bg-dark-blue text-white rounded-lg"
        >
          {editingExperience !== null ? "Update" : "Save"}
        </button>

      </div>

    </div>
  </div>
)}



{showProjectModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[750px] rounded-2xl shadow-xl relative">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-bold dark-blue">
          {editingProject !== null ? "Edit Project" : "Add Projects"}
        </h2>
        <button onClick={() => setShowProjectModal(false)}>
          <FaTimes className="text-gray-500" />
        </button>
      </div>

      {/* Form */}
      <div className="p-6 flex flex-col gap-4">

        {/* Title */}
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Internship Management Platform"
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
            value={projectForm.title}
            onChange={(e) =>
              setProjectForm({ ...projectForm, title: e.target.value })
            }
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="text-sm font-medium">Technologies</label>
          <input
            type="text"
            placeholder="FastAPI, Python , SQL Server, .Net"
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
            value={projectForm.technologies}
            onChange={(e) =>
              setProjectForm({ ...projectForm, technologies: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows="4"
            placeholder="A web-based platform that connects students with internship opportunities and tracks application status."
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
          />
        </div>

        {/* Project URL */}
        <div>
          <label className="text-sm font-medium">Project URL</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔗</span>
            <input
              type="text"
              placeholder="github.com/ahmed/project"
              className="w-full mt-1 pl-8 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
              value={projectForm.project_url}
              onChange={(e) =>
                setProjectForm({ ...projectForm, project_url: e.target.value })
              }
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 px-6 py-4 bg-gray-100 rounded-b-2xl">
       <button
  className="px-6 py-2 bg-dark-blue text-white rounded-lg"
  onClick={() => {
    if (editingProject !== null) {
      updateProject(editingProject, projectForm);
    } else {
      addProject(projectForm);
    }
    setShowProjectModal(false);
    setProjectForm({ title: "", technologies: "", description: "", project_url: "" });
    setEditingProject(null);
  }}
>
  {editingProject !== null ? "Update" : "Save"}
</button>

      </div>

    </div>
  </div>
)}


{showCertificateModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[720px] rounded-2xl shadow-xl relative">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-semibold dark-blue">
          {editingCertificate !== null ? "Edit Certification" : "Add Certification"}
        </h2>
        <button onClick={() => setShowCertificateModal(false)}>
          <FaTimes className="text-gray-500" />
        </button>
      </div>

      {/* Form */}
      <div className="p-6 grid grid-cols-2 gap-4">

        {/* Certificate Name */}
        <div>
          <label className="text-sm font-medium">Certificate Name</label>
          <input
            type="text"
            value={certificateForm.name}
            onChange={(e) =>
              setCertificateForm({ ...certificateForm, name: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Issuer */}
        <div>
          <label className="text-sm font-medium">Issuer</label>
          <input
            type="text"
            value={certificateForm.issuer}
            onChange={(e) =>
              setCertificateForm({ ...certificateForm, issuer: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="text-sm font-medium">Issue Date</label>
          <input
            type="date"
            value={certificateForm.date}
            onChange={(e) =>
              setCertificateForm({ ...certificateForm, date: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="text-sm font-medium">Expiry Date</label>
          <input
            type="date"
            value={certificateForm.expiry}
            onChange={(e) =>
              setCertificateForm({ ...certificateForm, expiry: e.target.value })
            }
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-dark-blue"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 px-6 py-4 bg-gray-100 rounded-b-2xl">
        <button
          onClick={() => {
            if (editingCertificate !== null) {
              
              const updatedCerts = [...certifications];
              updatedCerts[editingCertificate] = { ...certificateForm };
              setCertifications(updatedCerts);
            } else {
              
              setCertifications([...certifications, { ...certificateForm }]);
            }
            
            setShowCertificateModal(false);
            setEditingCertificate(null);
            setCertificateForm({ name: "", issuer: "", date: "", expiry: "" });
          }}
          className="px-6 py-2 bg-dark-blue text-white rounded-lg"
        >
          {editingCertificate !== null ? "Update" : "Save"}
        </button>
      </div>

    </div>
  </div>
)}



    </div>
  );
};

export default CandidateProfile;



















