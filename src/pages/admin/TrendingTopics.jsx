import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import timeIcon from "../../assets/sections/time.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const TrendingTopics = () => {
  // const { id } = useParams();
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [internships, setInternships] = useState([]);
  const [sort, setSort] = useState("Newest Post");
  const [open, setOpen] = useState(false);

const fetchTopic = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/Admin/Trending-Topic/${id}?sortOrder=1&page=1&pageSize=10`
    );

    const data = res.data.data;

    setTopic({
      title: data.label,
      subtitle: data.description,
      count: data.internshipsCount,
    });


    if (res.config.url.includes("sortOrder=1")) {
      setSort("Newest Post");
    } else if (res.config.url.includes("sortOrder=2")) {
      setSort("Oldest Post");
    }

    setInternships(
      data.currentInternships.data.map((item) => ({
        id: item.internshipId,
        company: item.companyName,
        role: item.title,
        tags: item.requiredField,
        duration: item.duration,
        location: item.location,
        mode: item.type,
        deadline: `Deadline: ${new Date(item.applicationDeadline).toLocaleDateString()}`,
        companyLogoUrl: item.companyLogoUrl,
      }))
    );
  } catch (err) {
    console.log("❌ Fetch error:", err);
  }
};

const handleSortChange = (sortValue) => {
  setSort(sortValue);
  setOpen(false);


  const order = sortValue === "Newest Post" ? 1 : 2;

  axios.get(`${BASE_URL}/api/Admin/Trending-Topic/${id}?sortOrder=${order}&page=1&pageSize=10`)
    .then(res => {
      const data = res.data.data;
      setInternships(
        data.currentInternships.data.map((item) => ({
          id: item.internshipId,
          company: item.companyName,
          role: item.title,
          tags: item.requiredField,
          duration: item.duration,
          location: item.location,
          mode: item.type,
          deadline: `Deadline: ${new Date(item.applicationDeadline).toLocaleDateString()}`,
          companyLogoUrl: item.companyLogoUrl,
        }))
      );
    })
    .catch(err => console.log(err));
};
  useEffect(() => {
    if (id) fetchTopic();
  }, [id]);

  if (!topic) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 min-h-screen bg-white">
      <div className="mb-3 lg:ms-5">
        <h1 className="text-2xl font-bold dark-blue">{topic.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{topic.subtitle}</p>
      </div>

      <div className="flex justify-between items-center mb-3 lg:ms-5">
        <div className="text-sm font-semibold ">
          {topic.count} <span className="text-gray-400">Internship Found</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm text-gray-600 rounded-md px-3 py-1"
          >
            <span className="text-gray-400 font-semibold">Sort by:</span>
            <span className="font-semibold text-gray-700">{sort}</span>
            <span className="ml-2">▼</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
             <div
  onClick={() => handleSortChange("Newest Post")}
  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
>
  Newest Post
</div>
<div
  onClick={() => handleSortChange("Oldest Post")}
  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
>
  Oldest Post
</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {internships.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-md p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.companyLogoUrl}
                alt={item.company}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-2xl text-gray-800">
                  {item.company}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-xl font-bold dark-blue">{item.role}</h2>
              <p className="text-xs text-gray-600">{item.tags}</p>
            </div>

            <div className="mt-1 text-xs text-gray-600">
              <span>{item.duration}</span> • {item.location} • {item.mode}
            </div>

            <div className="mt-1 text-xs flex items-center gap-2">
              <span>{item.deadline}</span>
              <img src={timeIcon} alt="time" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;



