import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      password: string;
      address: string;
      image: string | null;
      pets: {
        petname: string;
        type: string;
        petimage: string | null;
        petinfo: string;
      }[]; // Allow multiple pets
    }) => axios.post("http://localhost:3000/api/v1/auth/register", data),
  });
};



export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post("http://localhost:3000/api/v1/auth/login", data);
    },
  });
};

export const useSitterLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post("http://localhost:3000/api/v1/sitter/login", data);
    },
  });
};

export const useSitterRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      address: string;
      image: string | null;
      phone: string;
    }) => axios.post("http://localhost:3000/api/v1/sitter/register", data),
  });
};

export const useGetSitters = () => {
  return useQuery({
    queryKey: ["GET_SITTERS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/v1/sitter/getAllSitters");
      return response.data.data; 
    },
  });
};

// Fetch a single sitter by ID
export const useGetSitter = (id: string) => {
  return useQuery({
    queryKey: ["GET_SITTER", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/sitter/${id}`);
      return response.data.data; // Return the sitter data
    },
  });
};

export const useGetOwners = () => {
  return useQuery({
    queryKey: ["GET_OWNERS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/v1/auth/getAllOwners");
      return response.data.data; 
    },
  });
};

// Fetch a single owner by ID
export const useGetOwner = (id: string) => {
  return useQuery({
    queryKey: ["GET_OWNER", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/auth/${id}`);
      return response.data.data; // Return the sitter data
    },
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationKey: ["CREATE_BOOKING"],
    mutationFn: (data: {
      ownerId: string;
      sitterId: string | null;
      petId: string;
      startDate: string;
      endDate: string;
      totalPrice: number;
    }) => {
      return axios.post("http://localhost:3000/api/v1/booking/create", data);
    },
  });
};

export const useGetBookings = () => {
  return useQuery({
    queryKey: ["GET_BOOKINGS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/v1/bookings");
      return response.data.data; 
    },
  });
};

export const useGetBookingById = (id: string) => {
  return useQuery({
    queryKey: ["GET_BOOKING", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/bookings/${id}`);
      return response.data.data;
    },
  });
};

export const useUpdateBookingStatus = () => {
  return useMutation({
    mutationKey: ["UPDATE_BOOKING_STATUS"],
    mutationFn: (data: { bookingId: string; status: string }) => {
      return axios.patch(
        `http://localhost:3000/api/v1/booking/update/${data.bookingId}`,
        { status: data.status }
      );
    },
  });
};

export const useDeleteBooking = () => {
  return useMutation({
    mutationKey: ["DELETE_BOOKING"],
    mutationFn: (bookingId: string) => {
      return axios.delete(`http://localhost:3000/api/v1/booking/${bookingId}`);
    },
  });
};

export const useGetBookingsBySitter = (sitterId: string) => {
  return useQuery({
    queryKey: ["GET_BOOKINGS_BY_SITTER", sitterId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/booking/sitter/${sitterId}`);
      return response.data.data;
    },
    enabled: !!sitterId, // This ensures the query is triggered only if sitterId is available
  });
};

export const useGetBookingsByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ["GET_BOOKINGS_BY_OWNER", ownerId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/booking/owner/${ownerId}`);
      return response.data.data;
    },
    enabled: !!ownerId, // Ensures the query runs only if ownerId is available
  });
};


// Add Pet
export const useAddPet = () => {
  return useMutation({
    mutationKey: ["ADD_PET"],
    mutationFn: (data: { ownerId: string; petname: string; type: string; petimage: string | null; petinfo: string }) =>
      axios.patch(`http://localhost:3000/api/v1/auth/${data.ownerId}/addPet`, {
        petname: data.petname,
        type: data.type,
        petimage: data.petimage,
        petinfo: data.petinfo,
      }),
  });
};

// Update Pet
export const useUpdatePet = () => {
  return useMutation({
    mutationKey: ["UPDATE_PET"],
    mutationFn: (data: { ownerId: string; petId: string; petname: string; type: string; petimage: string | null; petinfo: string }) =>
      axios.patch(`http://localhost:3000/api/v1/auth/${data.ownerId}/updatePet/${data.petId}`, {
        petname: data.petname,
        type: data.type,
        petimage: data.petimage,
        petinfo: data.petinfo,
      }),
  });
};

// Delete Pet
export const useDeletePet = () => {
  return useMutation({
    mutationKey: ["DELETE_PET"],
    mutationFn: (data: { ownerId: string; petId: string }) => 
      axios.delete(`http://localhost:3000/api/v1/auth/${data.ownerId}/pets/${data.petId}`),
  });
};

// Toggle Pet's Open Booking
export const useToggleOpenBooking = () => {
  return useMutation({
    mutationKey: ["TOGGLE_OPEN_BOOKING"],
    mutationFn: (data: { ownerId: string; petId: string }) =>
      axios.patch(
        `http://localhost:3000/api/v1/auth/${data.ownerId}/pets/${data.petId}/toggleOpenBooking`
      ),
    onSuccess: (data) => {
      console.log("Booking status toggled:", data);
    },
    onError: (error) => {
      console.error("Error toggling booking status:", error);
    },
  });
};


export const useUpdateBookingDates = () => {
  return useMutation({
    mutationKey: ["UPDATE_BOOKING_DATES"],
    mutationFn: (data: { bookingId: string; startDate: string; endDate: string }) => {
      return axios.put(`http://localhost:3000/api/v1/booking/${data.bookingId}/dates`, {
        startDate: data.startDate,
        endDate: data.endDate,
      });
    },
  });
};