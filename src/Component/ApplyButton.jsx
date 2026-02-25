import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyButton = ({ isClosed, company }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    if (isClosed || loading) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(`/company/${encodeURIComponent(company)}`);
    }, 2000);
  };

  return (
    <button
      onClick={handleApply}
      disabled={isClosed || loading}
      className={`px-12 py-2 rounded-xl text-white flex items-center justify-center gap-2 ${
        isClosed || loading ? "bg-gray-400 cursor-not-allowed" : "bg-dark-blue"
      }`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        "Apply Now"
      )}
    </button>
  );
};

export default ApplyButton; 