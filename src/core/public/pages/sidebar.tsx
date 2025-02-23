import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaPaw, FaEnvelope } from "react-icons/fa"; // Icons for better UI

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-[#8B3A2F] text-white p-6"> {/* Brownish-red background */}
      <h2 className="text-2xl font-semibold mb-8">PawPal Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link
            to="/"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#6A2C20] !text-white"
          >
            <FaHome />
            <span>dfsdfsf</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/pet-sitter"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#6A2C20] !text-white"
          >
            <FaPaw />
            <span>Pet Sitters</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/appointments"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#6A2C20] !text-white"
          >
            <FaCalendarAlt />
            <span>Appointments</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/messages"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#6A2C20] !text-white"
          >
            <FaEnvelope />
            <span>Messages</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
