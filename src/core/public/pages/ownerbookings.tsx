import { useGetBookingsByOwner, useGetOwners, useGetSitters, useDeleteBooking } from "./query";
import { useEffect, useState } from "react";

const OwnerBookings = () => {
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const { data: owners } = useGetOwners();
  const { data: sitters } = useGetSitters();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setOwnerId(storedUserId);
    }
  }, []);

  const { data: bookings, isLoading, error, refetch } = useGetBookingsByOwner(ownerId || "");
  const { mutate: deleteBooking } = useDeleteBooking();

  if (isLoading) return <p className="text-center text-xl text-gray-500">Loading bookings...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error loading bookings.</p>;

  const getOwnerName = (ownerId: string) => {
    const owner = owners?.find((o: any) => o._id === ownerId);
    return owner?.name || "Unknown Owner";
  };

  const getPetName = (ownerId: string, petId: string) => {
    const owner = owners?.find((o: any) => o._id === ownerId);
    const pet = owner?.pets?.find((p: any) => p._id === petId);
    return pet?.petname || "Unknown Pet";
  };

  const getSitterName = (sitterId: string) => {
    const sitter = sitters?.find((s: any) => s._id === sitterId);
    return sitter?.name || "Not Assigned";
  };

  const handleDelete = (bookingId: string) => {
    deleteBooking(bookingId, {
      onSuccess: () => {
        refetch();
        alert('Booking deleted successfully');
      },
      onError: () => {
        alert('Failed to delete booking');
      }
    });
  };

  return (
    <div className=" min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">My Bookings</h2>
      {bookings?.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings?.map((booking: any, index: number) => (
            <div
              key={booking._id || `booking-${index}`}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all"
            >
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-700"><strong>Pet Name:</strong> {getPetName(booking.ownerId, booking.petId)}</p>
                {/* <p className="text-lg font-medium text-gray-700"><strong>Owner Name:</strong> {getOwnerName(booking.ownerId)}</p> */}
                <p className="text-lg font-medium text-gray-700"><strong>Sitter Name:</strong> {getSitterName(booking.sitterId || "")}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600"><strong>Start Date:</strong> {booking.startDate}</p>
                <p className="text-sm text-gray-600"><strong>End Date:</strong> {booking.endDate}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {booking.status}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  Delete Booking
                </button>
                <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerBookings;
