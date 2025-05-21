import { useNavigate } from "react-router-dom";
const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Send Money",
            icon: "💸",
            onClick: () => navigate("/send-money"),
        },
        {
            title: "Request Money",
            icon: "📥",
            onClick: () => navigate("/request-money"),
        },
        {
            title: "Add Funds",
            icon: "💰",
            onClick: () => navigate("/add-funds"),
        },
    ];

    return (
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className="flex flex-col items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
                    >
                        <span className="text-2xl mb-2">{action.icon}</span>
                        <span className="text-sm font-medium">{action.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;