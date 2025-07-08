import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  // State variables to hold form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !username || !password) {
      alert("All fields are required.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName,
          lastName,
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="bg-gray-300 h-screen flex items-center justify-center">
      <div className="bg-white h-max w-96 rounded-lg flex flex-col items-center justify-center py-2 px-4">
        <div className="text-4xl font-bold pt-4">Sign Up</div>
        <div className="text-gray-500 font-medium text-center py-2">
          Enter your information to create an account
        </div>
        <div className="flex flex-col items-start w-full px-2 py-1">
          <div className="font-semibold py-2">First Name</div>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            value={firstName}
            placeholder="Enter your firstname"
            className="w-full p-2 border rounded border-slate-200"
          />
        </div>
        <div className="flex flex-col items-start w-full px-2 py-1">
          <div className="font-semibold py-2">Last Name</div>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            value={lastName}
            placeholder="Enter your lastname"
            className="w-full p-2 border rounded border-slate-200"
          />
        </div>
        <div className="flex flex-col items-start w-full px-2 py-1">
          <div className="font-semibold py-2">Username</div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            placeholder="abc@example.com"
            className="w-full p-2 border rounded border-slate-200"
          />
        </div>
        <div className="flex flex-col items-start w-full px-2 py-1">
          <div className="font-semibold py-2">Password</div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            className="w-full p-2 border rounded border-slate-200"
          />
        </div>
        <div className="w-full px-2 pt-4">
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"
          >
            Sign Up
          </button>
        </div>
        <div className="py-2 text-sm">
          <span>Already have an account?</span>
          <Link to="/signin" className="underline cursor-pointer pl-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
