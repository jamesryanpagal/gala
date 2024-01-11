import { InputRules } from "../../components/Input";
import I18n from "../translation/translation";
import { pattern } from "../regexp/pattern";

export const passwordRules = (data: string): InputRules[] => {
  const onMatchPattern = (pattern: RegExp) => pattern.test(data);

  return [
    {
      label: I18n.t("dotLbl") + I18n.t("passwordContainingSmallChar"),
      isDone: onMatchPattern(pattern.SMALLCHAR),
    },
    {
      label: I18n.t("dotLbl") + I18n.t("passwordContainingCapitalChar"),
      isDone: onMatchPattern(pattern.CAPITALCHAR),
    },
    {
      label: I18n.t("dotLbl") + I18n.t("passwordContainingNumber"),
      isDone: onMatchPattern(pattern.NUMBER),
    },
    {
      label: I18n.t("dotLbl") + I18n.t("passwordContainingSpecialChar"),
      isDone: onMatchPattern(pattern.SPECIALCHAR),
    },
    {
      label:
        I18n.t("dotLbl") + I18n.t("passwordMinumunLengthLbl", { count: 6 }),
      isDone: data.length >= 6,
    },
  ];
};
