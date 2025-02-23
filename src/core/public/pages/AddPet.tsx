// import React, { useEffect, useState } from "react";
// import { useGetOwner, useAddPet, useUpdatePet, useDeletePet } from "./query";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ADDPET: React.FC = () => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [petName, setPetName] = useState<string>("");
//   const [petType, setPetType] = useState<string>("");
//   const [petImage, setPetImage] = useState<string | null>(null);
//   const [petInfo, setPetInfo] = useState<string>("");

//   const [editingPet, setEditingPet] = useState<{ id: string; petname: string; type: string; petimage: string | null; petinfo: string } | null>(null);

//   const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

//   const { data: ownerData, isLoading, isError, refetch } = useGetOwner(userId || "");

//   const addPetMutation = useAddPet();
//   const updatePetMutation = useUpdatePet();
//   const deletePetMutation = useDeletePet();

//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     setUserId(id);
//   }, []);

  

//   if (isLoading) return <div className="text-center">Loading owner data...</div>;
//   if (isError) return <div className="text-center text-red-500">Error loading owner data</div>;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (editingPet) {
//       updatePetMutation.mutate({
//         ownerId: userId || "",
//         petId: editingPet.id,
//         petname: petName,
//         type: petType,
//         petimage: petImage,
//         petinfo: petInfo,
//       }, {
//         onSuccess: () => {
//           toast.success("Pet updated successfully!");
//           refetch(); // Refresh data after update
//         },
//         onError: () => {
//           toast.error("Failed to update pet.");
//         }
//       });
//     } else {
//       addPetMutation.mutate({
//         ownerId: userId || "",
//         petname: petName,
//         type: petType,
//         petimage: petImage,
//         petinfo: petInfo,
//       }, {
//         onSuccess: () => {
//           toast.success("Pet added successfully!");
//           refetch(); // Refresh data after adding
//         },
//         onError: () => {
//           toast.error("Failed to add pet.");
//         }
//       });
//     }

//     setPetName("");
//     setPetType("");
//     setPetImage(null);
//     setPetInfo("");
//     setEditingPet(null);
//   };

//   const handleEdit = (pet: any) => {
//     setPetName(pet.petname);
//     setPetType(pet.type);
//     setPetImage(pet.petimage);
//     setPetInfo(pet.petinfo);
//     setEditingPet({
//       id: pet._id,
//       petname: pet.petname,
//       type: pet.type,
//       petimage: pet.petimage,
//       petinfo: pet.petinfo,
//     });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPetImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDelete = (petId: string) => {
//     if (userId) {
//       deletePetMutation.mutate({
//         ownerId: userId,
//         petId: petId,
//       }, {
//         onSuccess: () => {
//           toast.success("Pet deleted successfully!");
//           refetch(); // Refresh data after deletion
//         },
//         onError: () => {
//           toast.error("Failed to delete pet.");
//         }
//       });
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-3xl font-bold text-center mb-6">Owner's Pets</h2>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
//         <div>
//           <label htmlFor="petname" className="block text-sm font-semibold text-gray-700">Pet Name</label>
//           <input
//             type="text"
//             id="petname"
//             value={petName}
//             onChange={(e) => setPetName(e.target.value)}
//             required
//             className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="type" className="block text-sm font-semibold text-gray-700">Pet Type</label>
//           <input
//             type="text"
//             id="type"
//             value={petType}
//             onChange={(e) => setPetType(e.target.value)}
//             required
//             className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="petimage" className="block text-sm font-semibold text-gray-700">Pet Image (Upload)</label>
//           <input
//             type="file"
//             id="petimage"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {petImage && (
//           <div className="mt-4">
//             <img src={petImage} alt="Uploaded Pet" className="w-40 h-40 object-cover rounded-full mx-auto" />
//           </div>
//         )}

//         <div>
//           <label htmlFor="petinfo" className="block text-sm font-semibold text-gray-700">Pet Info</label>
//           <textarea
//             id="petinfo"
//             value={petInfo}
//             onChange={(e) => setPetInfo(e.target.value)}
//             required
//             className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <button type="submit" className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//           {editingPet ? "Update Pet" : "Add Pet"}
//         </button>
//       </form>

//       <div className="mt-8">
//         {ownerData?.pets && ownerData.pets.length > 0 ? (
//           <div className="space-y-6">
//             {ownerData.pets.map((pet: any, index: number) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
//                 <h3 className="text-xl font-semibold">{pet.petname}</h3>
//                 <p>Type: {pet.type}</p>
//                 <p>Info: {pet.petinfo}</p>
//                 {pet.petimage && <img src={pet.petimage} alt={pet.petname} className="w-40 h-40 object-cover rounded-full" />}
//                 <button
//                   onClick={() => handleEdit(pet)}
//                   className="mt-4 text-indigo-600 hover:text-indigo-700"
//                 >
//                   Edit Pet
//                 </button>
//                 <button
//                   onClick={() => handleDelete(pet._id)}
//                   className="mt-4 text-red-600 hover:text-red-700"
//                 >
//                   Delete Pet
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No pets available for this owner.</p>
//         )}
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default ADDPET;

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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Owner's Pets</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
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

      <div className="mt-8">
        {ownerData?.pets && ownerData.pets.length > 0 ? (
          <div className="space-y-6">
            {ownerData.pets.map((pet: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <h3 className="text-xl font-semibold">{pet.petname}</h3>
                <p>Type: {pet.type}</p>
                <p>Info: {pet.petinfo}</p>
                {pet.petimage && <img src={pet.petimage} alt={pet.petname} className="w-40 h-40 object-cover rounded-full" />}
                
                {/* Toggle Open Booking */}
                <div>
                  <label htmlFor={`openBooking-${pet._id}`} className="text-sm font-semibold text-gray-700">Open Booking</label>
                  <input
                    type="checkbox"
                    id={`openBooking-${pet._id}`}
                    checked={pet.openbooking === "yes"}
                    onChange={() => handleToggleOpenBooking(pet._id, pet.openbooking)}
                    className="ml-2"
                  />
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleEdit(pet)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Edit Pet
                  </button>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete Pet
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
