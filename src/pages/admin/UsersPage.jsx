import { useState, useEffect } from "react";
import axios from "axios";
import defaultPerson from "../../assets/sections/defaultperson.jpg";
import searchIcon from "../../assets/icons/search-blue.png";
import arrowUp from "../../assets/sections/arrowup.png";
import editIcon from "../../assets/sections/edit.png";
import companyAvatar from "../../assets/sections/google.png";
import collegeAvatar from "../../assets/sections/collegelogo.png";
import defaultLogo from "../../assets/sections/defaultlogo.jpg";

const ITEMS_PER_PAGE = 11;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function UsersPage() {
  const [verificationFilter, setVerificationFilter] = useState("");
  const [accountStatusFilter, setAccountStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tab, setTab] = useState("candidate");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchCandidates();
    fetchCompanies();
    fetchColleges();
    fetchLocations();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/candidates?status=${accountStatusFilter || ""}&page=${currentPage}&pageSize=${ITEMS_PER_PAGE}`
      );

      const data = res.data.data.data || [];

      console.log("Candidates Loaded ✅", data);

      const mapped = data.map((c) => ({
        id: c.candidateId,
        name: c.fullName,
        userId: c.userId,
        email: c.email,
        phone: c.phoneNumber,
        profilePhotoUrl: c.profilePhotoUrl,
        major: c.major,
        
        joined: new Date(c.createdAt).toLocaleDateString("en-GB"),
        accountStatus: c.status === "active" ? "Active" : "Suspended",
      }));

      setCandidates(mapped);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/companies?page=${currentPage}&pageSize=${ITEMS_PER_PAGE}&searchEmail=${search}&verified=${verificationFilter}&status=${accountStatusFilter}`
      );

      const data = res.data.data.data || [];

      console.log("Companies Loaded ✅", data);

      const mapped = data.map((c) => ({
        id: c.companyId,
        userId: c.userId,
        name: c.companyName,
        email: c.email,
        
        phone: c.phoneNumber,
        location: c.location,
        logoUrl:c.logoUrl,
        contactEmail: c.contactEmail,
        verificationStatus: c.verified ? "Verified" : "Not Verified",
        joined:new Date(c.createdAt).toLocaleDateString("en-GB"),
        accountStatus: c.status === "active" ? "Active" : "Suspended",
      }));

      setCompanies(mapped);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchColleges = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/Colleges?page=${currentPage}&pageSize=${ITEMS_PER_PAGE}&searchEmail=${search}&status=${accountStatusFilter}&location=${locationFilter}`
      );

      const data = res.data.data.data || [];

      console.log("Colleges Loaded ✅", data);

      const mapped = data.map((c) => ({
        id: c.collageId,
        userId: c.userId,
        name: c.collageName,
        email: c.email,
        phone: c.phoneNumber,
        location: c.location,
        logoUrl:c.logoUrl,
        contactEmail: c.contactEmail,
        joined: new Date(c.createdAt).toLocaleDateString("en-GB"),
        accountStatus: c.status === "active" ? "Active" : "Suspended",
      }));

      setColleges(mapped);
    } catch (err) {
      console.log(err);
    }
  };

const fetchLocations = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/Admin/locations`);
    const data = res.data.data || [];

    console.log("Locations Loaded ✅", data);

    setLocations(data);
  } catch (err) {
    console.log(err);
  }
};


