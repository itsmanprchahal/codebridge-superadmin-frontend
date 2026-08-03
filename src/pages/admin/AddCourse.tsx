import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../component/CustomButton";

export default function CourseCategoryList() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white">

                    <h1 className="text-4xl font-bold">
                        Course Categories
                    </h1>

                    <p className="mt-2 text-indigo-100">
                        Manage all your course categories from one place.
                    </p>

                </div>

                {/* Top Bar */}

                <div className="bg-white mt-8 rounded-3xl shadow-lg p-6">

                    <div className="flex flex-col md:flex-row justify-between gap-5">

                        <div className="relative w-full md:max-w-md">

                            <FiSearch
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />

                            <input
                                type="text"
                                placeholder="Search category..."
                                className="w-full h-14 rounded-2xl border border-slate-300 pl-14 pr-5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600"
                            />

                        </div>

                        <Link to="/admin/add-course-category">
                            <CustomButton
                                label="Add Category"
                                variant="primary"
                            />
                        </Link>
                    </div>

                </div>

                {/* Table */}

                <div className="bg-white mt-8 rounded-3xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="p-5 text-left">Icon</th>
                                <th className="p-5 text-left">Category</th>
                                <th className="p-5 text-left">Heading</th>
                                <th className="p-5 text-left">Sub Heading</th>
                                <th className="p-5 text-left">Created</th>
                                <th className="p-5 text-center">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {[1, 2, 3].map((item) => (

                                <tr
                                    key={item}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-5">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-100"></div>
                                    </td>

                                    <td className="p-5 font-semibold">
                                        Web Development
                                    </td>

                                    <td className="p-5">
                                        Learn Full Stack
                                    </td>

                                    <td className="p-5">
                                        React | Node | PostgreSQL
                                    </td>

                                    <td className="p-5">
                                        30 Jul 2026
                                    </td>

                                    <td className="p-5">

                                        <div className="flex justify-center gap-3">

                                            <button className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                                                <FiEdit2 />

                                            </button>

                                            <button className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">

                                                <FiTrash2 />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}