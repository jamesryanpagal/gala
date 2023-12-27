import { LoginFormValues } from "../../../screens/login/Login";
import { SignupFormValues } from "../../../screens/signup/Signup";
import { ApiResponse, apiRequest, unAuthRequest } from "../axios.api";
import API_URL from "../url.api";

export type LoginSignupResponse = {
  token: string;
  firstname: string;
  middle: string;
  lastname: string;
  birthdate: string;
  address: string;
  cellphoneNum: string;
  username: string;
  email: string;
};

export const loginFn = apiRequest<LoginFormValues, LoginSignupResponse>(
  params => unAuthRequest.post(API_URL.LOGIN, params),
);

export const signupFn = async (
  props: SignupFormValues,
): Promise<ApiResponse<LoginSignupResponse>> => {
  return await unAuthRequest.post(API_URL.SIGN_UP, props);
};
