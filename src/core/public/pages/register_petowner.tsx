import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegister } from './query';

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [pets, setPets] = useState<any[]>([]);
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const onSubmit = (data: any) => {
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: data.address,
      image: profilePicture,
      pets: pets.map((pet) => ({
        petname: pet.petName,
        type: pet.petType,
        petimage: pet.petImage,
        petinfo: pet.petDescription,
      }))
    };

    registerMutation.mutate(formData, {
      onSuccess: () => navigate("/loginowner"),
      onError: (error) => console.error("Registration failed:", error),
    });
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePetImageChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPets = [...pets];
        updatedPets[index].petImage = reader.result as string;
        setPets(updatedPets);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPet = () => setPets([...pets, { petName: "", petType: "", petImage: null, petDescription: "" }]);
  const removePet = (index: number) => setPets(pets.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('src/assets/registerbg2.png')` }}>
      
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl w-[480px] text-black border border-white/20"
      style={{ boxShadow: "0px 4px 10px rgba(255, 185, 141, 0.5)" }}>
        {/* Step 1: User Details */}
        {step === 1 && (
          <form onSubmit={handleSubmit(() => setStep(2))} className="flex flex-col space-y-4">
            <div className="flex flex-col items-center mb-6">
              <label htmlFor="profilePicture" className="cursor-pointer">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-white/30 border-4 border-white flex items-center justify-center text-black font-semibold">
                    Upload
                  </div>
                )}
              </label>
              <input type="file" id="profilePicture" accept="image/*" onChange={handleProfilePictureChange} className="hidden" />
            </div>

            <input type="text" {...register("name")} placeholder="Name"
              className="p-3 rounded-lg bg-white/30 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50" />
            <input type="text" {...register("phone")} placeholder="Phone Number"
              className="p-3 rounded-lg bg-white/30 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50" />
            <input type="text" {...register("address")} placeholder="Address"
              className="p-3 rounded-lg bg-white/30 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50" />
            <input type="email" {...register("email")} placeholder="Email"
              className="p-3 rounded-lg bg-white/30 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50" />
            <input type="password" {...register("password")} placeholder="Password"
              className="p-3 rounded-lg bg-white/30 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-black/50" />

            <button type="submit" className="mt-6 bg-[#FFB98D] py-3 rounded-full hover:bg-opacity-80 transition-all mx-auto w-32 text-white">
              Next
            </button>
          </form>
        )}

        {/* Step 2: Pet Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            {pets.map((pet, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <input type="text" value={pet.petName} onChange={(e) => {
                  const updatedPets = [...pets];
                  updatedPets[index].petName = e.target.value;
                  setPets(updatedPets);
                }} placeholder="Pet Name" className="p-3 rounded-lg bg-white/30 border border-gray-300 placeholder-black/50" />

                <input type="text" value={pet.petType} onChange={(e) => {
                  const updatedPets = [...pets];
                  updatedPets[index].petType = e.target.value;
                  setPets(updatedPets);
                }} placeholder="Pet Type" className="p-3 rounded-lg bg-white/30 border border-gray-300 placeholder-black/50" />

                <input type="text" value={pet.petDescription} onChange={(e) => {
                  const updatedPets = [...pets];
                  updatedPets[index].petDescription = e.target.value;
                  setPets(updatedPets);
                }} placeholder="Pet Description" className="p-3 rounded-lg bg-white/30 border border-gray-300 placeholder-black/50" />

                <div className="flex flex-col items-center mb-6">
                  <label htmlFor={`petImage-${index}`} className="cursor-pointer">
                    {pet.petImage ? (
                      <img src={pet.petImage} alt="Pet" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-white/30 border-4 border-white flex items-center justify-center text-black font-semibold">
                        Pet Image
                      </div>
                    )}
                  </label>
                  <input type="file" id={`petImage-${index}`} accept="image/*" onChange={handlePetImageChange(index)} className="hidden" />
                </div>

                <button type="button" onClick={() => removePet(index)}
                  className="bg-[#D26B6D] py-3 rounded-full text-white mt-2">
                  Remove Pet
                </button>
              </div>
            ))}

            <button type="button" onClick={addPet}
              className="mt-6 bg-[#7C9878] py-3 rounded-full text-white">
              Add Pet
            </button>

            <button type="submit"
              className="mt-6 bg-[#FFB98D] py-3 rounded-full hover:bg-opacity-80 transition-all mx-auto w-32 text-white">
              Register
            </button>
          </form>
        )}

        <p className="text-center text-black mt-6">
          Already have an account?{" "}
          <a href="/loginowner" className="text-[#E5AB87] font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
