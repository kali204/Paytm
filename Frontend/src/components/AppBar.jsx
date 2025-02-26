import { useNavigate } from "react-router-dom";

const AppBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
      {/* 🔥 App Title */}
      <div className="text-xl font-bold">PayME App</div>

      {/* 🔥 Right Section: Transactions, Username, Logout */}
      <div className="flex items-center">
        {/* Transactions Button */}
        <button
          onClick={() => navigate("/transactions")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mx-2"
        >
          Transactions
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-lg font-semibold">Hello, {user?.firstName || "User"}</div>
          <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl font-semibold">
            {user?.firstName ? user.firstName[0].toUpperCase() : "?"}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppBar;
