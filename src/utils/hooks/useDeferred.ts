import { useState, useEffect } from "react";
import { DEFUALTS } from "../constants/values";

export const useDeferred = <T extends string | number>(
  value: T,
  delayTime?: number,
) => {
  const [val, setVal] = useState<T>();

  useEffect(() => {
    const delay = setTimeout(() => {
      setVal(value);
    }, delayTime || DEFUALTS.delayTime);

    return () => clearTimeout(delay);
  }, [value]);

  return val;
};
