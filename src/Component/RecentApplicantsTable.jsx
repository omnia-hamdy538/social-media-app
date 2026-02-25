import previewIcon from '../assets/sections/preview.png';
import person from  "../assets/sections/person.png";
import { useState } from 'react';

export default function RecentApplicantsTable({ data, onPreview }) {
  const [loadingPreview, setLoadingPreview] = useState(null);

 const statusMap = {
  1: "New",
  2: "Accepted",
  3: "Interview Pending",
  4: "Finished",
  5: "Rejected",
};


const statusColor = (statusText) => {
  switch (statusText) {
    case "New":
      return "text-blue-500";
    case "Accepted":
      return "text-green-500";
    case "Interview Pending":
      return "text-purple-500";
    case "Finished":
      return "text-gray-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};


const handlePreview = async (id) => {
  setLoadingPreview(id);
  await new Promise(resolve => setTimeout(resolve, 400));
  onPreview(id); 
  setLoadingPreview(null);
};


  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b">
        <h2 className="font-bold text-blue-900 text-xl">Recent Applicants</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Candidate</th>
              <th className="px-6 py-3 text-left">Internship</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No applicants yet</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-3 flex items-center gap-2 text-xs">
                    <img src={item.avatar || person} alt={item.fullName || 'Applicant'} className="w-8 h-8 rounded-full" />

                    {item.fullName || 'Unknown'}
                  </td>
                  <td className="px-6 py-3 text-xs">{item.internshipTitle || '-'}</td>
                  <td className="px-6 py-3 text-xs">{item.appliedAt ? new Date(item.appliedAt).toLocaleDateString() : '-'}</td>
                  <td className={`px-6 py-3 font-medium text-xs ${statusColor(statusMap[item.status])}`}>
                    {statusMap[item.status] || '-'}
                  </td>
                  <td className="px-6 py-3">
                    {loadingPreview === index ? (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <img
                        src={previewIcon}
                        alt="Preview"
                        className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                        onClick={() => handlePreview(item.id)}
                        title="Preview"
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
