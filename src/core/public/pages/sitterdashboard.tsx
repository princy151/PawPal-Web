import React, { useState, useEffect } from "react";
import { useGetOwners, useCreateBooking } from "./query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";  // Import Toastify
import "react-toastify/dist/ReactToastify.css";  // Import styles
import { motion } from "framer-motion";

// Define Pet interface
interface Pet {
  _id: string;
  petname: string;
  type: string;
  petimage: string;
  petinfo: string;
  status: string;
  openbooking: string;
  booked: string;
}

// Define Owner interface
interface Owner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  image: string | null;
  pets: Pet[];
}

const PetSitterDashboard: React.FC = () => {
  const { data: owners, isLoading, isError } = useGetOwners();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [startDate, setStartDate] = useState<string>("");  // State for start date
  const [endDate, setEndDate] = useState<string>("");  // State for end date
  const { mutate: createBooking } = useCreateBooking();
  const navigate = useNavigate();

  const sitterId = localStorage.getItem("sitterId");

  useEffect(() => {
    if (owners) {
      const allPets = owners.flatMap((owner: Owner) => owner.pets);
      const filteredPets = allPets.filter((pet: Pet) => pet.openbooking === "yes" && pet.booked === "no");
      setPets(filteredPets);
    }
  }, [owners]);

  const handleViewDetails = (pet: Pet) => {
    const owner = owners?.find((owner: Owner) => owner.pets.includes(pet)) || null;
    setSelectedPet(pet);
    setSelectedOwner(owner);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setSelectedOwner(null);
  };

  const handleBookNow = () => {
    if (selectedPet && selectedOwner && startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        toast.error("End date must be after the start date!"); // Validation check
        return;
      }

      const bookingData = {
        ownerId: selectedOwner._id,
        sitterId: sitterId,
        petId: selectedPet._id,
        startDate: startDate,  
        endDate: endDate,  // Include selected end date
        totalPrice: 100,
      };

      console.log("Booking Data:", bookingData);

      createBooking(bookingData);
      toast.success("Booking successful!");
      setStartDate("");
      setEndDate("");  // Reset both date fields
    } else {
      toast.error("Please select both start and end dates for the booking!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sitterId");
    navigate("/");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading pets</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 transition-all duration-500"
      style={{ backgroundImage: "url('src/assets/registerbg.png')" }}
    >
      {/* Header Section */}
      <header className="flex flex-col mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#7F410B]">Welcome Pet Sitter </h1>
        </div>

        <nav className="flex justify-end space-x-8 text-xl font-semibold text-white">
          <button
            onClick={() => navigate("/mybookings")}
            className="px-6 py-3 bg-[#FFB98D] text-white rounded-lg hover:bg-[#DF864E] transition-all duration-200"
          >
            Bookings
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-[#FFB98D] text-white rounded-lg hover:bg-[#DF864E] transition-all duration-200"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Available Pets Section */}
      <div>
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-3xl font-bold text-[#7F410B] mb-6 text-left"
        >
          Available Pets for Sitting
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet: Pet, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg hover:scale-105 transform transition-all duration-300 border border-[#FFB98D] hover:border-[#BC8758]"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={pet.petimage || "https://via.placeholder.com/150"}
                alt={pet.petname}
                className="w-full h-64 object-contain rounded-2xl mb-4 transition-all duration-300"
              />
              <h2 className="text-2xl font-semibold mt-4 text-[#2D3748]">{pet.petname}</h2>
              <p className="text-gray-600 text-lg">{pet.type}</p>
              <p className="mt-2 text-sm text-gray-500">{pet.petinfo}</p>

              <div className="mt-4 flex justify-between">
                <button
                  className="px-6 py-3 bg-[#FFB98D] text-white rounded-lg hover:bg-[#DF864E] transition-all duration-200"
                  onClick={() => handleViewDetails(pet)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Viewing Pet Details */}
      {selectedPet && selectedOwner && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-7 rounded-lg w-[80%] max-w-4xl flex flex-col md:flex-row shadow-2xl transition-all duration-500 relative">
      
      {/* Close Button (top-right corner) */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white bg-red-500 rounded-lg p-2 hover:bg-red-600 transition-all duration-200"
      >
        Close
      </button>

      <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#2D3748]">{selectedPet.petname}</h2>
        <img
          src={selectedPet.petimage || "https://via.placeholder.com/150"}
          alt={selectedPet.petname}
          className="w-48 h-48 object-contain rounded-lg shadow-lg mb-4 transition-all duration-300"
        />
        <p className="text-lg font-medium text-[#2D3748]">{selectedPet.type}</p>
        <p className="mt-2 text-sm text-gray-500 text-center">{selectedPet.petinfo}</p>
      </div>

      <div className="w-full md:w-1/2 p-4 border-l border-[#FFB98D] flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-3 text-[#2D3748]">Owner Details</h3>
        <div className="text-[#4A5568] space-y-2">
          <p><strong>Name:</strong> {selectedOwner.name}</p>
          <p><strong>Email:</strong> {selectedOwner.email}</p>
          <p><strong>Phone:</strong> {selectedOwner.phone}</p>
          <p><strong>Address:</strong> {selectedOwner.address}</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-2">
          {/* Start Date Picker */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#BC8758] text-[#2D3748]"
          />

          {/* End Date Picker */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#BC8758] text-[#2D3748]"
          />
        </div>

        {/* Book Now Button centered */}
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-3 bg-[#DF864E] text-white rounded-lg hover:bg-[#FFB98D] transition-all duration-200 w-full md:w-auto"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      <ToastContainer /> {/* Toastify container to show notifications */}
    </div>
  );
};

export default PetSitterDashboard;
