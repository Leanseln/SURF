import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const Login = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(password, navigate); // ✅ Pass navigate
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
                    Dashboard Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Admin Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle input type
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Add padding for the icon
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition duration-300 mt-7" // Position the icon
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle between eye icons */}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;