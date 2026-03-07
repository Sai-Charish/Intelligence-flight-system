import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getFlights = async () => {
  const res = await API.get("flights/");
  return res.data;
};

export const getFlight = async (id) => {
  const res = await API.get(`flights/${id}/`);
  return res.data;
};

export const bookFlight = async (data) => {
  const res = await API.post("book/", data);
  return res.data;
};
