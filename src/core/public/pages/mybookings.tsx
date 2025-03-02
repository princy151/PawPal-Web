import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBookingsBySitter, useUpdateBookingStatus, useDeleteBooking, useGetOwners, useUpdateBookingDates } from "./query";
import { toast } from "react-toastify";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const MyBookings: React.FC = () => {
  const [sitterId, setSitterId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);
  const [status, setStatus] = useState<string>();
  const navigate = useNavigate();

  // Query hooks from query.tsx
  const { data: bookings, isLoading, isError, refetch } = useGetBookingsBySitter(sitterId || "");
  const { data: owners } = useGetOwners();
  const { mutate: updateBookingStatus } = useUpdateBookingStatus();
  const { mutate: deleteBooking } = useDeleteBooking();
  const { mutate: updateBookingDates } = useUpdateBookingDates();
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const loggedInSitterId = localStorage.getItem("sitterId");
    if (loggedInSitterId) {
      setSitterId(loggedInSitterId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const getOwnerName = (ownerId: string) => {
    const owner = owners?.find((o: any) => o._id === ownerId);
    return owner?.name || "Unknown Owner";
  };

  const getPetName = (ownerId: string, petId: string) => {
    const owner = owners?.find((o: any) => o._id === ownerId);
    const pet = owner?.pets?.find((p: any) => p._id === petId);
    return pet?.petname || "Unknown Pet";
  };

  const handleStatusUpdate = (bookingId: string, status: string) => {
    if (status === "select") {
      toast.error("Please select a valid status");
      return;
    }
  
    updateBookingStatus(
      { bookingId, status },
      {
        onSuccess: () => {
          toast.success(`Booking status updated to ${status}`);
          refetch(); // Re-fetch the bookings to update the page with new data
          setStatus("select"); // Reset dropdown to "Select New Status"
        },
        onError: () => {
          toast.error("Failed to update booking status");
        },
      }
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    deleteBooking(bookingId, {
      onSuccess: () => {
        toast.success("Booking deleted successfully");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete booking");
      },
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const selectedDateString = date.toLocaleDateString();

    const filtered = bookings?.filter((booking: any) => {
      const bookingStartDate = new Date(booking.startDate).toLocaleDateString();
      return bookingStartDate === selectedDateString;
    });
    setFilteredBookings(filtered ?? []);
  };

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
  };

  const handleSaveBooking = () => {
    if (!editingBooking) return;
  
    updateBookingDates(
      {
        bookingId: editingBooking._id,
        startDate: editingBooking.startDate,
        endDate: editingBooking.endDate,
      },
      {
        onSuccess: () => {
          toast.success("Booking updated successfully");
          setEditingBooking(null);
          refetch();
        },
        onError: () => {
          toast.error("Failed to update booking");
        },
      }
    );
  };

  if (isLoading) return <div>Loading bookings...</div>;
  if (isError) return <div>Error loading bookings</div>;

  const bookingsList = bookings ?? [];
  const events = bookingsList.map((booking: any) => ({
    title: `${getPetName(booking.ownerId, booking.petId)} - ${getOwnerName(booking.ownerId)}`,
    start: new Date(booking.startDate),
    end: new Date(booking.endDate),
    status: booking.status,
    bookingId: booking._id,
  }));

  // Event styling function
  const eventStyleGetter = (event: any) => {
    const style = {
      backgroundColor: "#7F410B", // Match the button color
      color: "white", // Text color
      borderRadius: "4px",
      opacity: 0.8,
    };
    return {
      style,
    };
  };

  return (
    <div className="min-h-screen bg-[#FFEADD]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/sitterdashboard")}
          className="bg-[#7F410B] text-white font-bold py-2 px-6 ml-220 rounded-md mb-6 transition transform hover:scale-105"
        >
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">My Bookings</h1>

        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          {/* Calendar */}
          <div className="flex-shrink-0 w-full md:w-2/5 bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={(event) => {
                setSelectedDate(event.start);
                const filtered = bookings?.filter(
                  (booking: any) =>
                    new Date(booking.startDate).toLocaleDateString() === event.start.toLocaleDateString()
                );
                setFilteredBookings(filtered ?? []);
              }}
              style={{ height: 400 }} // Fixed height for the calendar
              eventPropGetter={eventStyleGetter} // Apply custom event styles
            />
          </div>

          {/* Bookings Table */}
          <div className="flex-grow bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Bookings for {selectedDate?.toLocaleDateString() || "Select a date"}
            </h2>
            {filteredBookings.length === 0 ? (
              <p className="text-gray-500">No bookings for this date</p>
            ) : (
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 border-b">Owner Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 border-b">Pet Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 border-b">Start Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 border-b">End Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking: any) => (
                      <tr
                        key={booking._id}
                        className="transition transform hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">{getOwnerName(booking.ownerId)}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">{getPetName(booking.ownerId, booking.petId)}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">{new Date(booking.startDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">{new Date(booking.endDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b flex flex-col space-y-4">
                              <select
                                className="px-4 py-2 border rounded-md"
                                value={booking.status || "select"} // Automatically show the current status
                                onChange={(e) => {
                                  setStatus(e.target.value); // Temporarily update the status in the dropdown
                                  handleStatusUpdate(booking._id, e.target.value); // Immediately call the update handler
                                }}
                              >
                                <option value="select">Select New Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md transition transform hover:scale-105"
                                onClick={() => handleDeleteBooking(booking._id)}
                              >
                                Delete
                              </button>
                              <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md transition transform hover:scale-105"
                                onClick={() => handleEditBooking(booking)}
                              >
                                Edit
                              </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Edit Booking Modal */}
        {editingBooking && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Booking</h3>
              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  value={new Date(editingBooking.startDate).toLocaleDateString("en-CA")}
                  onChange={(e) => setEditingBooking({ ...editingBooking, startDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4">
                <label>End Date:</label>
                <input
                  type="date"
                  value={new Date(editingBooking.endDate).toLocaleDateString("en-CA")}
                  onChange={(e) => setEditingBooking({ ...editingBooking, endDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBooking}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
