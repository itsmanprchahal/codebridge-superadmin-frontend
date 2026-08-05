import { FiUpload } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomButton from "../../component/CustomButton";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AddCourseList() {
    const { id } = useParams();
    const { state } = useLocation();
    const [categoryId, setCategoryId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [icon, setIcon] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState("");

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();

        if (state) {
            setCategoryId(state.category_id.toString());
            setCourseName(state.coursename);
            setIconPreview(state.icon);
        }
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/course-category");

            setCategories(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async () => {

        if (!categoryId || !courseName || !icon) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("category_id", categoryId);
            formData.append("coursename", courseName);
            formData.append("icon", icon);

            console.log("===== FORM DATA =====");

            formData.forEach((value, key) => {
                console.log(key, value);
            });

            if (id) {

                await API.put(`/update-course/${id}`, formData);

                alert("Course Updated Successfully.");

            } else {

                await API.post("/add-course", formData);

                alert("Course Added Successfully.");

            }
            setCategoryId("");
            setCourseName("");
            setIcon(null);
            setIconPreview("");

        } catch (err: any) {

            console.log(err.response?.data || err);

            alert(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } 

    };


    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white">

                    <h1 className="text-4xl font-bold">
                        {id ? "Edit Course" : "Add New Course"}
                    </h1>

                    <p className="mt-2 text-indigo-100">
                        {id
                            ? "Update your course details."
                            : "Create a new course and assign it to a category."
                        }
                    </p>

                </div>

                {/* Form */}

                <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                        {/* Left Side */}

                        <div className="space-y-6">

                            {/* Category */}

                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-indigo-600"
                            >
                                <option value="">Select Category</option>

                                {categories.map((item: any) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.categoryname}
                                    </option>
                                ))}
                            </select>

                            {/* Course Name */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Course Name
                                </label>

                                <input
                                    type="text"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    placeholder="React JS"
                                    className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-indigo-600"
                                />

                            </div>

                        </div>

                        {/* Right Side */}

                        <div className="space-y-6">

                            {/* Course Icon */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Course Icon
                                </label>

                                <label className="border-2 border-dashed border-indigo-300 rounded-3xl h-72 flex flex-col justify-center items-center cursor-pointer hover:bg-indigo-50 transition overflow-hidden">

                                    {iconPreview ? (

                                        <img
                                            src={iconPreview}
                                            alt="Course Icon"
                                            className="w-full h-full object-contain"
                                        />

                                    ) : (

                                        <>
                                            <FiUpload
                                                size={45}
                                                className="text-indigo-600"
                                            />

                                            <h3 className="mt-4 font-semibold text-lg">
                                                Upload Course Icon
                                            </h3>

                                            <p className="text-gray-500 mt-1">
                                                PNG, JPG, SVG (Max 2MB)
                                            </p>
                                        </>

                                    )}

                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {

                                            const file = e.target.files?.[0];

                                            if (!file) return;

                                            setIcon(file);

                                            setIconPreview(URL.createObjectURL(file));

                                        }}
                                    />

                                </label>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 mt-10">

                        <Link to="/admin/course-list">

                            <CustomButton
                                label="Cancel"
                                variant="secondary"
                            />

                        </Link>

                        <CustomButton
                            label={id ? "Update Course" : "Save Course"}
                            variant="primary"
                            onClick={handleSubmit}
                            type="submit"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}