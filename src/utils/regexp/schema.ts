import * as yup from "yup";
import { pattern } from "./pattern";
import I18n from "../translation/translation";

export const fullnameValidatonSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(pattern.STR, I18n.t("invalidFnameLbl"))
    .required(I18n.t("requiredFieldLbl")),
  lastName: yup
    .string()
    .matches(pattern.STR, I18n.t("invalidLnameLbl"))
    .required(I18n.t("requiredFieldLbl")),
});

export const birthdateGenderValidationSchema = yup.object().shape({
  birthdate: yup
    .string()
    .matches(pattern.BIRTHDATE, I18n.t("invalidBdateLbl"))
    .required(I18n.t("requiredFieldLbl")),
});

export const addressContactInformationValidationSchema = yup.object().shape({
  region: yup.string().required(I18n.t("requiredFieldLbl")),
  province: yup.string().required(I18n.t("requiredFieldLbl")),
  cityOrMunicipality: yup.string().required(I18n.t("requiredFieldLbl")),
  contactNum: yup
    .string()
    .matches(pattern.CONTACT, I18n.t("invalidContactNumLbl"))
    .required(I18n.t("requiredFieldLbl")),
});

export const userDetailsValidationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(pattern.USERNAME, I18n.t("invalidUsernameLbl"))
    .max(12, ({ max }) => I18n.t("usernameMaxLengthLbl", { count: max }))
    .required(I18n.t("requiredFieldLbl")),
  email: yup
    .string()
    .matches(pattern.EMAIL, I18n.t("invalidEmailLbl"))
    .required(I18n.t("requiredFieldLbl")),
  password: yup
    .string()
    .matches(pattern.SMALLCHAR, I18n.t("passwordContainingSmallChar"))
    .matches(pattern.CAPITALCHAR, I18n.t("passwordContainingCapitalChar"))
    .matches(pattern.NUMBER, I18n.t("passwordContainingNumber"))
    .matches(pattern.SPECIALCHAR, I18n.t("passwordContainingSpecialChar"))
    .min(6, ({ min }) => I18n.t("passwordMinumunLengthLbl", { count: min }))
    .required(I18n.t("requiredFieldLbl")),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], I18n.t("passwordDontMatchedLbl"))
    .required(I18n.t("requiredFieldLbl")),
});
