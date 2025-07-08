import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Navbar = ({ name, setshownav, isVisible }) => {
  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 z-40 opacity-10 bg-black"
        onClick={() => setshownav(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6 z-50 flex flex-col transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <p className="font-bold text-xl">{name}</p>
          <button
            onClick={() => setshownav(false)}
            className="text-2xl hover:text-red-500 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 text-lg">
          <Link
            to="/dashboard"
            className="hover:text-blue-600 py-2"
            onClick={() => setshownav(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/update-info"
            className="hover:text-blue-600 py-2"
            onClick={() => setshownav(false)}
          >
            Update Info
          </Link>
          <Link
            to="/signin"
            className="text-red-500 hover:text-red-700 py-2 mt-auto"
            onClick={() => {
              localStorage.clear();
              toast.success("Logged Out successfully");
              setshownav(false);
            }}
          >
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  setshownav: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
