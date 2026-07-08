import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../components/index.js";

function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
