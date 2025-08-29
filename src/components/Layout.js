import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "70px", padding: "20px" }}>
        <Outlet /> {/* this renders the child route */}
      </div>
    </>
  );
}
