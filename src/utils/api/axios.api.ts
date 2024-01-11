import { AxiosResponse } from "axios";
import I18n from "../translation/translation";

export type PaginateResponse<R> = {};

export type ResponseStatus = {
  message: string;
  statusCode: number;
};

export type Response<R> = ResponseStatus & {
  response: R | null;
};

export type ResponseInfinite<R> = Response<R> & {
  pageTotal: number;
};

export type ApiRequest<T, R> = (req?: T) => Promise<AxiosResponse<R>>;
export type ApiResponse<R> = Promise<Response<R>>;
export type ApiResponseInfinite<R> = Promise<ResponseInfinite<R>>;

/**
 * @description accepts 2 paramaters. 1: function for the actual get or post request. 2: for identifying wether it is in the form of rest api of not.
 * @param callback_request actual function for get and post request.
 * @param isRest use to indetify whether the callback_request is in the form of rest or not.
 * @generic ( apiRequest<T, ...> ) a generic type of data parameter that will be pass to actual request.
 * @generic ( apiRequest<..., R> ) a generic type for actual request response.
 */

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

export const apiPaginatedRequest =
  <T, R>(req: ApiRequest<T, R>) =>
  async (params?: T): ApiResponseInfinite<R> => {
    return (await req(params)).data as ResponseInfinite<R>;
  };
