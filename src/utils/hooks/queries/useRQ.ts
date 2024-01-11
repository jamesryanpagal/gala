import {
  useMutation as useRQMutation,
  useQuery as useRQQuery,
  useInfiniteQuery as useRQInfiniteQuery,
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { Response } from "../../api/axios.api";

export type MutationOptions<Data, Var, Cntx = any> = UseMutationOptions<
  Data,
  Error,
  Var,
  Cntx
>;

export type QueryOptions<Data, Key extends QueryKey = any[]> = UseQueryOptions<
  Data,
  Error,
  Data,
  Key
>;

export type InfiniteQueryOptions<
  Data,
  Key extends QueryKey = any[],
> = UseInfiniteQueryOptions<Data, Error, Data, Data, Key>;

export const useQueryMutation = <
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

export const useQuery = <
  Data extends Response<Data["response"]>,
  Key extends QueryKey = any[],
>({
  ...rest
}: QueryOptions<Data, Key>) => {
  const result = useRQQuery({
    ...rest,
  });

  const key = rest.queryKey[0] as string;

  return { key, ...result };
};

export const useInfiniteQuery = <Data, Key extends QueryKey = any[]>({
  ...rest
}: InfiniteQueryOptions<Data, Key>) => {
  const result = useRQInfiniteQuery({
    ...rest,
  });
  const queryKey = rest.queryKey[0] as string;
  return { queryKey, ...result };
};
