import axios from "axios";
import { create } from "zustand";
import Config from "../../utility/Config";
import { getToken } from "../../helper/SessionHelper";

const AxiosHeader = { headers: { token: getToken() } };
const BASE_URL = Config.BASE_URL;
const ProfileStore = create((set) => ({
  ProfileDetails: [],
  ProfileUpdate: [],
  ProfileVerification: [],
  ProfileDelete: [],

  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(`${BASE_URL}/ProfileDetails`, AxiosHeader);
      if (res.data["status"] === "success") {
        set((state) => ({
          ProfileDetails: [...state.ProfileDetails, res.data.data[0]],
        }));
      }
    } catch (error) {
      console.error("ProfileDetailsRequest error:", error);
    }
  },

  ProfileUpdateRequest: async (formValues) => {
    let res = await axios.post(
      `${BASE_URL}/ProfileUpdate`,
      formValues,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set((state) => ({
        ProfileUpdate: [...state.ProfileUpdate, res.data.status],
      }));
      console.log("From Store:", res.data.status);
    }
  },

  ProfileVerificationRequest: async (email) => {
    let res = await axios.get(`${BASE_URL}/ProfileVerification/${email}`);
    console.log(email);
    if (res.data["status"] === "success") {
      set((state) => ({
        ProfileVerification: [...state.ProfileVerification, res.data.status],
      }));
    }
  },

  ProfileDeleteRequest: async (email) => {
    let res = await axios.get(
      `${BASE_URL}/ProfileDelete/${email}`,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set((state) => ({
        ProfileDelete: [...state.ProfileDelete, res.data.status],
      }));
    }
  },
}));

export default ProfileStore;
