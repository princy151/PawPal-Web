import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSitter } from "./query";

const SitterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sitter, isLoading, error } = useGetSitter(id!);

  if (isLoading) return <p>Loading details...</p>;
  if (error) return <p>Error loading sitter details</p>;

  return (
    <div className="p-8" style={{ backgroundColor: "#FFE7D9" }}>
      <h3 className="text-3xl font-semibold text-gray-800 mb-6">Sitter Details</h3>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">{sitter.name}</h4>
        <img
          src={sitter.image || "https://via.placeholder.com/150"}
          alt={sitter.name}
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
        <p className="text-gray-600 text-lg mb-4">Address: {sitter.address}</p>
        <p className="text-gray-600 text-lg mb-4">Phone: {sitter.phone}</p>
        <p className="text-gray-600 text-lg mb-4">Email: {sitter.email}</p>
        <p className="text-gray-600 text-lg mb-4">Experience: {sitter.experience}</p>
        <p className="text-gray-600 text-lg mb-4">Bio: {sitter.bio}</p>
        <p className="text-gray-600 text-lg mb-4">Availability: {sitter.available}</p>
      </div>
    </div>
  );
};

export default SitterDetails;
