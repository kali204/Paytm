import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not authenticated.");
          return;
        }

        const response = await axios.get(`http://127.0.0.1:5000/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data.users || []); // Ensure it’s an array
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>

      {/* Search Input */}
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users"
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>

      {/* Filter Users */}
      <div>
        {users.length > 0 ? (
          users
            .filter((user) =>
              user.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((user) => <User key={user.id} user={user} navigate={navigate} />)
        ) : (
          <div className="text-gray-500 text-center">No users found.</div>
        )}
      </div>
    </div>
  );
};

function User({ user, navigate }) {
  const userName = user.name || user.email || "Unknown User"; // Handle missing name

  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
          <span className="text-xl font-semibold">{userName.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <div className="font-medium">{userName}</div>
        </div>
      </div>

      <Button
    onPress={() => navigate(`/send?email=${user.email}&name=${userName}`)} // Use email instead of ID
    label={"Send Money"}
/>

    </div>
  );
}

export default Users;
