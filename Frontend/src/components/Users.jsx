import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found, user not authenticated.");
                    console.error("No token found, user not authenticated.");
                    return;
                }

                const response = await axios.get(`http://127.0.0.1:5000/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data?.users) {
                    setUsers(response.data.users);
                } else {
                    setError("No users found.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <div className="font-bold text-2xl mb-6">Users</div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center text-gray-500">Loading users...</div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="text-center text-red-500">{error}</div>
            )}

            {/* Users List */}
            {!loading && !error && (
                <div className="space-y-4">
                    {users
                        .filter((user) =>
                            user.name.toLowerCase().includes(filter.toLowerCase())
                        )
                        .map((user) => (
                            <User key={user.id} user={user} navigate={navigate} />
                        ))}
                    {users.filter((user) =>
                        user.name.toLowerCase().includes(filter.toLowerCase())
                    ).length === 0 && (
                        <div className="text-center text-gray-500">No users found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

function User({ user, navigate }) {
    const userName = user.name || user.email || "Unknown User"; // Handle missing name

    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-blue-100 flex justify-center items-center mr-4">
                    <span className="text-xl font-semibold text-blue-600">
                        {userName.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <div className="font-medium text-gray-800">{userName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                </div>
            </div>

            <Button
                onPress={() => navigate(`/send?email=${user.email}&name=${userName}`)}
                label={"Send Money"}
                className="bg-green-500 hover:bg-green-600 text-white"
            />
        </div>
    );
}

export default Users;