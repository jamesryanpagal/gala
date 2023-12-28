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
import { InputProps } from "../../components/Input";
import { FONTS } from "../../utils/constants/fonts";
import { ModalStyleProps } from "../../components/Modal";

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
  rounded,
  link,
  flex,
  bgColor = COLORS.pastelOrange,
  disabled,
  size,
}: ButtonTypeProps) => {
  const sm = size === "sm";
  const md = size === "md";
  const lg = size === "lg";

  const btnSize = sm
    ? COMPONENT.defaultSm
    : md
    ? COMPONENT.defaultMd
    : lg
    ? COMPONENT.defaultLg
    : COMPONENT.defaultHeight;

  return StyleSheet.create({
    btn: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      ...(flex ? { flex: 1 } : { width: "100%" }),
      ...(rounded && {
        height: btnSize,
        width: btnSize,
      }),
      ...(bordered
        ? {
            borderWidth: 1,
            borderColor: COLORS.cottonSeed,
            height: btnSize,
          }
        : link
        ? {}
        : { backgroundColor: bgColor, height: btnSize }),
      ...(disabled && { opacity: 0.4, height: btnSize }),
    },
  });
};

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
      height: COMPONENT.defaultHeight,
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

export const modal = ({ dark, transparent }: ModalStyleProps) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: COLORS.heavyMetal50,
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      backgroundColor: dark
        ? COLORS.heavyMetal
        : transparent
        ? COLORS.transparent
        : COLORS.paleGrey,
      borderRadius: COMPONENT.defaultRaduis,
      overflow: "hidden",
      padding: SPACING.defaultPadding,
    },
    contentHeader: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });

export const loader = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
  },
  line: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: COLORS.paleGrey,
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
    height: COMPONENT.defaultHeight,
    borderRadius: COMPONENT.defaultRaduis,
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
