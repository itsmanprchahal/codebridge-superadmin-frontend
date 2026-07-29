import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminSignup from "../pages/admin/AdminSignup";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/admin/Dashboard";

export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />
                <Route element={<PrivateRoute />}>

                    <Route
                        path="/admin/dashboard"
                        element={<Dashboard />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}