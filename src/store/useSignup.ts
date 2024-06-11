import { create } from "zustand";
import { SignUpData } from "@/types";

export const useSignupStore = create<SignUpData>((set) => ({
  personal_id: "",
  name: "",
  email: "",
  password: "",
  phone_number: "",
  residence_location: "",
  updateName: (name: string) => set({ name }),
  updateEmail: (email: string) => set({ email }),
  updatePassword: (password: string) => set({ password }),
  updatePhoneNumber: (phone_number: string) => set({ phone_number }),
  updateResidenceLocation: (residence_location: string) =>
    set({ residence_location }),
  updatePersonalId: (personal_id: string) => set({ personal_id }),
}));
