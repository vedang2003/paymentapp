import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

export const SendMoney = () => {
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = location.state || {};
  const id = user._id;
  const name = user.firstName;
  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.API_URL}/account/transfer`,
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Transfer successful");
        navigate("/dashboard");
      } else {
        alert("Transfer failed. Please try again!");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="h-min max-w-md p-4 w-96 space-y-4 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col justify-center p-4">
            <div className="text-3xl font-extrabold text-center">
              Send Money
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="flex justify-center cursor-pointer rounded-md font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
