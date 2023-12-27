import { Platform } from "react-native";

export const platform = {
  isAndroid: Platform.OS === "android",
  isIos: Platform.OS === "ios",
};
