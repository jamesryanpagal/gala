import { ImageSourcePropType } from "react-native";
import { SignupFormValues } from "../../screens/signup/Signup";
import I18n from "../translation/translation";
import { OnboardedParamList } from "../../navigation";
import { messageIcon, notifIcon, profileIcon } from "../../assets";

export type Gender = {
  label: string;
  value: SignupFormValues["gender"];
};

export type HeaderTab = {
  link: keyof OnboardedParamList;
  img: ImageSourcePropType;
};

export const GENDER: Gender[] = [
  {
    label: I18n.t("genderMLbl"),
    value: "1",
  },
  {
    label: I18n.t("genderFLbl"),
    value: "0",
  },
];

export const HEADERTAB: HeaderTab[] = [
  {
    link: "Profile",
    img: profileIcon,
  },
  {
    link: "Message",
    img: messageIcon,
  },
  {
    link: "Notification",
    img: notifIcon,
  },
];
