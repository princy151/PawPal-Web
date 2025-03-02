import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSitter } from "./query";

const SitterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sitter, isLoading, error } = useGetSitter(id!);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading details...</p>;
  if (error) return <p>Error loading sitter details</p>;

  const handleBackClick = () => {
    navigate("/ownerdashboard");
  };

  return (
    <div className="min-h-screen p-8 bg-[#FFE7D9]">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-8 left-8 bg-[#8B3A2F] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#7A2E26] transition-colors duration-300"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col justify-center items-center space-y-12 mt-16">
        {/* Bigger Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 w-full max-w-6xl">
          <div className="flex-shrink-0 w-full md:w-1/2 h-full">
            <img
              src={sitter.image || "https://via.placeholder.com/1200x800"}
              alt={sitter.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 space-y-6">
            <h4 className="text-3xl font-semibold text-gray-800 mb-4">
              {sitter.name}
            </h4>

            <div className="w-full">
              <p className="font-bold text-gray-600 text-xl mb-2">Address:</p>
              <p className="text-gray-600 text-lg mb-4">{sitter.address}</p>

              <p className="font-bold text-gray-600 text-xl mb-2">Phone:</p>
              <p className="text-gray-600 text-lg mb-4">{sitter.phone}</p>

              <p className="font-bold text-gray-600 text-xl mb-2">Email:</p>
              <p className="text-gray-600 text-lg mb-4">{sitter.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitterDetails;
