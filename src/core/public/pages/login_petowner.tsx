import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLogin } from './query'; // Import useLogin mutation

const OwnerLogin: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const loginMutation = useLogin(); // Initialize the login mutation

  const onSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Login Success:', response);
        localStorage.setItem('token', response.data.token);  // Store token
        localStorage.setItem('userId', response.data.userId); // Store user ID
  
        navigate('/ownerdashboard'); // Navigate to the Dashboard
      },
      onError: (error) => {
        console.error('Login Failed:', error);
      },
    });
  };

  return (
    <div className="h-screen w-screen bg-[url('./assets/Loginowner.png')] bg-cover bg-center flex justify-start items-center px-16">
      <div className="flex flex-col gap-4 w-80 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg ml-55 mt-25"> {/* Shifted the card to the right */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-black text-sm font-semibold">EMAIL</label> {/* Color changed to black */}
          <input 
            type="email" 
            placeholder="Enter your email"
            {...register('email')}
            className="p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          <label htmlFor="password" className="text-black text-sm font-semibold mt-2">PASSWORD</label> {/* Color changed to black */}
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"> {/* Color changed to black */}
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <a href="#" className="text-black text-sm hover:underline self-end">Forgot Password?</a> {/* Color changed to black */}

        {/* Display error message if login fails */}
        {loginMutation.isError && (
          <div className="text-red-500 text-center mb-4">
            Login failed. Please check your credentials.
          </div>
        )}

        <button 
          type="submit" 
          onClick={handleSubmit(onSubmit)}
          className="bg-[#FFB98D] hover:bg-[#FF9F72] text-white font-semibold py-3 px-0 rounded-full transition duration-200">
          Login
        </button>
        <p className="text-center text-black mt-4">
          Don't have an account?{' '}
          <a href="/ownerregister" className="text-[#E5AB87] font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;
