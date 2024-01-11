import { SignupFormValues } from "../../screens/signup/Signup";
import I18n from "../translation/translation";

export type Gender = {
  label: string;
  value: SignupFormValues["gender"];
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
