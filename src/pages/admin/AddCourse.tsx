export default function AddCourse() {
    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">
                    <h1 className="text-4xl font-bold">
                        Add Course
                    </h1>

                    <p className="mt-3 text-indigo-100 text-base">
                        Create a new course by entering the course name below.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl mt-8 p-10 border border-slate-200">

                    <label className="block mb-3 text-sm font-semibold text-slate-700">
                        Course Name
                    </label>

                    <div className="flex flex-col md:flex-row gap-5">

                        <input
                            type="text"
                            placeholder="Enter Course Name"
                            className="flex-1 h-14 rounded-2xl border border-slate-300 bg-slate-50 px-5 text-slate-700 outline-none transition-all duration-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
                        />

                        <button
                            type="button"
                            className="h-14 px-8 rounded-2xl bg-indigo-600 text-white font-semibold transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
                        >
                            Add Course
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}