import axios from "axios";
import { create } from "zustand";
import Config from "../../utility/Config";
import { getToken } from "../../helper/SessionHelper";

const AxiosHeader = { headers: { token: getToken() } };
const BASE_URL = Config.BASE_URL;
const ProfileStore = create((set) => ({
  ProfileDetails: null,
  ProfileUpdate: null,
  ProfileVerification: null,
  ProfileDelete: null,

  ProfileDetailsRequest: async () => {
    let res = await axios.get(`${BASE_URL}/ProfileDetails`, AxiosHeader);
    if (res.data["status"] === "success") {
      set({
        ProfileDetails: res.data.data[0],
      });
      console.log(res.data.data[0]);
    }
  },

  ProfileUpdateRequest: async (formValues) => {
    let res = await axios.post(
      `${BASE_URL}/ProfileUpdate`,
      formValues,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set({
        ProfileUpdate: res.data.status,
      });
    }
  },

  ProfileVerificationRequest: async (email) => {
    let res = await axios.get(`${BASE_URL}/ProfileVerification/${email}`);
    if (res.data["status"] === "success") {
      set({
        ProfileVerification: res.data.status,
      });
    }
  },

  ProfileDeleteRequest: async (email) => {
    let res = await axios.get(
      `${BASE_URL}/ProfileDelete/${email}`,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set({
        ProfileDelete: res.data.status,
      });
    }
  },
}));

export default ProfileStore;
