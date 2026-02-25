import React from "react";
import { Link, NavLink } from "react-router-dom";



export default function Navbar({ variant = "landing" }) {
  return (
    <nav
      className={`w-full flex items-center justify-between px-8 py-4 bg-white 
      ${variant === "auth" ? "shadow-md" : ""}`}
    >
      {/* ===== Left Section ===== */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <img
          src="/src/assets/logos/logo.png"
          alt="Forsaty Logo"
          className="h-10"
        />

        {/* ===== User Links ===== */}
        {variant === "user" && (
          <div className="ms-26 hidden md:flex items-center gap-6 text-sm">
            <NavLink
              to="/home"
              end
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/dashboard/:tab?"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Dashboard
            </NavLink>

<NavLink
  to="/dashboard/Saved"
  className={({ isActive }) =>
    isActive
      ? "dark-blue font-medium"
      : "text-gray-600 hover:text-dark-blue"
  }
>
  Saved
</NavLink>


            <NavLink
              to="/assessments"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Applicants
            </NavLink>
          
      

            <NavLink
              to="/candidate-trends"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Trends
            </NavLink>
          </div>
        )}

        {/* ===== Admin Links ===== */}
        {variant === "admin" && (
          <div className="ms-2 hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin-users"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/admin-assessment"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Assessments
            </NavLink>
            <NavLink
              to="/admin-trending"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue font-medium"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Trending
            </NavLink>
          </div>
        )}

        {/* ===== Recruiter Links ===== */}
        {variant === "recruiter" && (
          <div className="ms-2 hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink
              to="/recruiter-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/post-internship"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Post an Internship
            </NavLink>

            <NavLink
              to="/management"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Management List
            </NavLink>
          </div>
        )}

        {/* ===== Faculty Links ===== */}
        {variant === "faculty" && (
          <div className="ms-2 hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink
              to="/faculty-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/companies"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Companies
            </NavLink>

            <NavLink
              to="/faculty-settings"
              className={({ isActive }) =>
                isActive
                  ? "dark-blue"
                  : "text-gray-600 hover:text-dark-blue"
              }
            >
              Manage Account
            </NavLink>
          </div>
        )}
      </div>


{/* ===== Search Bar ===== */}

{(variant === "user" || variant === "landing") && (
  <div className="relative w-[320px] hidden md:block">
    <img
      src="/src/assets/icons/search-blue.png"
      alt="search"
      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
    />
    <input
      type="text"
      placeholder="Search Job"
      className="w-full pl-10 pr-4 py-2 border rounded border-all text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
    />
  </div>
)}


      {/* ===== Right Section ===== */}
      <div className="flex items-center gap-4">
        {/* Landing */}
        {variant === "landing" && (
          <>
            <Link
              to="/login"
              className="px-5 py-2 border rounded-md text-sm hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-dark-blue text-white rounded-md text-sm"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Auth pages */}
        {variant === "auth" && (
          <Link
            to="/"
            className="px-6 py-2 bg-dark-blue text-white rounded-md text-sm"
          >
            About
          </Link>
        )}

        {/* User / Admin / Recruiter / Faculty logged in */}
        {(variant === "user" ||
          variant === "admin" ||
          variant === "recruiter" ||
          variant === "faculty") && (
          <>
            <img
              src="/src/assets/icons/setting.png"
              alt="settings"
              className="w-5 h-5 cursor-pointer"
            />
            <img
              src="/src/assets/icons/notification.png"
              alt="notifications"
              className="w-5 h-5 cursor-pointer"
            />
            <img
              src="/src/assets/sections/profile.png"
              alt="profile"
              className="w-9 h-9 rounded-full cursor-pointer"
            />
          </>
        )}
      </div>
    </nav>
  );
}
