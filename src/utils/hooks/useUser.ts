import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { UserSlice } from "../redux/slices/userSlice";

export const useUser = () => {
  const [details, setDetails] = useState<UserSlice | null>(null);
  const user = useSelector<AppStore>(state => state.user);

  useEffect(() => {
    const userData = user as UserSlice;
    const { token, user: userDetails } = userData;

    if (!!token && !!userDetails && Object.keys(userDetails).length > 0) {
      setDetails({ token, user: userDetails });
    }
  }, [user]);

  return details;
};
