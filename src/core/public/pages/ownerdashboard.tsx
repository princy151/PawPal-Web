import { useState } from 'react';
import { FaRegCalendarAlt, FaRegUser, FaPlusCircle, FaEnvelope } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // For animations
import AvailablePetSitters from './AvailablePetSitters';
import AppointmentCalendar from './AppointmentCalender';
import AddPet from './AddPet';
import Messages from './messages';

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('petSitters'); // State to manage the active component

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 h-full bg-[#8B3A2F] text-white p-6"> {/* Sidebar full height and brownish-red background */}
        <h2 className="text-2xl font-semibold mb-8">PawPal</h2>
        <ul>
          <li className="mb-4">
            <motion.button
              onClick={() => setActiveComponent('petSitters')}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-[#6A2C20]"
              whileHover={{ scale: 1.05 }} // Hover animation
            >
              <FaRegUser size={20} />
              <span>Pet Sitters</span>
            </motion.button>
          </li>
          <li className="mb-4">
            <motion.button
              onClick={() => setActiveComponent('appointments')}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-[#6A2C20]"
              whileHover={{ scale: 1.05 }} // Hover animation
            >
              <FaRegCalendarAlt size={20} />
              <span>Appointments</span>
            </motion.button>
          </li>
          <li className="mb-4">
            <motion.button
              onClick={() => setActiveComponent('addPet')}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-[#6A2C20]"
              whileHover={{ scale: 1.05 }} // Hover animation
            >
              <FaPlusCircle size={20} />
              <span>Add Pet</span>
            </motion.button>
          </li>
          <li className="mb-4">
            <motion.button
              onClick={() => setActiveComponent('messages')}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-[#6A2C20]"
              whileHover={{ scale: 1.05 }} // Hover animation
            >
              <FaEnvelope size={20} />
              <span>Messages</span>
            </motion.button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#FFE7D9] overflow-auto"> {/* Main content with cream background */}
        {/* Animated component change */}
        <motion.div
          key={activeComponent}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {activeComponent === 'petSitters' && <AvailablePetSitters />}
          {activeComponent === 'appointments' && <AppointmentCalendar />}
          {activeComponent === 'addPet' && <AddPet />}
          {activeComponent === 'messages' && <Messages />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
