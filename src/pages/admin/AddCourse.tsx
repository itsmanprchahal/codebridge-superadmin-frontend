import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../component/CustomButton";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function CourseCategoryList() {
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories(currentPage, search);
    }, [currentPage]);

    const fetchCategories = async (page = currentPage, searchText = search) => {
        try {
            const res = await API.get("/course-category", {
                params: {
                    page,
                    limit: 1,
                    search: searchText
                }
            });

            setCategories(res.data.data);
            setTotalPages(res.data.pagination?.totalPages || 1);

        } catch (err) {
            console.log(err);
        }
    };

    const deleteCategory = async (id: any) => {

        try {

            await API.delete(`/course-category/${id}`);

            alert("Category Deleted Successfully.");

            fetchCategories();

        } catch (err) {

            console.log(err);

        }

    };


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
                                value={search}
                                onChange={(e) => {

                                    const value = e.target.value;

                                    setSearch(value);

                                    setCurrentPage(1);

                                    fetchCategories(1, value);

                                }}
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

                                <th className="p-5 text-center">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map((item: any) => (

                                <tr key={item.id}>

                                    <td className="p-5">

                                        <img
                                            src={item.icon}
                                            className="w-12 h-12 rounded-xl object-cover"
                                            alt={item.categoryname}
                                        />

                                    </td>

                                    <td className="p-5">

                                        {item.categoryname}

                                    </td>

                                    <td className="p-5">

                                        {item.heading}

                                    </td>

                                    <td className="p-5">

                                        {item.sub_heading}

                                    </td>



                                    <td className="p-5">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => navigate(`/admin/add-course-category/${item.id}`, { state: item },)}
                                                className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                                                <FiEdit2 />

                                            </button>

                                            <button
                                                onClick={() => deleteCategory(item.id)}
                                                className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">

                                                <FiTrash2 />

                                            </button>

                                        </div>

                                    </td>


                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <div className="flex justify-end items-center gap-3 p-5">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 rounded bg-gray-200"
                        >
                            Previous
                        </button>

                        <span>{currentPage} / {totalPages}</span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 rounded bg-indigo-600 text-white"
                        >
                            Next
                        </button>

                    </div>
                </div>

            </div>

        </div>
    );
}