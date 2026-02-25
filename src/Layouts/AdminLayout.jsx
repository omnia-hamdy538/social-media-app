import { Outlet } from "react-router-dom";
import Navbar from "../Component/ui/Navbar";

export default function AdminLayout() {
  return (
    <>
      <Navbar variant="admin" />
      <Outlet />
    </>
  );
}
