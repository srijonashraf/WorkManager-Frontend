// Import necessary libraries and modules
import axios from "axios";
import { create } from "zustand";
import Config from "../../utility/Config";

// Set the base URL
const BASE_URL = Config.BASE_URL;

// Create the user store using Zustand
const UserStore = create((set) => ({
  UserRegistration: [],
  UserLogin: [],
  UserGoogleSignIn: [],
  RecoverVerifyEmail: [],
  RecoverVerifyOTP: [],
  RecoverPassword: [],
  loading: false,

  UserRegistrationRequest: async (formValues) => {
    try {
      return await axios
        .post(`${BASE_URL}/UserRegistration`, formValues)
        .then((res) => {
          if (res.data.status === "success") {
            set((state) => ({
              UserRegistration: [...state.UserRegistration, res.data],
            }));
            console.log("From Store:", res.data);
          }
          return res.data;
        });
    } catch (error) {
      console.error("UserRegistrationRequest error:", error);
      throw error;
    }
  },

  UserLoginRequest: async (email, password) => {
    try {
      set({ loading: true }); // Set loading to true before the API call
      const res = await axios.post(`${BASE_URL}/UserLogin`, {
        email,
        password,
      });

      if (res.data.status === "success") {
        set((state) => ({
          UserLogin: [...state.UserLogin, res.data],
        }));
      }

      return res.data;
    } catch (error) {
      console.error("UserLoginRequest error:", error);
      throw error;
    } finally {
      set({ loading: false }); // Set loading to false after the API call, regardless of success or failure
    }
  },

  UserGoogleSignInRequest: async (googleAuthValue) => {
    try {
      return await axios
        .post(`${BASE_URL}/UserGoogleSignIn`, googleAuthValue)
        .then((res) => {
          if (res.data.status === "success") {
            set((state) => ({
              UserGoogleSignIn: [...state.UserGoogleSignIn, res.data],
            }));
          }
          return res.data;
        });
    } catch (error) {
      console.error("UserGoogleSignInRequest error:", error);
      throw error;
    }
  },

  RecoverVerifyEmailRequest: async (email) => {
    try {
      return await axios
        .get(`${BASE_URL}/RecoverVerifyEmail/${email}`)
        .then((res) => {
          if (res.data.status === "success") {
            set((state) => ({
              RecoverVerifyEmail: [
                ...state.RecoverVerifyEmail,
                res.data.status,
              ],
            }));
          }
          return res.data;
        });
    } catch (error) {
      console.error("RecoverVerifyEmailRequest error:", error);
      throw error;
    }
  },

  RecoverVerifyOTPRequest: async (email, otp) => {
    try {
      return await axios
        .get(`${BASE_URL}/RecoverVerifyOTP/${email}/${otp}`)
        .then((res) => {
          if (res.data.status === "success") {
            set((state) => ({
              RecoverVerifyOTP: [...state.RecoverVerifyOTP, res.data.status],
            }));
          }
          return res.data;
        });
    } catch (error) {
      console.error("RecoverVerifyOTPRequest error:", error);
      throw error;
    }
  },

  RecoverPasswordRequest: async (email, otp, password) => {
    try {
      return await axios
        .post(`${BASE_URL}/RecoverResetPass`, { email, OTP: otp, password })
        .then((res) => {
          if (res.data.status === "success") {
            set((state) => ({
              RecoverPassword: [...state.RecoverPassword, res.data.status],
            }));
          }
          return res.data;
        });
    } catch (error) {
      console.error("RecoverPasswordRequest error:", error);
      throw error;
    }
  },
}));

// Export the UserStore
export default UserStore;
