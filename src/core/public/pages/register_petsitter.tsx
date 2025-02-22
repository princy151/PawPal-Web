import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // For redirection
import { useSitterRegister } from './query'; // Assuming you have a custom hook for sitter registration

const SitterRegister: React.FC = () => {
  const { register, handleSubmit } = useForm(); // Form hooks
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // State to store user profile image
  const sitterRegisterMutation = useSitterRegister(); // Register mutation hook
  const navigate = useNavigate(); // Hook for redirection

  const onSubmit = (data: any) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
      image: profilePicture, // Profile image (base64 string)
    };

    // Call the sitter registration mutation
    sitterRegisterMutation.mutate(formData, {
      onSuccess: (response) => {
        console.log("Registration successful:", response.data);
        navigate("/loginsitter"); // Redirect after successful registration
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    });
  };

  // Handle profile picture upload and convert to base64 string
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string); // Save the base64 string
      };
      reader.readAsDataURL(file); // Convert file to data URL (base64 string)
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/registerbg2.png')" // Make sure this path is correct
      }}
    >
      <div className="flex items-center justify-center min-h-screen"> {/* Dark overlay for readability */}
      <div
        className="bg-white/60 p-8 rounded-2xl w-[480px] text-black"
        style={{ boxShadow: "0px 4px 10px rgba(255, 185, 141, 0.5)" }}
      >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-6">
              <label htmlFor="profilePicture" className="cursor-pointer">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-white/50 border-4 border-white flex items-center justify-center text-black font-semibold">
                    Upload
                  </div>
                )}
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>

            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50"
            />

            <input
              type="text"
              {...register("address")}
              placeholder="Address"
              className="p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50"
            />

            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50"
            />

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50"
            />

            <input
              type="text"
              {...register("phone")}
              placeholder="Phone"
              className="p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50"
            />

            <button
              type="submit"
              className="mt-6 py-3 rounded-full hover:bg-orange-400 transition-all mx-auto w-32 text-white"
              style={{ backgroundColor: '#FFB98D' }}            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-black mt-6">
            Already have an account?{" "}
            <a href="/loginsitter" className="text-[#E5AB87] font-semibold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitterRegister;
