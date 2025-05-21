import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/account/profile", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.status === 200) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Error fetching profile:", error.response || error.message || error);
                setError("Error fetching profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                "http://127.0.0.1:5000/account/profile",
                { firstName: user.firstName, lastName: user.lastName },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (response.status === 200) {
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating profile:", error.response || error.message || error);
            setError("Error updating profile.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
                {loading ? (
                    <div className="text-center">Loading profile...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <form onSubmit={handleUpdateProfile}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.firstName || ""}
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="firstName"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.lastName || ""}
                                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="lastName"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                    id="email"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;