import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import config from "../config";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/user/bulk?filter=${filter}`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users", error.response.data);
        setUsers([]);
      }
    }, 300);
    return () => clearTimeout(fetchUsers);
  }, [filter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-extrabold pt-8">Users</div>
      <div className="py-2">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div className="flex flex-col gap-3">
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};
const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/send", { state: { user } });
          }}
          className="cursor-pointer w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};
