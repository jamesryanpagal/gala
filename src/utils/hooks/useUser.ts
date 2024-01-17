import { useContext } from "react";
import { UserContext } from "../context/context";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    throw new Error("Context Error.");
  }

  return { user, setUser };
};
