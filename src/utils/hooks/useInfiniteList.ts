import { useState, useEffect } from "react";
import { Response } from "../api/axios.api";

export type InfiniteDataOptions<T> = {
  onSuccess?: (data: T) => void;
};

export type InfiniteData<T> =
  | {
      pageParams: number;
      pages: T[];
    }
  | undefined;

export const useInfiniteList = <T extends Response<T["response"]>>(
  data?: T,
  options?: InfiniteDataOptions<T["response"]>,
) => {
  const [iData, setIData] = useState<T["response"]>([]);

  const infiniteDataProps = data as InfiniteData<T>;

  useEffect(() => {
    if (infiniteDataProps) {
      const { pages } = infiniteDataProps;

      const list = pages.reduce((acc, c, i, arr) => {
        const responseData = c.response as T["response"][];
        return (acc = [...acc, ...responseData]);
      }, [] as T["response"][]);

      options?.onSuccess?.(list);
      setIData(list);
    }
  }, [infiniteDataProps]);

  return { iData };
};
