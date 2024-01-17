import { PropsWithChildren, useState } from "react";
import { createContext } from "react";

export type User = {
  firstname: string;
  middle: string;
  lastname: string;
  birthdate: string;
  region: string;
  province: string;
  cityOrMunicipality: string;
  cellphoneNum: string;
  username: string;
  email: string;
};

export type UserCntxt = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const UserContext = createContext<UserCntxt>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>({
    firstname: "Test",
    middle: "Test",
    lastname: "Test",
    birthdate: "Test",
    region: "Test",
    province: "Test",
    cityOrMunicipality: "Test",
    cellphoneNum: "Test",
    username: "Test",
    email: "Test",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
