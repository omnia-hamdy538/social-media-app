import { Outlet } from "react-router-dom";
import Navbar from "../Component/ui/Navbar";

export default function FacultyLayout() {
  return (
    <>
      <Navbar variant="faculty" />
      <Outlet />
    </>
  );
}
