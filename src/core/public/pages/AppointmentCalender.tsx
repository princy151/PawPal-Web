import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the calendar's default CSS
import { Link } from "react-router-dom"; // For navigation

const localizer = momentLocalizer(moment);

const AppointmentCalendar: React.FC = () => {
  // Sample pet sitters data
  const petSitters = [
    {
      id: 1,
      name: "John Doe",
      availableSlots: [
        { start: new Date(2025, 1, 19, 9, 0), end: new Date(2025, 1, 19, 12, 0) },
        { start: new Date(2025, 1, 20, 13, 0), end: new Date(2025, 1, 20, 16, 0) }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      availableSlots: [
        { start: new Date(2025, 1, 19, 10, 0), end: new Date(2025, 1, 19, 14, 0) },
        { start: new Date(2025, 1, 21, 8, 0), end: new Date(2025, 1, 21, 12, 0) }
      ]
    }
  ];

  // Convert pet sitters' availability to events
  const events = petSitters.flatMap((sitter) =>
    sitter.availableSlots.map((slot) => ({
      title: sitter.name,
      start: slot.start,
      end: slot.end,
      sitterId: sitter.id, // Store sitter ID to link to their details
    }))
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSitters, setAvailableSitters] = useState<string[]>([]);

  const handleSelectSlot = (slotInfo: any) => {
    const selectedDate = slotInfo.start;
    setSelectedDate(selectedDate);

    // Filter sitters who are available on the selected date
    const available = petSitters.filter((sitter) =>
      sitter.availableSlots.some(
        (slot) =>
          slot.start <= selectedDate && selectedDate <= slot.end
      )
    );
    setAvailableSitters(available.map((sitter) => sitter.name));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Appointment Calendar</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        selectable
        style={{ height: 500, width: "100%" }}
      />

      {selectedDate && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Available Sitters on {selectedDate.toDateString()}:</h4>
          {availableSitters.length > 0 ? (
            <ul>
              {availableSitters.map((sitterName, index) => (
                <li key={index} className="my-2">
                  <Link
                    to={`/pet-sitter/${sitterName.toLowerCase().replace(" ", "-")}`} // Link to sitter details page
                    className="text-blue-600 hover:underline"
                  >
                    {sitterName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sitters are available on this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
