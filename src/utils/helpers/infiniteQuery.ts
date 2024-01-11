import { ResponseInfinite } from "../api/axios.api";

export const getNextPageParam = <T extends ResponseInfinite<T["response"]>>(
  lastPage: T,
  _allPage: T[],
  lastPageParam: unknown,
  _allPageParam: unknown[],
) => {
  if (lastPage.pageTotal === lastPageParam) {
    return undefined;
  }

  lastPageParam = (lastPageParam as number) + 1;
  return lastPageParam;
};
