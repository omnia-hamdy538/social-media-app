import React, { useState } from "react";
import arrowIcon from "../../assets/sections/ArrowUp.png";

export default function EditInfo() {

const [isSaving, setIsSaving] = useState(false);
  const [isCollegeSaved, setIsCollegeSaved] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [accountData, setAccountData] = useState({
    fullName: "Omnia Hamdy",
    headline: "Frontend Developer",
    location: "Cairo",
    phone: "01000000000",
    email: "omnia@email.com",
    cv: "https://drive.google.com/cv",
    github: "https://github.com/omnia",
    linkedin: "https://linkedin.com/in/omnia",
    portfolio: "https://omnia.dev",
    bio: "Passionate frontend developer specialized in React and Tailwind CSS."
  });

  const [collegeKey, setCollegeKey] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const locations = ["Cairo", "Alexandria", "Giza", "Mansoura"];

  const handleAccountChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Account Data:", accountData);
  };



  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log("Password Data:", passwordData);
  };
const handleVerifyCollege = () => {
  if (collegeKey.trim() !== "") {
    setIsVerified(true);
  }
};
const handleSaveCollege = () => {
  setIsSaving(true);

  setTimeout(() => {
    setIsSaving(false);
    setIsCollegeSaved(true);
  }, 1500);
};
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl shadow p-6  border  border-gray-200">
          <h2 className="text-lg font-semibold mb-6">Account Settings</h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={accountData.fullName}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Headline</label>
                <input
                  type="text"
                  name="headline"
                  placeholder="Enter your headline"
                  value={accountData.headline}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>

              <div>
                <div className="relative">
                  <label className="text-sm text-gray-600">Location</label>
                  <select
                    name="location"
                    value={accountData.location}
                    onChange={handleAccountChange}
                    className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 pr-10 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-dark-blue"
                    style={{
                      backgroundImage: `url(${arrowIcon})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 20px center",
                      backgroundSize: "16px"
                    }}
                  >
                    {locations.map((loc, index) => (
                      <option key={index} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={accountData.phone}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={accountData.email}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 ">CV</label>
                <input
                  type="text"
                  name="cv"
                  placeholder="Enter CV URL"
                  value={accountData.cv}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border  border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">GitHub</label>
                <input
                  type="text"
                  name="github"
                  placeholder="Enter GitHub URL"
                  value={accountData.github}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="Enter LinkedIn URL"
                  value={accountData.linkedin}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Portfolio</label>
                <input
                  type="text"
                  name="portfolio"
                  placeholder="Enter Portfolio URL"
                  value={accountData.portfolio}
                  onChange={handleAccountChange}
                  className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Bio</label>
              <textarea
                name="bio"
                rows="4"
                placeholder="Write something about you"
                value={accountData.bio}
                onChange={handleAccountChange}
                className="w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
              />
            </div>

            <button
              type="submit"
              className="bg-dark-blue text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
            >
              Save
            </button>
          </form>
        </div>

<div className="bg-white rounded-xl shadow p-6 border border-gray-200">
  <h2 className="text-lg font-semibold mb-6">College Affiliation</h2>

  <div className="flex flex-col md:flex-row gap-4">
    <input
      type="text"
      placeholder="Enter Your College Key"
      value={collegeKey}
      disabled={isVerified}
      onChange={(e) => setCollegeKey(e.target.value)}
      className="flex-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue disabled:bg-gray-200 disabled:cursor-not-allowed"
    />

    <button
      onClick={handleVerifyCollege}
      disabled={isVerified}
      className="bg-dark-blue text-white px-6 py-2 rounded-lg text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Verify
    </button>
  </div>

  {isVerified && (
    <div className="mt-6 space-y-6">

      <div className="flex items-center gap-2 ">
        <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
          ✓
        </div>
        <span>College key Verified Successfully!</span>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="text-sm text-gray-600">College</label>
    <input
      type="text"
      value="Computers and AI - Cairo University"
      disabled
      className="w-full mt-1 border border-gray-300 text-gray-600 shadow rounded-lg px-3 py-2 text-sm bg-gray-200"
    />
  </div>

  <div className="relative">
    <label className="text-sm text-gray-600">Academic Year</label>
    <select
      disabled={isCollegeSaved}
      className={`w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 pr-10 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-dark-blue ${
        isCollegeSaved ? "bg-gray-200 text-gray-600 cursor-not-allowed" : "bg-white"
      }`}
      style={{
        backgroundImage: `url(${arrowIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 20px center",
        backgroundSize: "16px"
      }}
    >
      <option>First Year</option>
      <option>Second Year</option>
      <option>Third Year</option>
      <option>Fourth Year</option>
    </select>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <div>
    <label className="text-sm text-gray-600">Department</label>
    <input
      type="text"
      placeholder="Department Name"
      disabled={isCollegeSaved}
      className={`w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue ${
        isCollegeSaved ? "bg-gray-200 text-gray-600 cursor-not-allowed" : ""
      }`}
    />
  </div>

  <div>
    <label className="text-sm text-gray-600">Student Code</label>
    <input
      type="text"
      placeholder="Student Code"
      disabled={isCollegeSaved}
      className={`w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue ${
        isCollegeSaved ? "bg-gray-200 text-gray-600 cursor-not-allowed" : ""
      }`}
    />
  </div>

  <div>
    <label className="text-sm text-gray-600">Grade</label>
    <input
      type="text"
      placeholder="Grade"
      disabled={isCollegeSaved}
      className={`w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue ${
        isCollegeSaved ? "bg-gray-200 text-gray-600 cursor-not-allowed" : ""
      }`}
    />
  </div>

  <div>
    <label className="text-sm text-gray-600">GPA</label>
    <input
      type="text"
      placeholder="GPA"
      disabled={isCollegeSaved}
      className={`w-full mt-1 border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue ${
        isCollegeSaved ? "bg-gray-200 text-gray-600 cursor-not-allowed" : ""
      }`}
    />
  </div>
</div>
  

{!isCollegeSaved && (
  <button
    onClick={handleSaveCollege}
    disabled={isSaving}
    className="bg-dark-blue text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition flex items-center gap-2 disabled:opacity-70"
  >
    {isSaving && (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    )}
    {isSaving ? "Saving..." : "Save"}
  </button>
)}

    </div>
  )}
</div>

        <div className="bg-white rounded-xl shadow p-6 border  border-gray-200">
          <h2 className="text-lg font-semibold mb-6">Privacy & Security</h2>

          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-sm">
            <h3 className="text-sm font-medium">Change Password</h3>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-blue"
            />

            <button
              type="submit"
              className="bg-dark-blue text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
            >
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}