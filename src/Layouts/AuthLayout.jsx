import { Outlet } from "react-router-dom";
import Navbar from "../Component/ui/Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar variant="auth" />
      <Outlet />
      
    </>
  );
}
