import React, { useEffect, useState } from "react";
import { useGetOwner, useAddPet, useUpdatePet, useDeletePet, useToggleOpenBooking } from "./query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ADDPET: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>("");
  const [petType, setPetType] = useState<string>("");
  const [petImage, setPetImage] = useState<string | null>(null);
  const [petInfo, setPetInfo] = useState<string>("");

  const [editingPet, setEditingPet] = useState<{ id: string; petname: string; type: string; petimage: string | null; petinfo: string } | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const { data: ownerData, isLoading, isError, refetch } = useGetOwner(userId || "");

  const addPetMutation = useAddPet();
  const updatePetMutation = useUpdatePet();
  const deletePetMutation = useDeletePet();
  const toggleOpenBookingMutation = useToggleOpenBooking();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  if (isLoading) return <div className="text-center">Loading owner data...</div>;
  if (isError) return <div className="text-center text-red-500">Error loading owner data</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPet) {
      updatePetMutation.mutate({
        ownerId: userId || "",
        petId: editingPet.id,
        petname: petName,
        type: petType,
        petimage: petImage,
        petinfo: petInfo,
      }, {
        onSuccess: () => {
          toast.success("Pet updated successfully!");
          refetch(); // Refresh data after update
        },
        onError: () => {
          toast.error("Failed to update pet.");
        }
      });
    } else {
      addPetMutation.mutate({
        ownerId: userId || "",
        petname: petName,
        type: petType,
        petimage: petImage,
        petinfo: petInfo,
      }, {
        onSuccess: () => {
          toast.success("Pet added successfully!");
          refetch(); // Refresh data after adding
        },
        onError: () => {
          toast.error("Failed to add pet.");
        }
      });
    }

    setPetName("");
    setPetType("");
    setPetImage(null);
    setPetInfo("");
    setEditingPet(null);
  };

  const handleEdit = (pet: any) => {
    setPetName(pet.petname);
    setPetType(pet.type);
    setPetImage(pet.petimage);
    setPetInfo(pet.petinfo);
    setEditingPet({
      id: pet._id,
      petname: pet.petname,
      type: pet.type,
      petimage: pet.petimage,
      petinfo: pet.petinfo,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (petId: string) => {
    if (userId) {
      deletePetMutation.mutate({
        ownerId: userId,
        petId: petId,
      }, {
        onSuccess: () => {
          toast.success("Pet deleted successfully!");
          refetch(); // Refresh data after deletion
        },
        onError: () => {
          toast.error("Failed to delete pet.");
        }
      });
    }
  };

  const handleToggleOpenBooking = (petId: string, currentStatus: string) => {
    const newStatus = currentStatus === "yes" ? "no" : "yes";
    toggleOpenBookingMutation.mutate({
      ownerId: userId!,
      petId: petId,
    }, {
      onSuccess: () => {
        toast.success(`Booking ${newStatus === "yes" ? "opened" : "closed"} successfully!`);
        refetch(); // Refresh data after updating openBooking status
      },
      onError: () => {
        toast.error("Failed to update booking status.");
      }
    });
  };

  return (
    <div className="flex justify-center items-start p-6 space-x-12">
      {/* Left side: Pet form */}
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Add/Edit Pet</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="petname" className="block text-sm font-semibold text-gray-700">Pet Name</label>
            <input
              type="text"
              id="petname"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700">Pet Type</label>
            <input
              type="text"
              id="type"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="petimage" className="block text-sm font-semibold text-gray-700">Pet Image (Upload)</label>
            <input
              type="file"
              id="petimage"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {petImage && (
            <div className="mt-4">
              <img src={petImage} alt="Uploaded Pet" className="w-40 h-40 object-cover rounded-full mx-auto" />
            </div>
          )}

          <div>
            <label htmlFor="petinfo" className="block text-sm font-semibold text-gray-700">Pet Info</label>
            <textarea
              id="petinfo"
              value={petInfo}
              onChange={(e) => setPetInfo(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button type="submit" className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {editingPet ? "Update Pet" : "Add Pet"}
          </button>
        </form>
      </div>

      {/* Right side: List of Pets */}
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Pets</h2>

        {ownerData?.pets && ownerData.pets.length > 0 ? (
          <div className="space-y-6">
            {ownerData.pets.map((pet: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg space-y-4 text-gray-800">
              {/* Pet Info */}
              <div className="flex items-center space-x-4">
                {pet.petimage && (
                  <img
                    src={pet.petimage}
                    alt={pet.petname}
                    className="w-20 h-20 object-cover rounded-full border-4 border-gray-200 shadow-md"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{pet.petname}</h3>
                  <p className="text-sm text-gray-500">{pet.type}</p>
                </div>
              </div>
            
              {/* Pet Info Text */}
              <div className="text-sm text-gray-600 italic">{pet.petinfo}</div>
            
              {/* Open Booking Toggle */}
              <div className="flex items-center justify-between">

  <button
    onClick={() => handleToggleOpenBooking(pet._id, pet.openbooking)}
    className={`px-6 py-2 rounded-full text-white font-semibold shadow-lg transition ease-in-out duration-300 transform ${pet.openbooking === "yes" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
  >
    {pet.openbooking === "yes" ? "Remove from booking list" : "Click to list for booking"}
  </button>
</div>
            
              {/* Edit & Delete Buttons */}
              <div className="flex space-x-6 justify-end">
                <button
                  onClick={() => handleEdit(pet)}
                  className="text-lg font-bold text-blue-500 hover:text-blue-600 transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="text-lg font-bold text-red-500 hover:text-red-600 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
            
            
            
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No pets available for this owner.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ADDPET;
