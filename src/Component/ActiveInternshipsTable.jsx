import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import previewIcon from '../assets/sections/preview.png'; 
import DeleteIcon from '../assets/sections/delete.png'; 
import EditIcon from '../assets/sections/edit.png'; 
import rectangleIcon from '../assets/sections/Rectangle.png';

export default function ActiveInternshipsTable({ data, onPreview, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [loadingActions, setLoadingActions] = useState({ edit: null, delete: null, preview: null });

  const statusMap = { 1: "Open", 2: "Closed" };
  const statusColor = status => {
    switch (status) {
      case "Open": return "text-green-600";
      case "Closed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const handleEdit = async id => {
    setLoadingActions(prev => ({ ...prev, edit: id }));
    await new Promise(r => setTimeout(r, 200));
    onEdit(id);
    setLoadingActions(prev => ({ ...prev, edit: null }));
  };

  const handlePreview = async id => {
    setLoadingActions(prev => ({ ...prev, preview: id }));
    await new Promise(r => setTimeout(r, 200));
    onPreview(id);
    setLoadingActions(prev => ({ ...prev, preview: null }));
  };

const handleDelete = async (id) => {
  setLoadingActions(prev => ({ ...prev, delete: id }));
  if (onDelete)
    await onDelete(id, () =>
      setLoadingActions(prev => ({ ...prev, delete: null }))
    );
};


  const goToManagement = () => navigate('/management');

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="font-bold text-blue-900 text-xl">Active Internships</h2>
        <button className="dark-blue text-sm font-bold flex items-center gap-1" onClick={goToManagement}>
          See more
          <span className="text-black text-2xl">→</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Internship Title</th>
              <th className="px-6 py-3 text-left">Posted On</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Applicants</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-3 flex items-center gap-2">
                  <img src={rectangleIcon} alt="type" className="w-4 h-4 me-3" />
                  <span className="text-xs">{item.title}</span>
                </td>
                <td className="px-6 py-3 text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className={`px-6 py-3 font-medium text-xs ${statusColor(statusMap[item.status])}`}>
                  {statusMap[item.status]}
                </td>
                <td className="px-6 py-3 text-xs">{item.applicationsCount}</td>
                <td className="px-6 py-3 flex gap-3 items-center">
                  <div>
                    {loadingActions.edit === index
                      ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      : <img src={EditIcon} alt="Edit" className="w-4 h-4 cursor-pointer hover:scale-110 transition" onClick={() => handleEdit(item.id)} title="Edit" />}

                  </div>

                  <div>
                    {loadingActions.delete === index
                      ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      : <img src={DeleteIcon} alt="Delete" className="w-4 h-4 cursor-pointer hover:scale-110 transition" onClick={() => handleDelete(item.id)} title="Delete" />}
                  </div>

                  <div>
                    {loadingActions.preview === index
                      ? <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      : <img src={previewIcon} alt="Preview" className="w-4 h-4 cursor-pointer hover:scale-110 transition" onClick={() => handlePreview(item.id)} title="Preview" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
