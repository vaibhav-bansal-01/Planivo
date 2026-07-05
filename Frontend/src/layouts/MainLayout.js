import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../components/index.js";

function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="flex1">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