const handleStatusUpdate = async () => {
  if (!selectedUser?.id) {
    console.log("❌ No user selected or missing ID");
    return;
  }

  try {
    const res = await axios.patch(`${BASE_URL}/api/Admin/users/status`, {
      userId: selectedUser.userId,
      status: selectedUser.accountStatus === "Active" ? "active" : "suspended",
    });

    console.log("✅ User Status Updated Successfully:", res.data);

    setShowEditPopup(false);

    fetchCandidates();
    fetchCompanies();
    fetchColleges();
  } catch (err) {
    console.log("❌ Failed to update status:", err.response?.data || err.message);
  }
};


  const getData = () => {
    if (tab === "candidate") return candidates;
    if (tab === "company") return companies;
    return colleges;
  };

  const handleTabChange = (value) => {
    setTab(value);
    setCurrentPage(1);
    setSearch("");
    setYearFilter("");
    setStatusFilter("");
  };

  const filteredData = getData().filter((item) => {
    const matchEmail = item.email?.toLowerCase().includes(search.toLowerCase());

    let matchYear = true;
    let matchVerification = true;
    let matchAccountStatus = true;
    let matchLocation = true;

    if (tab === "candidate") {
      matchYear = yearFilter ? item.year === yearFilter : true;
      matchAccountStatus = accountStatusFilter
        ? item.status.toLowerCase() === accountStatusFilter.toLowerCase()
        : true;
    } else if (tab === "company") {
      matchVerification = verificationFilter
        ? item.verificationStatus.toLowerCase() === verificationFilter.toLowerCase()
        : true;
      matchAccountStatus = accountStatusFilter
        ? item.accountStatus.toLowerCase() === accountStatusFilter.toLowerCase()
        : true;
    } else if (tab === "college") {
      matchLocation = locationFilter
        ? item.location.toLowerCase() === locationFilter.toLowerCase()
        : true;
      matchAccountStatus = accountStatusFilter
        ? item.accountStatus.toLowerCase() === accountStatusFilter.toLowerCase()
        : true;
    }

    return matchEmail && matchYear && matchVerification && matchAccountStatus && matchLocation;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative">
      <div className={`p-6 w-full overflow-x-auto ${showEditPopup ? "opacity-40 pointer-events-none" : ""}`}>

        <div className="flex flex-wrap gap-6 border-b mb-4 text-sm">
        {["candidate", "company", "college"].map((item) => (
          <button
            key={item}
            onClick={() => handleTabChange(item)}
            className={`pb-3 capitalize ${
              tab === item
                ? "border-b-2 border-dark-blue dark-blue font-bold"
                : "text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="relative w-full sm:w-[420px]">
            <img
              src={searchIcon}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search by email (example@gmail.com)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-blue-300 rounded-lg outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {tab === "candidate" && (
              <>


                <div className="relative">
                  <select
                    value={accountStatusFilter}
                    onChange={(e) => setAccountStatusFilter(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none"
                  >
                    <option value="">Account Status</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <img
                    src={arrowUp}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                  />
                </div>
              </>
            )}

            {tab === "company" && (
              <>
                <div className="relative">
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none"
                  >
                    <option value=""> Status</option>
                    <option value="Verified">Verified</option>
                    <option value="Not Verified">Not Verified</option>
                  </select>
                  <img
                    src={arrowUp}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                  />
                </div>

                <div className="relative">
                  <select
                    value={accountStatusFilter}
                    onChange={(e) => setAccountStatusFilter(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none"
                  >
                    <option value="">Account Status</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <img
                    src={arrowUp}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                  />
                </div>
              </>
            )}

            {tab === "college" && (
              <>
                <div className="relative">
<select
  value={locationFilter}
  onChange={(e) => setLocationFilter(e.target.value)}
  className="appearance-none px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none"
>
  <option value="">Location</option>
  {locations.map((loc, idx) => (
    <option key={idx} value={loc}>
      {loc}
    </option>
  ))}
</select>


                  <img
                    src={arrowUp}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                  />
                </div>

                <div className="relative">
                  <select
                    value={accountStatusFilter}
                    onChange={(e) => setAccountStatusFilter(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none"
                  >
                    <option value="">Account Status</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <img
                    src={arrowUp}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          {/* ================= Candidate Table ================= */}
          {tab === "candidate" && (
            <table className="w-full min-w-[800px] text-sm">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th className="text-left py-3">Candidate Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Major</th>
                
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-4 flex items-center gap-3">
                   <img
  src={c.profilePhotoUrl || defaultPerson}
  onError={(e) => (e.target.src = defaultPerson )}
  className="w-8 h-8 rounded-full"
/>

                      {c.name}
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.major}</td>
                    
                    <td>{c.joined}</td>
                    <td>
                      <span
                        className={`px-6 py-1 rounded text-xs ${
                          c.accountStatus === "Active"
                            ? "bg-green-100 text-green-600  px-9"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {c.accountStatus}
                      </span>
                    </td>
                    <td className="text-center">
<img
  src={editIcon}
  className="w-5 h-5 mx-auto cursor-pointer"
  onClick={() => {
  setSelectedUser({ ...c, type: "candidate" });
  setShowEditPopup(true);
}}

/>



                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ================= Company Table ================= */}
          {tab === "company" && (
            <table className="w-full min-w-[900px] text-sm">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th className="text-left py-3">Company</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Location</th>
                  <th>Contact Email</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-4 flex items-center gap-3">
                                           <img
  src={c.logoUrl || defaultLogo}
  onError={(e) => (e.target.src =  defaultLogo)}
  className="w-8 h-8 rounded-full"
/>
                      
                      {c.name}
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.location}</td>
                    <td>{c.contactEmail}</td>
                    <td>
                      <span
                        className={`px-4 py-1 rounded text-xs ${
                          c.verificationStatus === "Verified"
                            ? "bg-green-100 text-green-600 px-7"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {c.verificationStatus}
                      </span>
                    </td>
                    <td>{c.joined}</td>
                    <td>
                      <span
                        className={`px-4 py-1 rounded text-xs ${
                          c.accountStatus === "Active"
                            ? "bg-green-100 text-green-600 px-7"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {c.accountStatus}
                      </span>
                    </td>
                    <td className="text-center">
                      <img
  src={editIcon}
  className="w-5 h-5 mx-auto cursor-pointer"
  onClick={() => {
    setSelectedUser({ ...c, type: "company" });
    setShowEditPopup(true);
  }}
/>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ================= College Table ================= */}
          {tab === "college" && (
            <table className="w-full min-w-[850px] text-sm">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th className="text-left py-3">College Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Location</th>
                  <th>Contact Email</th>
                  <th>Joined Date</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-4 flex items-center gap-3">
                   <img
  src={c.logoUrl || defaultLogo}
  onError={(e) => (e.target.src =  defaultLogo)}
  className="w-8 h-8 rounded-full"
/>
                      {c.name}
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.location}</td>
                    <td>{c.contactEmail}</td>
                    <td>{c.joined}</td>
                    <td>
                      <span
                        className={`px-4 py-1 rounded text-xs ${
                          c.accountStatus === "Active"
                            ? "bg-green-100 text-green-600 px-7"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {c.accountStatus}
                      </span>
                    </td>
                    <td className="text-center">
                      <img
  src={editIcon}
  className="w-5 h-5 mx-auto cursor-pointer"
  onClick={() => {
    setSelectedUser({
      ...c,
      type: "college",
      name: "FCAI"
    });
    setShowEditPopup(true);
  }}
/>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ================= Pagination ================= */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg ${
                currentPage === i + 1 ? "bg-dark-blue text-white" : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

      

      {showEditPopup && (
        <>
          <div className="fixed inset-0 bg-opacity-40 z-40" onClick={() => setShowEditPopup(false)} />

          <div className="fixed right-8 top-20 w-[360px] bg-white rounded-xl shadow-xl z-50">
            <p className="text-sm font-bold dark-blue rounded xl bg-gray-200 p-2">
              {selectedUser?.type === "company"
                ? "Company Details"
                : selectedUser?.type === "college"
                ? "College Details"
                : "User Details"}
            </p>

            <div className="flex items-center gap-3 px-4 py-4">
             <img
  src={
    selectedUser?.type === "candidate"
      ? selectedUser?.profilePhotoUrl || defaultPerson
      : selectedUser?.logoUrl || defaultLogo
  }
  onError={(e) => {
    e.target.src =
      selectedUser?.type === "candidate" ? defaultPerson : defaultLogo;
  }}
  className="w-10 h-10 rounded-full"
/>


              <div>
                <p className="text-sm font-bold">{selectedUser?.name}</p>
                <p className="text-xs text-gray-400">
                  Joined on {selectedUser?.joined}
                </p>
              </div>
            </div>

            <div className="px-4 space-y-4">
              {/* <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Old Password
                </label>
                <input type="password" className="w-full border rounded-lg px-3 py-2 text-sm outline-none" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  New Password
                </label>
                <input type="password" className="w-full border rounded-lg px-3 py-2 text-sm outline-none" />
              </div> */}

              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Account Status
                </label>
                <select
                  value={selectedUser?.accountStatus}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, accountStatus: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                >
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-4 py-4">
              <button
                onClick={() => setShowEditPopup(false)}
                className="px-4 py-1 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-1 bg-dark-blue text-white rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}










