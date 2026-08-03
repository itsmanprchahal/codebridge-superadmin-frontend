import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { FiGrid, FiBookOpen } from 'react-icons/fi'
import CustomButton from "../component/CustomButton";
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
        `flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition ${
          isActive
            ? 'bg-red-600 text-white font-semibold'
            : 'text-slate-600 hover:bg-red-600 hover:text-white'
        }`
      }
    >
      <span className="text-lg text-current">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

export default function AdminLayout() {
 
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();

  const logoutHandle = async () =>{
    await dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-sm">
      <aside className="w-72 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">Admin Panel</h2>
          <p className="text-slate-500 text-sm mt-1">Manage courses, users, and content</p>
        </div>

        <nav className="flex-1 overflow-hidden px-4 py-5 space-y-2">
          <SidebarItem to="/admin/dashboard" icon={<FiGrid />} label="Dashboard" />
          <SidebarItem
            to="/admin/course-categories"
            icon={<FiBookOpen />}
            label="Course Categories"
            activePaths={["/admin/course-categories", "/admin/add-course-category"]}
          />
        </nav>

        <div className="p-5 border-t">
          
          <CustomButton className="w-full" onClick={logoutHandle} label="Logout" variant="primary" type="submit"/>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
