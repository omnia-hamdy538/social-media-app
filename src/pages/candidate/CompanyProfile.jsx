import { useParams } from "react-router-dom";

export default function CompanyProfile() {
  const { company } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-6">



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ===== Left Card ===== */}
          <div className="border shadow-xl border-gray-200 rounded-xl p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <img
                src="/src/assets/sections/vodafone.png"
                alt="Google"
                className="w-16 h-16 mb-2"
              />
              <h3 className="text-xl font-semibold">Google</h3>
            </div>

            <ul className="border rounded-xl p-5 border-gray-200 text-sm text-gray-600 space-y-2 list-disc">
              <li>Email: careers@google.com</li>
              <li>
                Website:{" "}
                <a className="text-gray-600 underline" href="#">
                  https://www.google.com
                </a>
              </li>
              <li>LinkedIn: linkedin.com/company/google</li>
              <li>
                Address: 1600 Amphitheatre Parkway, Mountain View, CA
              </li>
              <li>
                Company Size: 100,000+ employees worldwide
              </li>
            </ul>

            <div className="mt-4 text-sm text-gray-600">
              <h4 className="font-semibold mb-1">About</h4>
              <p className="border rounded-xl p-5 border-gray-200">
                Google is a global technology leader focused on organizing the
                world’s information and making it universally accessible and
                useful.
              </p>
            </div>
          </div>

          {/* ===== Right Section ===== */}
          <div className="lg:col-span-2 space-y-6 border rounded-xl p-5 border-gray-200 shadow-xl">

            {/* Why Google */}
            <div className="pt-20">
              <h3 className="font-semibold dark-blue mb-2">
                Why Google
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Work on products used by billions of users</li>
                <li>• Learn from world-class engineers and mentors</li>
                <li>• Access to advanced tools, cloud systems, and AI technologies</li>
                <li>• Collaborative and inclusive work environment</li>
              </ul>
            </div>

            {/* Internships */}
            <div>
              <h3 className="font-semibold dark-blue mb-3">
                Internships
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Internship Card */}
                <InternshipCard
                  title="Software Engineering Intern"
                  field="Computer Science / Software Engineering"
                />

                <InternshipCard
                  title="Data & AI Intern"
                  field="Computer Science / Software Engineering"
                />

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Internship Card ===== */
function InternshipCard({ title, field }) {
  return (
    <div className="border border-gray-200 pb-10 rounded-xl p-4 bg-white  transition duration-200">
      
      {/* Top */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="/src/assets/sections/vodafone.png"
          className="w-10 h-10 rounded-md"
          alt="logo"
        />
        <h4 className="font-semibold text-sm text-gray-800 leading-snug">
          {title}
        </h4>
      </div>

      {/* Field */}
      <p className="text-xs text-gray-500 mb-2">
        {field}
      </p>

      {/* Details */}
      <p className="text-xs text-gray-500 mb-3">
        3 months · Cairo, Egypt · Hybrid · Paid
      </p>

      {/* Deadline */}
      <div className="flex items-center gap-1 text-xs font-medium">
         <span>5 days left (Deadline: 3 Dec 2025)</span>
        <img
                    src="/src/assets/sections/time.png"
                    alt="time"
                    className="w-4 h-4"
                  />
       
      </div>

    </div>
  );
}

