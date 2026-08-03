import { FiUpload } from "react-icons/fi";
import CustomButton from "../../component/CustomButton";
import { useState } from "react";
import API from "../../api/axios";

export default function AddCourseCategory() {

    const [categoryName, setCategoryName] = useState("");
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [icon, setIcon] = useState<File | null>(null);

    const [iconPreview, setIconPreview] = useState("");

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("categoryname", categoryName);
        formData.append("heading", heading);
        formData.append("sub_heading", subHeading);

        if (icon) {
            formData.append("icon", icon);
        }

        console.log("===== FORM DATA =====");

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const res = await API.post("/course-category", formData);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white">

                    <h1 className="text-4xl font-bold">

                        Add Course Category

                    </h1>

                    <p className="mt-2 text-indigo-100">

                        Create a new category for your courses.

                    </p>

                </div>

                {/* Form */}

                <div className="bg-white mt-8 rounded-3xl shadow-xl p-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

                        <div>

                            <label className="block mb-2 font-medium">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter category name"
                                className="w-full h-14 rounded-2xl border px-5 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Heading
                            </label>

                            <input
                                type="text"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                placeholder="Enter heading"
                                className="w-full h-14 rounded-2xl border px-5 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
                            />

                        </div>

                    </div>

                    <div className="mt-7">

                        <label className="block mb-2 font-medium">
                            Sub Heading
                        </label>

                        <textarea
                            rows={5}
                            placeholder="Enter sub heading..."
                            value={subHeading}
                            onChange={(e) => setSubHeading(e.target.value)}
                            className="w-full rounded-2xl border p-5 outline-none resize-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
                        ></textarea>

                    </div>

                    <div className="mt-7">

                        <label className="border-2 border-dashed rounded-2xl h-56 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition overflow-hidden">

                            {iconPreview ? (

                                <img
                                    src={iconPreview}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />

                            ) : (

                                <div className="flex flex-col items-center">

                                    <FiUpload
                                        size={42}
                                        className="text-indigo-600"
                                    />

                                    <p className="mt-4 text-slate-500">
                                        Click to upload icon
                                    </p>

                                </div>

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

                    <div className="mt-10 flex justify-end">

                        <CustomButton
                            label="Save Category"
                            variant="primary"
                            className="px-10"
                            onClick={handleSubmit}
                        />

                    </div>

                </div>

            </div>

        </div>

    );
}