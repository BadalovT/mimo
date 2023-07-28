import axios from "axios";

export const baseUrl = "https://apitest.mimo.az/api/";

export const axiosClient = axios.create({
    baseURL: baseUrl,
});