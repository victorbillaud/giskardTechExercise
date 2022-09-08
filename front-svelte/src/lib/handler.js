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