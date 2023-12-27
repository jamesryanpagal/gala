import { I18n as RNI18n } from "i18n-js";
import en from "./en.json";

const translation = {
  en,
};

const I18n = new RNI18n(translation);
I18n.enableFallback = true;
I18n.defaultLocale = "en";

export default I18n;
