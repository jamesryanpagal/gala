import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { STORAGE_KEY } from "../constants/storagekey";

export const authRequest = axios.create({
  baseURL: "http://192.168.100.4:5555",
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem(STORAGE_KEY.TOKEN)}`,
  },
});

export const unAuthRequest = axios.create({
  baseURL: "http://192.168.100.4:5555",
});
