import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../component/CustomButton'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function AdminSignup() {

    const [fullname, setFullame] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmpassword] = useState<string>("");

    const Navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        

        e.preventDefault();

        if (password !== confirmpassword) {

            toast.error("Password and Confirm Password do not match.");

            return;
        }

        const formdata = {
            fullname,
            email,
            password,
            confirmpassword
        };

        try {
            const response = await axios.post(
                // https://codebridgeit-superadmin-pkdsgotje-itsmanrpchahals-projects.vercel.app/api/test
                "https://codebridgeit-superadmin-7fsv9sac3-itsmanrpchahals-projects.vercel.app/api/test",
                formdata
            );
            console.log("✅ Form Data:", formdata);
            toast.success(response.data.message);
            Navigate("/admin/login");

        }

        catch (error: any) {
            toast.error(error.response.data.message);
        }
        

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center p-5">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 auth-card">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold">
                        Admin Sign Up
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create an admin account
                    </p>

                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label>Full name</label>

                        <div className="flex items-center border rounded-xl mt-2 px-4">

                            <FaUser className="text-gray-400" />

                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullame(e.target.value)}
                                placeholder="Full name"
                                className="w-full p-4 outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label>Email</label>

                        <div className="flex items-center border rounded-xl mt-2 px-4">

                            <FaEnvelope className="text-gray-400" />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin Email"
                                className="w-full p-4 outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label>Password</label>

                        <div className="flex items-center border rounded-xl mt-2 px-4">

                            <FaLock className="text-gray-400" />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-4 outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label>Confirm Password</label>

                        <div className="flex items-center border rounded-xl mt-2 px-4">

                            <FaLock className="text-gray-400" />

                            <input
                                type="password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full p-4 outline-none"
                            />

                        </div>

                    </div>

                    <CustomButton label='Create Admin' variant='primary' type='submit' />

                </form>

                <p className="text-center mt-8">

                    Already an admin?

                    <Link
                        to="/admin/login"
                        className="text-blue-600 font-semibold ml-2"
                    >
                        login
                    </Link>

                </p>

            </div>

        </div>

    )
}
