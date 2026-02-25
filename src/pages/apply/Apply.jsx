import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { applySchema } from "../../schema/applySchema";
import { ZodError } from "zod";

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cv: null,
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
    motivation: "",
  });

  const [errors, setErrors] = useState({});
  const [cvName, setCvName] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();

  try {
    applySchema.parse(formData); 
    setErrors({});
    console.log("Form Submitted", formData);
    alert("Application submitted successfully ✅");
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        
        if (error.path && error.path.length > 0) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      console.error(err);
      alert("Unexpected error occurred. Check console.");
    }
  }
};




  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center dark-blue mb-8">
          Internship Application Form
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormRow label="Name">
            <input
              type="text"
              placeholder="Full Name"
              className="input w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <Error>{errors.name}</Error>}
          </FormRow>

          <FormRow label="Phone">
            <input
              type="text"
              placeholder="only one"
              className="input w-full"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <Error>{errors.phone}</Error>}
          </FormRow>

          <FormRow label="CV">
            <label className="input cursor-pointer flex justify-between items-center border border-gray-300 rounded-md p-2">
              <span className={cvName ? "text-green-600" : "text-gray-400"}>
                {cvName || "Drag & drop files to upload"}
              </span>
              {!cvName && (
                <img
                  src="/src/assets/general/upload-cloud.png"
                  alt="Upload"
                  className="w-6 h-6 mr-2"
                />
              )}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData({ ...formData, cv: file });
                  setCvName(file?.name || "");
                }}
              />
            </label>
            {errors.cv && <Error>{errors.cv}</Error>}
          </FormRow>

          <FormRow label="LinkedIn">
            <input
              type="text"
              placeholder="http://www.example.com"
              className="input w-full"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
            {errors.linkedin && <Error>{errors.linkedin}</Error>}
          </FormRow>

          <FormRow label="GitHub">
            <input
              type="text"
              placeholder="http://www.example.com"
              className="input w-full"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            />
            {errors.github && <Error>{errors.github}</Error>}
          </FormRow>

          <FormRow label="Portfolio">
            <input
              type="text"
              placeholder="http://www.example.com"
              className="input w-full"
              value={formData.portfolio}
              onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
            />
            {errors.portfolio && <Error>{errors.portfolio}</Error>}
          </FormRow>

          <FormRow label="Location">
            <select
              className="input w-full"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              <option value="">Select location</option>
              <option>Cairo</option>
              <option>Giza</option>
              <option>Alexandria</option>
            </select>
            {errors.location && <Error>{errors.location}</Error>}
          </FormRow>

          <FormRow label="Motivation">
            <textarea
              maxLength={100}
              placeholder="Type your motivation here..."
              className="input w-full h-28 resize-none"
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            />
            <p className="text-xs dark-blue mt-1 ms-[93%]">
              {formData.motivation.length}/100
            </p>
            {errors.motivation && <Error>{errors.motivation}</Error>}
          </FormRow>

          <div className="flex justify-center gap-4 pt-6 flex-wrap">
           <button
  type="button"
  onClick={() => navigate(`/home/internship/${id}`)}
  className="px-6 py-2 rounded-md bg-soft-blue dark-blue font-medium"
>
  CANCEL
</button>



            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-dark-blue text-white font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 items-start">
      <label className="text-sm font-medium dark-blue">{label}</label>
      <div>{children}</div>
    </div>
  );
}

function Error({ children }) {
  return <p className="text-xs text-red-500 mt-1">{children}</p>;
}
