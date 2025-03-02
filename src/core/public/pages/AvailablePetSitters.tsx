// import React from "react";
// import { useGetSitters } from "./query";
// import { Link } from "react-router-dom";

// const AvailablePetSitters: React.FC = () => {
//   const { data: petSitters, isLoading, error } = useGetSitters();

//   if (isLoading) return <p>Loading pet sitters...</p>;
//   if (error) return <p>Error loading pet sitters</p>;

//   return (
//     <div className="p-8" style={{ backgroundColor: "#FFE7D9" }}>
//       <h3 className="text-3xl font-semibold text-gray-800 mb-6">Available Pet Sitters</h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {petSitters.map((sitter: any, index: number) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             style={{ backgroundColor: "white" }}
//           >
//             <img
//               src={sitter.image || "https://via.placeholder.com/150"}
//               alt={sitter.name}
//               className="w-full h-56 object-cover rounded-t-2xl"
//             />
//             <div className="p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-2">{sitter.name}</h4>
//               <p className="text-gray-600 text-lg mb-4">Address: {sitter.address || "N/A"}</p>
//               <Link
//                 to={`/sitter-details/${sitter._id}`}
//                 className="bg-brown-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-brown-500 transition-colors duration-300"
//                 style={{ backgroundColor: "#8B3A2F" }}
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailablePetSitters;

import React from "react";
import { useGetSitters } from "./query";
import { Link } from "react-router-dom";

const AvailablePetSitters: React.FC = () => {
  const { data: petSitters, isLoading, error } = useGetSitters();

  if (isLoading) return <p>Loading pet sitters...</p>;
  if (error) return <p>Error loading pet sitters</p>;

  return (
    <div className="p-8 bg-[#FFE7D9]">
      <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center animate__animated animate__fadeInUp">
        Available Pet Sitters
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {petSitters.map((sitter: any, index: number) => (
          <div
            key={index}
            className="transform transition-transform duration-300 hover:scale-105 hover:rotate-3d"
          >
            <div
              className="bg-white bg-opacity-20 backdrop-blur-xl rounded-4xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={sitter.image || "https://via.placeholder.com/150"}
                alt={sitter.name}
                className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 transform hover:scale-105"
              />
              <div className="p-6 flex flex-col justify-between h-full space-y-4">
                <div>
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2 uppercase">
                    {sitter.name}
                  </h4>
                  <p className="text-gray-600 text-lg">{sitter.address || "Address: N/A"}</p>
                </div>
                <Link
                  to={`/sitter-details/${sitter._id}`}
                  className="bg-[#8B3A2F] text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-[#7A2E26] transition-colors duration-300 w-full text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePetSitters;
