import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      <Icon size={20} />
      <span>{children}</span>
    </NavLink>
  );
}

export default SidebarItem;
