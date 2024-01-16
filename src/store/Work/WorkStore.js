import axios, { Axios } from "axios";
import { create } from "zustand";
import Config from "../../utility/Config";
import { getToken } from "../../helper/SessionHelper";

const AxiosHeader = { headers: { token: getToken() } };
const BASE_URL = Config.BASE_URL;
const WorkStore = create((set) => ({
  WorkCreate: null,
  WorkAllList: null,
  WorkListByStatus: null,
  WorkStatusCountIndividual: null,
  WorkStatusUpdate: null,
  WorkUpdate: null,
  WorkDelete: null,

  WorkCreateRequest: async (workTitle, workDescription) => {
    const postBody = {
      workTitle: workTitle,
      workDescription: workDescription,
      workStatus: "Pending",
    };

    let res = await axios.post(`${BASE_URL}/WorkCreate`, postBody, AxiosHeader);
    if (res.data["status"] === "success") {
      set({ WorkCreate: res.data["data"] });
    }
  },

  WorkAllListRequest: async () => {
    let res = await axios.get(`${BASE_URL}/WorkAllList`, AxiosHeader);
    if (res.data["status"] === "success") {
      set({ WorkAllList: res.data["data"] });
    }
  },

  WorkListByStatusRequest: async (status) => {
    let res = await axios.get(
      `${BASE_URL}/WorkListByStatus/${status}`,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set({ WorkListByStatus: res.data["data"] });
    }
  },

  WorkStatusCountIndividualRequest: async () => {
    let res = await axios.get(
      `${BASE_URL}/WorkStatusCountIndividual`,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set({ WorkStatusCountIndividual: res.data["data"] });
    }
  },

  WorkStatusUpdateRequest: async (id, status) => {
    let res = await axios.get(
      `${BASE_URL}/WorkStatusUpdate/${id}/${status}`,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set({ WorkStatusUpdate: res.data["data"] });
    }
  },

  WorkUpdateRequest: async (id, updatedFields) => {
    let res = await axios.post(
      `${BASE_URL}/WorkUpdate/${id}`,
      updatedFields,
      AxiosHeader
    );
    if (res.data["status"] === "success") {
      set({ WorkUpdate: res.data["data"] });
    }
  },

  WorkDeleteRequest: async (id) => {
    let res = await axios.get(`${BASE_URL}/WorkDelete/${id}`, AxiosHeader);
    if (res.data["status"] === "success") {
      set({ WorkDelete: res.data["data"] });
    }
  },
}));

export default WorkStore;
