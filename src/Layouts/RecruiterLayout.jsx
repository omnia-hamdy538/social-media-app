import { Outlet } from "react-router-dom";
import Navbar from "../Component/ui/Navbar";

export default function RecruiterLayout() {
  return (
    <>
      <Navbar variant="recruiter" />
      <Outlet />
    </>
  );
}
