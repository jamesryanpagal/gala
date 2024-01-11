import { loginFn, signupFn } from "../../api/query-fn/queryfn.api";
import { LoginSignupResponse } from "../../api/query-fn/queryfn.api";
import { LoginFormValues } from "../../../screens/login/Login";
import { SignupFormValues } from "../../../screens/signup/Signup";
import { ApiResponse, Response } from "../../api/axios.api";
import { MutationOptions, useQueryMutation } from "./useRQ";

export const useLogin = (
  options?: MutationOptions<Response<LoginSignupResponse>, LoginFormValues>,
) => {
  return useQueryMutation({
    ...options,
    mutationKey: ["login"],
    mutationFn: loginFn,
  });
};

export const useSignup = (
  options?: MutationOptions<ApiResponse<LoginSignupResponse>, SignupFormValues>,
) => {
  // return useMutation({
  //   ...options,
  //   mutationKey: ["signup"],
  //   mutationFn: signupFn,
  // });
};
