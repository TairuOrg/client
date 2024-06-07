import { create } from "zustand";

type SignUpData = {
  personal_id: string;
  password: string;
  name: string;
  phone_number: string;
  email: string;
  residence_location: string;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updatePhoneNumber: (phone_number: string) => void;
  updateResidenceLocation: (residence_location: string) => void;
  updatePersonalId: (personal_id: string) => void;
};
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
