import axios from "axios";
import { create } from "zustand";
import Config from "../../utility/Config";
import { getToken } from "../../helper/SessionHelper";

const BASE_URL = Config.BASE_URL;
const WorkStore = create((set) => ({
  WorkCreate: [],
  WorkAllList: [],
  WorkListByStatus: [],
  WorkStatusCountIndividual: [],
  WorkStatusUpdate: [],
  WorkUpdate: [],
  WorkDelete: [],

  // Function to get the latest Axios headers with the token
  getAxiosHeaders: () => ({
    headers: { token: getToken() },
  }),

  WorkCreateRequest: async (workTitle, workDescription) => {
    const postBody = {
      workTitle: workTitle,
      workDescription: workDescription,
      workStatus: "Pending",
    };
    try {
      let res = await axios.post(
        `${BASE_URL}/WorkCreate`,
        postBody,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set({ WorkCreate: res.data["data"] });
      }
    } catch (error) {
      console.error("Error creating work:", error);
    }
  },

  WorkAllListRequest: async () => {
    try {
      let res = await axios.get(
        `${BASE_URL}/WorkAllList`,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set({ WorkAllList: res.data["data"] });
        console.log(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching all works:", error);
    }
  },

  WorkListByStatusRequest: async (status) => {
    try {
      let res = await axios.get(
        `${BASE_URL}/WorkListByStatus/${status}`,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set({ WorkListByStatus: res.data["data"] });
      }
    } catch (error) {
      console.error("Error fetching works by status:", error);
    }
  },

  WorkStatusCountIndividualRequest: async () => {
    try {
      let res = await axios.get(
        `${BASE_URL}/WorkStatusCountIndividual`,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set((state) => ({
          ...state,
          WorkStatusCountIndividual: res.data["data"],
        }));
      }
    } catch (error) {
      console.error("Error fetching WorkStatusCountIndividual:", error);
    }
  },

  WorkStatusUpdateRequest: async (id, status) => {
    try {
      let res = await axios.get(
        `${BASE_URL}/WorkStatusUpdate/${id}/${status}`,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set({ WorkStatusUpdate: res.data["data"] });
      }
    } catch (error) {
      console.error("Error updating work status:", error);
    }
  },

  WorkUpdateRequest: async (id, updatedFields) => {
    try {
      let res = await axios.post(
        `${BASE_URL}/WorkUpdate/${id}`,
        updatedFields,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set({ WorkUpdate: res.data["data"] });
      }
      console.log(res.data);
    } catch (error) {
      console.error(
        "Error updating work:",
        error.response ? error.response.data : error.message
      );
    }
  },

  WorkDeleteRequest: async (id) => {
    try {
      let res = await axios.get(
        `${BASE_URL}/WorkDelete/${id}`,
        WorkStore.getState().getAxiosHeaders()
      );
      if (res.data["status"] === "success") {
        set((state) => ({
          WorkDelete: [...state.WorkDelete, res.data["data"]],
        }));
      }
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  },
}));

export default WorkStore;
