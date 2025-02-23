import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBookingsBySitter, useUpdateBookingStatus, useGetOwners } from "./query";
import { toast } from "react-toastify";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const MyBookings: React.FC = () => {
  const [sitterId, setSitterId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  const { data: bookings, isLoading, isError, refetch } = useGetBookingsBySitter(sitterId || "");
  const { data: owners } = useGetOwners();
  const { mutate: updateBookingStatus } = useUpdateBookingStatus();
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
    updateBookingStatus({ bookingId, status });
    toast.success(`Booking status updated to ${status}`);
    refetch();
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">My Bookings</h1>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Calendar */}
        <div className="flex-shrink-0 w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
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
            style={{ height: 400 }}
          />
        </div>

        {/* Bookings Table */}
        <div className="flex-grow bg-white shadow-md rounded-lg p-4">
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Owner Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Pet Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Start Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">End Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking: any) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 text-sm text-gray-700 border-b">{getOwnerName(booking.ownerId)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-b">{getPetName(booking.ownerId, booking.petId)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-b">{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-b">{new Date(booking.endDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-b">{booking.status}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-b">
                        {["pending", "confirmed", "completed", "cancelled"].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusUpdate(booking._id, status)}
                            className={`px-4 py-2 m-1 rounded ${
                              booking.status === status ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
                            }`}
                            disabled={booking.status === status}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
