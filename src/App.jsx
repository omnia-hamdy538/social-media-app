import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ===== Layouts ===== */
import AuthLayout from "./Layouts/AuthLayout";
import UserLayout from "./Layouts/UserLayout";
import RecruiterLayout from "./Layouts/RecruiterLayout";
import FacultyLayout from "./Layouts/FacultyLayout";

/* ===== Auth Pages ===== */
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
// import VerifyEmail from "./pages/auth/VerifyEmail";

/* ===== General Pages ===== */
import Success from "./pages/Success";
import UploadCV from "./pages/UploadCV";

/* ===== Onboarding ===== */
import CandidateOnboarding from "./pages/onboarding/CandidateOnboarding";
import RecruiterOnboarding from "./pages/onboarding/RecruiterOnboarding";
import CollegeOnboarding from "./pages/onboarding/CollegeOnboarding";

/* ===== Candidate Pages ===== */
import Feed from "./pages/feed/Feed";
import Home from "./pages/candidate/home";
import InternshipDetailsInCandidate from "./pages/candidate/InternshipDetailsInCandidate";
import Apply from "./pages/apply/Apply";
import CompanyDetailsInCandidate from "./pages/candidate/CompanyDetailsInCandidate";
import CandidateDashboard from "./pages/candidate/CandidateDashboard"; // <-- Added
import CandidateTrending from "./pages/candidate/CandidateTrending";

/* ===== Recruiter Pages ===== */
import Dashboard from "./pages/recruiter/Dashboard";
import InternshipPreview from "./pages/recruiter/InternshipPreview";
import EditInternship from "./pages/recruiter/EditInternship";
import CreateInternship from "./pages/recruiter/CreateInternship";
import ManageListing from "./pages/recruiter/ManageListing";
import UserApplication from "./pages/recruiter/UserApplication";
import WriteInternshipCompletionReport from "./pages/recruiter/WriteInternshipCompletionReport";
import EditInternshipCompletionReport from "./pages/recruiter/EditInternshipCompletionReport";
import InternshipFeedback from "./pages/recruiter/InternshipFeedback";
import AccountSettings from "./pages/recruiter/AccountSettings";

/* ===== Faculty Pages ===== */
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentProfile from "./pages/faculty/StudentProfile";
import FacultyAccountSettings from "./pages/faculty/FacultyAccountSettings";
import CompaniesVerification from "./pages/faculty/CompaniesVerification";
import CompanyDetails from "./pages/faculty/CompanyDetails";
import InternshipDetailsInFaculty from "./pages/faculty/InternshipDetailsInFaculty";

/* ===== Admin Pages ===== */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./Layouts/AdminLayout";
import UsersPage from "./pages/admin/UsersPage";
import Assessment from "./pages/admin/Assessment";
import Trending from "./pages/admin/Trending";
import TrendingTopics from "./pages/admin/TrendingTopics";
import CandidateTrendingTopics from "./pages/candidate/CandidateTrendingTopics";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import Test from "./pages/Test";
import CandidateAssessment from "./pages/candidate/CandidateAssessment";
import EditInfo from "./pages/candidate/EditInfo";
import MakingAssessment from "./pages/candidate/MakingAssessment";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
// import CollegeReport from "./pages/candidate/CollegeReport";
// import PersonalReport from "./pages/candidate/Personal Report";


function App() {

  return (
    <Router>
      <Routes>
        {/* ================= Landing ================= */}
        <Route path="/" element={<Feed />} />
        {/* <Route path="test" element ={<Test/>}/> */}

        {/* ================= Auth Pages ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
        </Route>

        {/* ================= Candidate Pages ================= */}
        <Route element={<UserLayout />}>
      
        {/* <Route path="/success" element={<Success/>} /> */}
        <Route path="/company/:company" element={<CompanyDetailsInCandidate />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
          <Route path="/candidate-assessment" element={<CandidateAssessment />} />
          <Route path="/candidate-making-assessment" element={<MakingAssessment />} />
          <Route path="/candidate-edit" element={<EditInfo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/internship/:id" element={<InternshipDetailsInCandidate />} />

          {/* <Route path="/personal-report" element={<PersonalReport/>} /> */}
          {/* <Route path="/college-report" element={<CollegeReport/>} /> */}
          {/* <Route path="/company/:company" element={<CompanyProfile />} /> */}
          
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/success" element={<Success />} />
          <Route path="/upload-cv" element={<UploadCV />} />
          <Route path="/candidate-onboarding" element={<CandidateOnboarding />} />
          {/* <Route path="/university-onboarding" element={<UniversityOnboarding />} /> */}
          <Route path="/dashboard/:tab?" element={<CandidateDashboard />} />
          <Route path="/candidate-trends" element={<CandidateTrending />} />
          
          <Route path="/candidate-trending-topics" element={<CandidateTrendingTopics />} />


        </Route>

        {/* ================= Recruiter Pages ================= */}
        <Route element={<RecruiterLayout />}>
          <Route path="/recruiter-onboarding" element={<RecruiterOnboarding />} />
          <Route path="/recruiter-dashboard" element={<Dashboard />} />
          <Route path="/post-internship" element={<CreateInternship />} />
          <Route path="/dashboard/internship/:id/edit" element={<EditInternship />} />
          <Route path="/dashboard/internship/:id" element={<InternshipPreview />} />

          <Route path="/management" element={<ManageListing />} />
          <Route path="/user-application/:id" element={<UserApplication />} />
          <Route path="/write-internship-report/:applicationId" element={<WriteInternshipCompletionReport/>} />
          <Route path="/edit-internship-report/:applicationId" element={<EditInternshipCompletionReport/>} />
          <Route path="/feedback" element={<InternshipFeedback />} />
          <Route path="/recruiter-settings" element={<AccountSettings />} />
        </Route>

        {/* ================= Faculty Pages ================= */}
        <Route element={<FacultyLayout />}>
          <Route path="/college-onboarding" element={<CollegeOnboarding />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/companies" element={<CompaniesVerification />} />
          <Route path="/companies/:companyId" element={<CompanyDetails />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/faculty-settings" element={<FacultyAccountSettings />} />
          <Route path="/internship-details-in-faculty/:internshipId" element={<InternshipDetailsInFaculty />} />
        </Route>

        {/* ================= Admin Pages ================= */}
        <Route element={<AdminLayout/>}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<UsersPage />} />
             <Route path="/trending-topics/:id" element={<TrendingTopics />} />

          <Route path="/admin-trending" element={<Trending />} />
          <Route path="/admin-assessment" element={<Assessment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
