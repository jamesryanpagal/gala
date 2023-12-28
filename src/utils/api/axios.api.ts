import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/storagekey";
import I18n from "../translation/translation";

export const authRequest = axios.create({
  baseURL: "http://localhost:5555",
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem(STORAGE_KEY.TOKEN)}`,
  },
});

export const unAuthRequest = axios.create({
  baseURL: "http://localhost:5555",
});

export type Response<T> = {
  message: string;
  statusCode: number;
  response: T | null;
};

export type ApiRequest<T, R> = (req?: T) => Promise<AxiosResponse<R>>;
export type ApiResponse<R> = Promise<Response<R>>;

export const apiRequest =
  <T, R>(req: ApiRequest<T, R>) =>
  async (params?: T): ApiResponse<R> => {
    try {
      const { message, statusCode, response } = (await req(params))
        .data as Response<R>;

      return {
        message,
        statusCode,
        response,
      };
    } catch (err: any) {
      if (err.response) {
        return {
          statusCode: err.response.data.statusCode,
          message: err.response.data.message,
          response: null,
        };
      } else {
        return {
          statusCode: 500,
          message: I18n.t("errNetworkErrorLbl"),
          response: null,
        };
      }
    }
  };
