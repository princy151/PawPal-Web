import React, { useState, useEffect } from "react";
import { useGetOwners, useCreateBooking } from "./query"; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

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
  const { mutate: createBooking } = useCreateBooking();  // Access the booking mutation
  const navigate = useNavigate(); // Initialize navigate
  
  // Assume sitterId is available in your component or passed as a prop
  const sitterId = localStorage.getItem('sitterId'); // Replace this with actual sitter ID

  useEffect(() => {
    if (owners) {
      const allPets = owners.flatMap((owner: Owner) => owner.pets);
      const filteredPets = allPets.filter((pet: Pet) => pet.openbooking === "yes" && pet.booked === "no");
      setPets(filteredPets);
    }
  }, [owners]);

  // Handle View Details
  const handleViewDetails = (pet: Pet) => {
    const owner = owners?.find((owner: Owner) => owner.pets.includes(pet)) || null;
    setSelectedPet(pet);
    setSelectedOwner(owner);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setSelectedOwner(null);
  };

  // Handle booking
  const handleBookNow = () => {
    if (selectedPet && selectedOwner) {
      const bookingData = {
        ownerId: selectedOwner._id, // You may need to use owner ID here
        sitterId: sitterId, // Use the sitter ID here
        petId: selectedPet._id, // You may need to use pet ID here
        startDate: new Date().toISOString(), // Adjust start date based on your requirements
        endDate: new Date().toISOString(), // Adjust end date based on your requirements
        totalPrice: 100, // You can calculate this based on your logic
      };
  
      // Console log to inspect what data is being passed
      console.log("Booking Data:", bookingData);
  
      createBooking(bookingData); // Call the mutation to create a booking
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading pets</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pet Sitter Dashboard</h1>

      <div>
        <h2 className="text-2xl mb-4">Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet: Pet, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src={pet.petimage || "https://via.placeholder.com/150"}
                alt={pet.petname}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{pet.petname}</h2>
              <p className="text-gray-600">{pet.type}</p>
              <p className="mt-2 text-sm text-gray-500">{pet.petinfo}</p>

              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewDetails(pet)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation to My Bookings */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/mybookings")} // Navigate to "My Bookings"
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Go to My Bookings
        </button>
      </div>

      {/* Modal for viewing pet and owner details */}
      {selectedPet && selectedOwner && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[80%] max-w-4xl flex flex-col md:flex-row shadow-2xl">
            {/* Left Side: Pet Details */}
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">{selectedPet.petname}</h2>
              <img
                src={selectedPet.petimage || "https://via.placeholder.com/150"}
                alt={selectedPet.petname}
                className="w-48 h-48 object-cover rounded-lg shadow-lg mb-4"
              />
              <p className="text-lg font-medium text-gray-700">{selectedPet.type}</p>
              <p className="mt-2 text-sm text-gray-500 text-center">{selectedPet.petinfo}</p>
            </div>

            {/* Right Side: Owner Details */}
            <div className="w-full md:w-1/2 p-4 border-l border-gray-300 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Owner Details</h3>
              <div className="text-gray-700 space-y-2">
                <p><strong>Name:</strong> {selectedOwner.name}</p>
                <p><strong>Email:</strong> {selectedOwner.email}</p>
                <p><strong>Phone:</strong> {selectedOwner.phone}</p>
                <p><strong>Address:</strong> {selectedOwner.address}</p>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap justify-between gap-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full md:w-auto"
                  onClick={handleBookNow}  // Trigger booking on click
                >
                  Book Now
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full md:w-auto">
                  Message Owner
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full md:w-auto"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetSitterDashboard;
