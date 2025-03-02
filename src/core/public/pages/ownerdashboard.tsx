import { useState } from 'react';
import { FaDog, FaRegUser, FaPaw, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // For animations
import AvailablePetSitters from './AvailablePetSitters';
import AddPet from './AddPet';
import OwnerBookings from './ownerbookings';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('petSitters'); // State to manage the active component
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Navigate to the homepage
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 h-full bg-[#8B3A2F] text-white p-6 flex flex-col"> {/* Sidebar full height and brownish-red background */}
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
              onClick={() => setActiveComponent('addPet')}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-[#6A2C20]"
              whileHover={{ scale: 1.05 }} // Hover animation
            >
              <FaDog size={20} />
              <span>Manage Pets</span>
            </motion.button>
          </li>
          <li className="mb-4">
            <motion.button
              onClick={() => setActiveComponent('bookings')}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-[#6A2C20]"
              whileHover={{ scale: 1.05 }} // Hover animation
            >
              <FaPaw size={20} />
              <span>My Bookings</span>
            </motion.button>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-auto"> {/* Push logout button to the bottom */}
          <motion.button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-300 ease-in-out w-full text-left hover:bg-red-700 bg-red-750" // Red background with hover effect
            whileHover={{ scale: 1.05 }} // Hover animation
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
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
          {activeComponent === 'addPet' && <AddPet />}
          {activeComponent === 'bookings' && <OwnerBookings />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
