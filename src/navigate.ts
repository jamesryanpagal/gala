import {
  createNavigationContainerRef,
  StackActions,
  LinkingOptions,
} from "@react-navigation/native";

import { NavParamList } from "./navigation";

type RootParamList = NavParamList;
type Screen = keyof RootParamList;
type NavType = "push" | "replace";
type NavProps = {
  type?: NavType;
  screen: Screen;
  params?: RootParamList[Screen];
};

export const linking: LinkingOptions<RootParamList> = {
  prefixes: ["bakasyonista://", "https://bakasyonista"],
  config: {
    screens: {
      Welcome: "welcome",
      Login: "login",
      Signup: "signup",
    },
  },
};

export const navRef = createNavigationContainerRef<RootParamList>();

const OnNav = ({ type, screen, params }: NavProps) => {
  switch (type) {
    case "push":
      navRef.dispatch(StackActions.push(screen, params));
      break;

    case "replace":
      navRef.dispatch(StackActions.replace(screen, params));
      break;
    default:
      navRef.navigate(screen, params);
      break;
  }
};

export const navigate = ({ ...rest }: NavProps) => {
  if (!navRef.isReady()) return;
  OnNav(rest);
};

export const back = (fallback: keyof NavParamList) => {
  if (!navRef.canGoBack()) {
    navigate({ screen: fallback });
    return;
  }
  navRef.goBack();
};
