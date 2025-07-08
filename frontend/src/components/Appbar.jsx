import { useState } from "react";
import { Navbar } from "./Navbar";

export const Appbar = () => {
  const name = localStorage.getItem("name") || "User";
  const [shownav, setshownav] = useState(false);

  return (
    <div>
      {/* Only render Navbar when shownav is true */}
      {shownav && (
        <Navbar setshownav={setshownav} name={name} isVisible={shownav} />
      )}
      <div className="h-20 flex justify-between items-center p-6 shadow">
        <div className="text-3xl font-extrabold">Payments App</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl">Hello, {name}</div>
          <button
            className="flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-100"
            onClick={() => setshownav(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
