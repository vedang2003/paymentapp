import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import axios from "axios";
import config from "../config";

export const Signin = () => {
  // State variables to hold form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_URL}/user/signin`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      setError(
        error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="bg-gray-300 h-screen flex items-center justify-center">
      <div className="bg-white h-max w-96 rounded-lg flex flex-col items-center justify-center py-2 px-4">
        <div className="text-4xl font-bold pt-4">Sign In</div>
        <div className="text-gray-500 font-medium text-center py-2 px-2">
          Enter your credentials to access your account
        </div>
        {error && (
          <div className="w-full rounded-lg bg-red-100 p-2">
            <div className=" text-red-500 font-medium tex-sm flex items-center justify-center">
              <MdError /> <span className="font-bold px-1">Error : </span>{" "}
              {error}
            </div>
          </div>
        )}
        <div className="flex flex-col items-start w-full px-2 py-1">
          <div className="font-semibold py-2">Email</div>
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
            Sign In
          </button>
        </div>
        <div className="py-2 text-sm">
          <span>{"Don't have an account?"}</span>
          <Link to="/" className="underline cursor-pointer pl-1">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
