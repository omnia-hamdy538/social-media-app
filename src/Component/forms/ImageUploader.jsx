import React from "react";

export default function ImageUploader({ label, image, setImage }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="mb-6">
      <label className="font-semibold text-sm block mb-2">{label}</label>

      <label
        className="
          w-full h-14 bg-blue-100 border border-blue-300
          rounded-md flex items-center justify-center
          cursor-pointer overflow-hidden
        "
      >
        {!image ? (
          <span className="text-blue-600 font-medium flex items-center gap-2">
            📤 Upload
          </span>
        ) : (
          <span className="text-green-600 font-semibold flex items-center gap-2">
            ✔️ Uploaded
          </span>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </label>
    </div>
  );
}
