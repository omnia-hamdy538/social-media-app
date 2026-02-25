import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadCV() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFile = (uploadedFile) => {
    setFile(uploadedFile);


    let counter = 0;
    const interval = setInterval(() => {
      counter += 10;
      setProgress(counter);
      if (counter >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate("/candidate-onboarding"), 500);
      }
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) handleFile(uploadedFile);
  };

  const handleBrowse = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) handleFile(uploadedFile);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-10 py-10 bg-white">

      {/* LEFT BOX */}
      <div
        className="w-72 h-80 border border-gray-300 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <img src="/src/assets/general/upload-cloud.png" alt="" className="w-12 mb-4" />

        <p className="text-gray-600">Drag and drop files to upload</p>
        <p className="my-2 text-gray-500">OR</p>

        <label className="bg-orange-300 text-black py-2 px-6 rounded-md cursor-pointer">
          Browse
          <input type="file" className="hidden" onChange={handleBrowse} />
        </label>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6">Upload Your CV</h1>

        <img
          src="/src/assets/auth/cv-illustration.gif"
          className="w-72 mb-6"
        />

        {/* FILE PREVIEW */}
        {file && (
          <div className="w-80 border rounded-lg p-3 shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{file.name}</span>
              <span className="text-green-600">{progress}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden">
              <div
                className="bg-orange-400 h-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
