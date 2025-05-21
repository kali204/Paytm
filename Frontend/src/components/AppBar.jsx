import { useNavigate } from "react-router-dom";

const AppBar = ({ user, children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="shadow h-16 flex justify-between items-center px-6 bg-white">
            {/* App Title */}
            <div className="text-2xl font-bold text-blue-600">PayME App</div>

            {/* Right Section: Transactions, User Info, Profile, Logout */}
            <div className="flex items-center space-x-4">
                {/* Transactions Button */}
                <button
                    onClick={() => navigate("/transactions")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    Transactions
                </button>

                {/* Profile Button */}
                <button
                    onClick={() => navigate("/profile")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    Profile
                </button>

                {/* User Info */}
                <div className="flex items-center space-x-3">
                    <div className="text-lg font-semibold text-gray-800">
                        Hello, {user ? user.firstName : "User"}
                    </div>
                    <div className="rounded-full h-10 w-10 bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                        {user?.firstName ? user.firstName[0].toUpperCase() : "?"}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AppBar;