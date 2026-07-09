import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarItem, Logo, ProjectListItem, Input } from "../index.js";
import { getUserProjects, createProject } from "../../api/projectApi";
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  CalendarDays,
  User,
  NotebookPen,
  Plus,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/authSlics.js";
import { logout } from "../../api/authApi.js";

function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    try {
      const response = await getUserProjects();
      setProjects(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const response = await createProject({
        name: projectName,
      });

      console.log(response.data);

      const project = response.data.data;

      setProjects((prev) => [...prev, project]);

      setProjectName("");
      setIsCreatingProject(false);

      navigate(`/projects/${project._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(logoutSuccess());

      setShowProfileMenu(false);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user?.avatar?.url]);

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 border-r border-gray-200 bg-white px-6 py-8">
      {/* ---------- Logo ---------- */}
      <div className="mb-12 flex justify-center">
        <Logo className="w-40" />
      </div>

      {/* ---------- Main Navigation ---------- */}
      <section className="mb-8">
        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main
        </p>

        <nav className="space-y-1">
          <SidebarItem to="/" icon={LayoutDashboard}>
            Dashboard
          </SidebarItem>

          <SidebarItem to="/projects" icon={FolderOpen}>
            Projects
          </SidebarItem>

          <SidebarItem to="/tasks" icon={CheckSquare}>
            My Tasks
          </SidebarItem>

        </nav>
      </section>

      {/* ---------- Projects ---------- */}
      <section className="flex-1 overflow-y-auto">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Projects
          </p>

          <button
            className="flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            onClick={() => setIsCreatingProject(true)}
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        <div className="space-y-2">
          {projects.slice(0, 5).map((project) => (
            <ProjectListItem key={project._id} project={project} />
          ))}
          {isCreatingProject && (
            <form onSubmit={handleAddProject}>
              <Input
                autoFocus
                placeholder="New project..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsCreatingProject(false);
                    setProjectName("");
                  }
                }}
              />
            </form>
          )}
        </div>

        <Link
          to="/projects"
          className="mt-6 block text-sm font-medium text-blue-600 hover:underline"
        >
          View all projects
        </Link>
      </section>

      {/* ---------- User ---------- */}
      <section className="absolute bottom-8 left-6 right-6 border-t border-gray-200 pt-6 bg-white">
        <button
          onClick={() => setShowProfileMenu((prev) => !prev)}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl p-3 transition hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            {user?.avatar?.url && !imageError ? (
              <img
                src={`http://localhost:8000${user.avatar.url}`}
                alt={user.fullName}
                className="h-10 w-10 rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {user?.fullName?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">
                {user?.fullName || user?.username}
              </p>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${showProfileMenu ? "rotate-180" : ""}`}
          />
        </button>

        {showProfileMenu && (
          <div className="absolute bottom-16 left-0 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <button
              onClick={() => {
                setShowProfileMenu(false);
                navigate("/profile");
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-50"
            >
              <User size={18} />
              View Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </section>
    </aside>
  );
}

export default Sidebar;
