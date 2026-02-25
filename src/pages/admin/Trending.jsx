import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Trending = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loadingId, setLoadingId] = useState(null); 
  const [isFetching, setIsFetching] = useState(false);

  const fetchTrendingTopics = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(
        `${BASE_URL}/api/Admin/Trending-Topics?page=1&pageSize=10`
      );


      const data = res.data.data.data; 


      const mapped = data.map((item) => ({
        id: item.topicId,
        title: item.label,
        description: item.description,
        tags: item.keywords.split(",").map((k) => k.trim()),
        available: `${item.internshipsCount} Internships Available`,
      }));

      setTrendingTopics(mapped);
    } catch (err) {
      console.log("❌ Fetch Trending Topics error:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const handleView = (id) => {
    setLoadingId(id);

    setTimeout(() => {
      setLoadingId(null);
      window.location.href = `/trending-topics/${id}`;
    }, 1000);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8 lg:ms-5">
        <h1 className="text-2xl font-bold dark-blue">Trending Topics</h1>
        <p className="text-sm text-gray-600 mt-2">
          Explore the most in-demand internship fields and discover opportunities tailored to your interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trendingTopics.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold dark-blue">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-[#d9edf7]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0f4b8a]"></span>
                <p className="text-sm font-semibold dark-blue">
                  {item.available}
                </p>
              </div>

              <button
                onClick={() => handleView(item.id)}
                className="bg-dark-blue text-white text-sm px-6 py-2 rounded-full flex items-center justify-center"
                disabled={loadingId === item.id}
              >
                {loadingId === item.id ? (
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "View"
                )}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;