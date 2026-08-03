
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../component/CustomButton'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { loginAdmin, } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';

export default function AdminLogin() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const { loading } = useSelector((state: RootState) => state.auth);

    const submitHandle = async (e: any) => {
        e.preventDefault();

        const formdata = { email, password };

        try {
            const res = await dispatch(loginAdmin(formdata)).unwrap();

            toast.success(res.message);
            navigate("/admin/dashboard");

        } catch (err: any) {
            toast.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-indigo-900 flex items-center justify-center p-5">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 auth-card">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold">
                        Admin Sign In
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Admin access only
                    </p>

                </div>

                <form onSubmit={submitHandle} className="space-y-5">

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

                    <CustomButton className='w-full' type='submit' label='Login' variant='primary' loading={loading} />

                </form>

                <p className="text-center mt-8">
                    Not an admin?
                    <Link
                        to="/admin/signup"
                        className="text-blue-600 font-semibold ml-2"
                    >
                        Create new Account
                    </Link>

                </p>

            </div>

        </div>

    )
}


