import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";

export const welcomeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  appIconContainer: {
    height: 100,
    width: 200,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separatorContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cottonSeed,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  footer: {
    height: "30%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
  ssoContainer: {
    flexDirection: "row",
  },
  ssoBtn: {
    marginHorizontal: 10,
  },
  welcomeImage: {
    width: "95%",
    height: "95%",
  },
});
