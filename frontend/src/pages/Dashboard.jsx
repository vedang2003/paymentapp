import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import axios from "axios";
import { Users } from "../components/Users";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error.response.data);
        setBalance(0);
      }
    };
    fetchBalance();
  }, [token]);
  return (
    <>
      <Appbar />
      <div className="p-6 mt-2">
        <Balance balance={balance} />
        <Users />
      </div>
    </>
  );
};
