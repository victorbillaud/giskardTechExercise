import Api from './api';
import { writable } from 'svelte/store';

const storedTheme = localStorage.getItem("token");
export const token = writable(storedTheme);
token.subscribe(value => {
  console.log(value);
  localStorage.setItem("token", value);
});

export const getAvailabilities = async (data) => {
  try {
    const response = await Api.get("/availabilities", null, null);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOneAvailability = async (id) => {
  try {
    const response = await Api.get(`/availability?id=${id}`, null, null);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const createReservation = async (data) => {
  try {
    const response = await Api.post("/reservations/create", data, null);
    return response;
  } catch (error) {
    console.error(error);
  }
}