import axios from "axios";
import { create } from "zustand";
import Config from "../../utility/Config";

const BASE_URL = Config.BASE_URL;

const UserStore = create((set) => ({
  UserRegistration: null,
  UserLogin: null,
  UserGoogleSignIn: null,
  RecoverVerifyEmail: null,
  RecoverVerifyOTP: null,
  RecoverPassword: null,
  loading: false,

  UserRegistrationRequest: async (formValues) => {
    let res = await axios.post(`${BASE_URL}/UserRegistration`, formValues);
    if (res.data.status === "success") {
      set({
        UserRegistration: res.data.status,
      });
    }
  },

  UserLoginRequest: async (email, password) => {
    set({ loading: true });
    let res = await axios.post(`${BASE_URL}/UserLogin`, {
      email,
      password,
    });

    if (res.data.status === "success") {
      set({
        UserLogin: res.data,
      });
    }
  },

  UserGoogleSignInRequest: async (googleAuthValue) => {
    let res = await axios.post(`${BASE_URL}/UserGoogleSignIn`, googleAuthValue);
    if (res.data.status === "success") {
      set({
        UserGoogleSignIn: res.data,
      });
    }
  },
  RecoverVerifyEmailRequest: async (email) => {
    let res = await axios.get(`${BASE_URL}/RecoverVerifyEmail/${email}`);

    if (res.data.status === "success") {
      set({
        RecoverVerifyEmail: res.data.status,
      });
    }
  },

  RecoverVerifyOTPRequest: async (email, otp) => {
    let res = await axios.get(`${BASE_URL}/RecoverVerifyOTP/${email}/${otp}`);
    if (res.data.status === "success") {
      set({
        RecoverVerifyOTP: res.data.status,
      });
    }
  },

  RecoverPasswordRequest: async (email, otp, password) => {
    let res = await axios.post(`${BASE_URL}/RecoverResetPass`, {
      email,
      OTP: otp,
      password,
    });

    if (res.data.status === "success") {
      set({
        RecoverPassword: res.data.status,
      });
    }
  },
}));

export default UserStore;
