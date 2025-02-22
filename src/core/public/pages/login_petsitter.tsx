// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useSitterLogin } from './query'; // Import useLogin mutation

// const OwnerLogin: React.FC = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const loginMutation = useSitterLogin(); // Initialize the login mutation

//   const onSubmit = (data: any) => {
//     loginMutation.mutate(data, {
//       onSuccess: (response) => {
//         console.log('Login Success:', response);
//         localStorage.setItem('token', response.data.token); // Store token in localStorage
//         navigate('/sitterdashboard'); // Navigate to the Dashboard
//       },
//       onError: (error) => {
//         console.error('Login Failed:', error);
//       },
//     });
//   };

//   return (
//     <div className="h-screen w-screen bg-[url('./assets/loginsitter.png')] bg-cover bg-center flex justify-start items-center px-16">
//       {/* Glassmorphism effect card with margin */}
//       <div className="flex flex-col gap-4 w-80 p-6 ml-220 mt-20 backdrop-blur-md bg-white/30 rounded-lg shadow-lg">
//         <div className="flex flex-col gap-2">
//           <label htmlFor="email" className="text-black text-sm font-semibold">EMAIL</label>
//           <input 
//             type="email" 
//             placeholder="Enter your email"
//             {...register('email')}
//             className="p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
//           />
          
//           <label htmlFor="password" className="text-black text-sm font-semibold mt-2">PASSWORD</label>
//           <div className="relative">
//             <input 
//               type={showPassword ? 'text' : 'password'} 
//               placeholder="Enter your password"
//               {...register('password')}
//               className="p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
//             />
//             <button 
//               type="button" 
//               onClick={() => setShowPassword(!showPassword)} 
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>
//         </div>

//         <a href="#" className="text-black text-sm hover:underline self-end">Forgot Password?</a>
        
//         {/* Display error message if login fails */}
//         {loginMutation.isError && (
//           <div className="text-red-500 text-center mb-4">
//             Login failed. Please check your credentials.
//           </div>
//         )}

//         <button 
//           type="submit" 
//           onClick={handleSubmit(onSubmit)}
//           className="bg-[#FFB98D] hover:bg-[#FF9F72] text-white font-semibold py-3 px-6 rounded-full transition duration-200">
//           Login
//         </button>
//         <p className="text-center text-black mt-4">
//           Don't have an account?{' '}
//           <a href="/sitterregister" className="text-[#E5AB87] font-semibold hover:underline">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OwnerLogin;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSitterLogin } from './query'; // Import useLogin mutation

const OwnerLogin: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const loginMutation = useSitterLogin(); // Initialize the login mutation

  const onSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Login Success:', response);
        localStorage.setItem('token', response.data.token); // Store token in localStorage

        // Check if the sitterId exists in the response
        if (response.data.sitterId) {
          localStorage.setItem('sitterId', response.data.sitterId); // Store sitterId in localStorage
          console.log('Sitter ID:', response.data.sitterId);
        }

        navigate('/sitterdashboard'); // Navigate to the Dashboard
      },
      onError: (error) => {
        console.error('Login Failed:', error);
      },
    });
  };

  return (
    <div className="h-screen w-screen bg-[url('./assets/loginsitter.png')] bg-cover bg-center flex justify-start items-center px-16">
      {/* Glassmorphism effect card with margin */}
      <div className="flex flex-col gap-4 w-80 p-6 ml-220 mt-20 backdrop-blur-md bg-white/30 rounded-lg shadow-lg">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-black text-sm font-semibold">EMAIL</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            {...register('email')}
            className="p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          <label htmlFor="password" className="text-black text-sm font-semibold mt-2">PASSWORD</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password"
              {...register('password')}
              className="p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <a href="#" className="text-black text-sm hover:underline self-end">Forgot Password?</a>
        
        {/* Display error message if login fails */}
        {loginMutation.isError && (
          <div className="text-red-500 text-center mb-4">
            Login failed. Please check your credentials.
          </div>
        )}

        <button 
          type="submit" 
          onClick={handleSubmit(onSubmit)}
          className="bg-[#FFB98D] hover:bg-[#FF9F72] text-white font-semibold py-3 px-6 rounded-full transition duration-200">
          Login
        </button>
        <p className="text-center text-black mt-4">
          Don't have an account?{' '}
          <a href="/sitterregister" className="text-[#E5AB87] font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;

