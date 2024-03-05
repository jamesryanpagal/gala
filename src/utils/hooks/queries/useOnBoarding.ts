import { loginFn, signupFn } from "../../api/query-fn/queryfn.api";
import { LoginSignupResponse } from "../../api/query-fn/queryfn.api";
import { LoginFormValues } from "../../../screens/login/Login";
import { SignupForm } from "../../../screens/signup/Signup";
import { Response } from "../../api/axios.api";
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
  options?: MutationOptions<Response<LoginSignupResponse>, SignupForm>,
) => {
  return useQueryMutation({
    ...options,
    mutationKey: ["signup"],
    mutationFn: signupFn,
  });
};
