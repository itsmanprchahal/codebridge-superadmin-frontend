import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../component/CustomButton";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function CourseList() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {

      const res = await API.get("/course-list");

      console.log(res.data);

      setCourses(res.data.data);

    } catch (err) {

      console.log(err);

    }
  };

  const deleteCourse = async (id: any) => {
    try {

      await API.delete(`/delete-course/${id}`);

      alert("Course Deleted Successfully.");

      fetchCourses();

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
            Courses
          </h1>

          <p className="mt-2 text-indigo-100">
            Manage all your courses from one place.
          </p>

        </div>

        {/* Top Bar */}

        <div className="bg-white mt-8 rounded-3xl shadow-lg p-6">

          <div className="flex flex-col lg:flex-row justify-between gap-5">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

              <FiSearch
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search course..."
                className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600"
              />

            </div>
            {/* test */}

            <Link to="/admin/add-course-list">

              <CustomButton
                label="Add Course"
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

                <th className="p-5 text-left">
                  Icon
                </th>

                <th className="p-5 text-left">
                  Course Name
                </th>

                <th className="p-5 text-left">
                  Category
                </th>

                <th className="p-5 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {courses.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  {/* Icon */}

                  <td className="p-5">

                    <img
                      src={item.icon}
                      alt={item.coursename}
                      className="w-14 h-14 rounded-xl object-cover"
                    />

                  </td>

                  {/* Course */}

                  <td className="p-5 font-medium">

                    {item.coursename}

                  </td>

                  {/* Category */}

                  <td className="p-5">

                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">

                      {item.categoryname}

                    </span>

                  </td>

                  {/* Action */}

                  <td className="p-5">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(`/admin/add-course-list/${item.id}`, {
                            state: item,
                          })
                        }
                        className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white duration-300">

                        <FiEdit2 />

                      </button>

                      <button
                        onClick={() => deleteCourse(item.id)}
                        className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white duration-300">

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