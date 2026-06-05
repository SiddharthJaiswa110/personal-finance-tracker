import {
  useContext
} from "react";

import {
  FaBars
} from "react-icons/fa";

import {
  AuthContext
} from "../context/AuthContext";

function Navbar({ toggleSidebar }) {

  const { user } = useContext(AuthContext);

  return (

    <div className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-[#E0531F] text-xl"
        >
          <FaBars />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Dashboard
        </h2>

      </div>

      <div className="w-10 h-10 rounded-full bg-[#E0531F] text-white flex items-center justify-center font-bold">
        {user?.name?.charAt(0)}
      </div>

    </div>
  );
}

export default Navbar;