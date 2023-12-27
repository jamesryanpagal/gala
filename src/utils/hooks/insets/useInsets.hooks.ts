import { StatusBar } from "react-native";
import { useSafeAreaInsets, EdgeInsets } from "react-native-safe-area-context";
import { platform } from "../../constants/platform";

export const useInset = (): EdgeInsets => {
  const { isAndroid } = platform;
  const androidTop = StatusBar.currentHeight;
  const inset = useSafeAreaInsets();

  return { ...inset, ...(isAndroid && { top: androidTop }) };
};
