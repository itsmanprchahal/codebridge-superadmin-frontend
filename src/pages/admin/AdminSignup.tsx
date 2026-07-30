import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../component/CustomButton'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { signupAdmin } from '../../features/auth/authSlice';


export default function AdminSignup() {

    const [fullname, setFullame] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmpassword] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            toast.error("Password mismatch");
            return;
        }

        const result = await dispatch(
            signupAdmin({
                fullname: fullname,
                email,
                password,
                confirmpassword
            })
        );

        if (signupAdmin.fulfilled.match(result)) {
            toast.success("Signup success");
            navigate("/admin/dashboard"); // ya login
        } else {
            toast.error(result.payload as string);
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
