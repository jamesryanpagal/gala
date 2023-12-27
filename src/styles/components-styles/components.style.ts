import { ImageProps, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../../utils/constants/colors";
import {
  FONT_SIZE,
  ICON_SIZES,
  COMPONENT,
  SPACING,
} from "../../utils/constants/sizes";
import { IconSizeProps } from "../../components/Icon";
import { ButtonTypeProps } from "../../components/Button";
import { TextScaleStyleProps, TextTypeProps } from "../../components/Text";
import { SafeAreaProps } from "../../components/SafeAreaContainer";
import { LoadingProps } from "../../components/Loading";
import { InputProps } from "../../components/Input";
import { FONTS } from "../../utils/constants/fonts";

export const safeArea = ({ bg, noPadding }: SafeAreaProps) =>
  StyleSheet.create({
    sav: {
      flex: 1,
      backgroundColor: bg || COLORS.paleGrey,
    },
    contentContainer: {
      flex: 1,
      ...(!noPadding && {
        paddingVertical: SPACING.savPaddingV,
        paddingHorizontal: SPACING.savPaddingH,
      }),
    },
  });

export const text = ({
  color,
  centered,
  light,
  danger,
  visibility,
  fontSize,
}: TextTypeProps & TextScaleStyleProps) => {
  const textColor =
    (!!color && color) ||
    (light ? COLORS.white : danger ? COLORS.lavaRed : COLORS.fireFly);

  return StyleSheet.create({
    r: {
      fontFamily: FONTS.PoppinsReg,
      fontSize,
      color: textColor,
      fontStyle: "normal",
      opacity: visibility,
      ...(centered && { textAlign: "center" }),
    },
    b: {
      fontFamily: FONTS.PoppinsBold,
      fontSize,
      color: textColor,
      fontStyle: "normal",
      opacity: visibility,
      ...(centered && { textAlign: "center" }),
    },
    l: {
      fontFamily: FONTS.PoppinsLight,
      fontSize,
      color: textColor,
      fontStyle: "normal",
      opacity: visibility,
      ...(centered && { textAlign: "center" }),
    },
  });
};

export const button = ({
  bordered,
  link,
  flex,
  bgColor = COLORS.pastelOrange,
  disabled,
}: ButtonTypeProps) =>
  StyleSheet.create({
    btn: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      ...(flex ? { flex: 1 } : { width: "100%" }),
      ...(bordered
        ? {
            borderWidth: 1,
            borderColor: COLORS.cottonSeed,
            height: 50,
          }
        : link
        ? {}
        : { backgroundColor: bgColor, height: 50 }),
      ...(disabled && { opacity: 0.4, height: 50 }),
    },
  });

export const navHeader = StyleSheet.create({
  leftBtnContainer: {
    height: SPACING.loginSignupNavHeaderHeight,
    width: SPACING.loginSignupNavHeaderHeight,
    justifyContent: "center",
  },
});

export const navLoginHeader = StyleSheet.create({
  header: {},
  appLogoContainer: {
    height: 100,
  },
});

export const navSignupHeader = StyleSheet.create({
  header: {},
  appLogoContainer: {
    height: 100,
  },
});

export const image = ({
  resizeMode,
  small,
  medium,
  large,
  xl,
}: Pick<ImageProps, "resizeMode"> & IconSizeProps) => {
  const size = small
    ? ICON_SIZES.iconS
    : medium
    ? ICON_SIZES.iconM
    : large
    ? ICON_SIZES.iconL
    : xl
    ? ICON_SIZES.iconXL
    : ICON_SIZES.iconS;
  return StyleSheet.create({
    img: {
      height: "100%",
      width: "100%",
      resizeMode: resizeMode || "contain",
    },
    icon: {
      height: size,
      width: size,
      resizeMode: resizeMode || "contain",
    },
  });
};

export const input = ({ error }: Partial<InputProps>) =>
  StyleSheet.create({
    container: { marginBottom: 10 },
    labelContainer: {
      flexDirection: "row",
      columnGap: 5,
    },
    invalidContainer: {},
    fieldContainer: {
      borderWidth: 1,
      borderColor: error ? COLORS.lavaRed : COLORS.cottonSeed,
      borderRadius: 5,
      flexDirection: "row",
      height: COMPONENT.inputHeight,
      overflow: "hidden",
    },
    iconContainer: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    field: {
      flex: 1,
      fontSize: FONT_SIZE.input,
      paddingHorizontal: SPACING.inputPadding,
    },
  });

export const form = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputGroup: {},
  actionContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  invalidContainer: {
    marginBottom: 20,
  },
  formHeaderContainer: {
    marginBottom: 10,
  },
});

export const loading = ({ dark }: LoadingProps) =>
  StyleSheet.create({
    container: {
      height: 50,
      flexDirection: "row",
      columnGap: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    loader: {
      height: 10,
      width: 10,
      borderRadius: 50,
      backgroundColor: dark ? COLORS.carbonGrey : COLORS.white,
    },
  });

export const clickOutSide = ({ ...rest }: ViewStyle) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.transparent,
      ...rest,
    },
  });

export const invalidMessage = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.lavaRed,
    height: COMPONENT.inputHeight,
    borderRadius: COMPONENT.inputRadius,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.dustStorm,
    paddingHorizontal: SPACING.inputPadding,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
