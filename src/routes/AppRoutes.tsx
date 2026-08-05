import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminSignup from "../pages/admin/AdminSignup";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "./AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AddCourse from "../pages/admin/AddCourse";
import AddCourseCategory from "../pages/admin/AddCourseCategory";
import CourseList from "../pages/admin/CourseList";
import AddCourseList from "../pages/admin/AddCourseList";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />

                <Route element={<PrivateRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/course-categories" element={<AddCourse />} />
                        <Route path="/admin/add-course-category" element={<AddCourseCategory />} />
                        <Route
                            path="/admin/add-course-category/:id"
                            element={<AddCourseCategory />}
                        />
                        <Route path="/admin/course-list" element={<CourseList />} />
                        <Route path="/admin/courselist" element={<CourseList />} />
                        <Route path="/admin/add-course-list" element={<AddCourseList />} />
                        <Route
                            path="/admin/add-course-list/:id"
                            element={<AddCourseList />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}