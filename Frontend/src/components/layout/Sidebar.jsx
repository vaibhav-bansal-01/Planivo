import React from "react";
import { Link } from "react-router-dom";
import { SidebarItem, Logo } from "../index.js";

import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  CalendarDays,
  Users,
  NotebookPen,
  Plus,
  ChevronDown,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="flex h-screen w-80 shrink-0 flex-col border-r border-gray-200 bg-white px-6 py-8">
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

          <SidebarItem to="/calendar" icon={CalendarDays}>
            Calendar
          </SidebarItem>

          <SidebarItem to="/notes" icon={NotebookPen}>
            Notes
          </SidebarItem>
        </nav>
      </section>

      {/* ---------- Projects ---------- */}
      <section className="flex-1 overflow-y-auto">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Projects
          </p>

          <button className="flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="space-y-2">
          {/* Map Projects Here */}
        </div>

        <Link
          to="/projects"
          className="mt-6 block text-sm font-medium text-blue-600 hover:underline"
        >
          View all projects
        </Link>
      </section>

      {/* ---------- User ---------- */}
      <section className="mt-8 border-t border-gray-200 pt-6">
        <button className="flex w-full items-center justify-between rounded-xl p-3 transition hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              VB
            </div>

            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                View Profile
              </p>
            </div>
          </div>

          <ChevronDown
            size={18}
            className="text-gray-500"
          />
        </button>
      </section>
    </aside>
  );
}

export default Sidebar;