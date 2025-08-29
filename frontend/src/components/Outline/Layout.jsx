import { Outlet } from "react-router";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
