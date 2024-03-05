import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";

export const onBoardedTabs = () =>
  StyleSheet.create({
    container: {
      height: 70,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    tab: {
      height: 60,
      width: 60,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    lineMarker: {
      position: "absolute",
      height: 3,
      width: "100%",
      top: -5,
      backgroundColor: COLORS.heavyMetal,
    },
  });
