import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { FiGrid, FiBookOpen, FiUsers, FiSettings, FiLogOut, FiBookmark } from 'react-icons/fi'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";

function SidebarItem({ to, icon, label, activePaths }: { to: string; icon: ReactNode; label: string; activePaths?: string[] }) {
  const location = useLocation();
  const isActive = activePaths
    ? activePaths.some((path) => location.pathname.startsWith(path))
    : location.pathname === to;

  return (
    <NavLink
      to={to}
      className={() =>
        `flex items-center justify-between gap-3 w-full text-left px-4 py-3 rounded-xl transition ${
          isActive
            ? 'bg-red-600 text-white font-semibold'
            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
        }`
      }
    >
      <span className="flex items-center gap-3">
        <span className="text-lg text-current">{icon}</span>
        <span>{label}</span>
      </span>
      {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
    </NavLink>
  )
}

export default function AdminLayout() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandle = async () => {
    await dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-sm">
      <aside className="w-72 bg-[#0b0f1a] border border-slate-800 hidden md:flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl shadow-lg shadow-red-900/40">
            <FiBookmark />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Admin Panel</h2>
            <p className="text-slate-400 text-xs mt-0.5">Control center</p>
          </div>
        </div>

        <nav className="flex-1 overflow-hidden px-4 py-4 space-y-1.5">
          <SidebarItem to="/admin/dashboard" icon={<FiGrid />} label="Dashboard" />
          <SidebarItem
            to="/admin/course-categories"
            icon={<FiBookOpen />}
            label="Course Categories"
            activePaths={["/admin/course-categories", "/admin/add-course-category"]}
          />
          <SidebarItem
            to="/admin/course-list"
            icon={<FiBookOpen />}
            label="Course List"
            activePaths={["/admin/course-list", "/admin/add-course-list", "/admin/courselist", "/admin/add-course-List"]}
          />
        
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logoutHandle}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-600/10 hover:text-red-500 transition"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}