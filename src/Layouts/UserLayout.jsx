import { Outlet } from "react-router-dom";
import Navbar from "../Component/ui/Navbar";

export default function UserLayout() {
  return (
    <>
      <Navbar variant="user" />
      <Outlet />
    </>
  );
}
