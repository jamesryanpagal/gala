import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { STORAGE_KEY } from "../constants/storagekey";
import config from "../config";

export const authRequest = axios.create({
  baseURL: config.baseUrl,
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem(STORAGE_KEY.TOKEN)}`,
  },
});

export const unAuthRequest = axios.create({
  baseURL: config.baseUrl,
});
