import {
  FaChartPie,
  FaMoneyBillWave,
  FaSignOutAlt
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

function Sidebar({ closeSidebar }) {

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  return (

    <div className="w-64 min-h-screen bg-white shadow-lg p-6">

      <h1 className="text-2xl font-bold text-[#E0531F] mb-10">
        FinanceTracker
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          onClick={closeSidebar}
          className="flex items-center gap-3 text-gray-700 hover:text-[#E0531F] font-medium transition"
        >
          <FaChartPie />
          Dashboard
        </Link>

        <Link
          to="/transactions"
          onClick={closeSidebar}
          className="flex items-center gap-3 text-gray-700 hover:text-[#E0531F] font-medium transition"
        >
          <FaMoneyBillWave />
          Transactions
        </Link>

        <button
          onClick={() => {

            logout();

            navigate("/login");
          }}
          className="flex items-center gap-3 text-red-500 font-medium mt-10 hover:text-red-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>

    </div>
  );
}

export default Sidebar;