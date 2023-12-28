import {
  useMutation as useRQMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { loginFn, signupFn } from "../../api/query-fn/queryfn.api";
import { LoginSignupResponse } from "../../api/query-fn/queryfn.api";
import { LoginFormValues } from "../../../screens/login/Login";
import { SignupFormValues } from "../../../screens/signup/Signup";
import { ApiResponse, Response } from "../../api/axios.api";

export type MutationOptions<Data, Var, Cntx = any> = UseMutationOptions<
  Data,
  Error,
  Var,
  Cntx
>;

export const useLogin = (
  options?: MutationOptions<Response<LoginSignupResponse>, LoginFormValues>,
) => {
  return useJPMutation({
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

export const useJPMutation = <
  Data extends Response<Data["response"]>,
  Params,
  Cntx = any,
>({
  ...rest
}: MutationOptions<Data, Params, Cntx>) => {
  const { mutateAsync: rqMutateAsync } = useRQMutation({
    ...rest,
    onSuccess: async (data, params, cntx) => {
      const { statusCode, message } = data || {};

      if (statusCode < 200 || statusCode >= 300) {
        await rest?.onError?.(new Error(message), params, cntx);
        return;
      }

      await rest?.onSuccess?.(data, params, cntx);
    },
    // to interupt request
    // data result manipulation
  });

  const mutateAsync = async (params: Params) => {
    return rqMutateAsync(params);
  };

  return { mutateAsync, ...rest };
};
