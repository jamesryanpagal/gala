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
import { LoaderIndicatorProps } from "../../components/Loader";

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
  success,
  danger,
  visibility,
  fontSize,
}: TextTypeProps & TextScaleStyleProps) => {
  const textColor =
    (!!color && color) ||
    (light
      ? COLORS.white
      : danger
      ? COLORS.lavaRed
      : success
      ? COLORS.malachite
      : COLORS.fireFly);

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
  reg,
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
      ...(flex ? { flex: 1 } : { width: "100%" }),
      ...(rounded && {
        height: btnSize,
        width: btnSize,
      }),
      ...(reg
        ? {
            height: btnSize,
            borderRadius: 5,
            backgroundColor: bgColor,
          }
        : bordered
        ? {
            borderWidth: 1,
            borderColor: COLORS.cottonSeed,
            height: btnSize,
            borderRadius: 100,
          }
        : link
        ? {}
        : { backgroundColor: bgColor, height: btnSize, borderRadius: 100 }),
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

export const input = ({ error, disabled }: Partial<InputProps>) =>
  StyleSheet.create({
    container: { marginBottom: 10 },
    labelContainer: {
      flexDirection: "row",
      columnGap: 5,
    },
    rulesContainer: {
      padding: SPACING.defaultPadding,
    },
    invalidContainer: {},
    fieldContainer: {
      borderWidth: 1,
      borderColor: error ? COLORS.lavaRed : COLORS.cottonSeed,
      borderRadius: 5,
      flexDirection: "row",
      height: COMPONENT.defaultHeight,
      overflow: "hidden",
      ...(disabled && { backgroundColor: COLORS.mercury, opacity: 0.5 }),
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

export const loader = ({ sm, lg, dark, primary }: LoaderIndicatorProps) => {
  const size = sm ? 10 : lg ? 25 : 20;
  const bgColor = dark
    ? COLORS.fireFly
    : primary
    ? COLORS.pastelOrange
    : COLORS.white;
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      columnGap: 10,
    },
    line: {
      height: size,
      width: size,
      borderRadius: 100,
      backgroundColor: bgColor,
    },
  });
};

export const clickOutSide = ({ ...rest }: ViewStyle) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.transparent,
      zIndex: 1,
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

export const dropDown = ({ error }: Partial<InputProps>) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    contentContainer: {
      borderWidth: 1,
      borderRadius: COMPONENT.defaultRaduis,
      borderColor: error ? COLORS.lavaRed : COLORS.cottonSeed,
      height: COMPONENT.defaultHeight,
      flexDirection: "row",
    },
    valueContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: SPACING.defaultPadding,
    },
    valueText: {
      fontSize: FONT_SIZE.input,
    },
    suffixContainer: {
      width: COMPONENT.defaultHeight,
      justifyContent: "center",
      alignItems: "center",
    },
    listContainer: {
      borderWidth: 1,
      borderBottomLeftRadius: COMPONENT.defaultRaduis,
      borderBottomRightRadius: COMPONENT.defaultRaduis,
      position: "absolute",
      paddingVertical: 5,
      top: "93%",
      width: "100%",
      borderTopColor: COLORS.transparent,
      borderLeftColor: COLORS.cottonSeed,
      borderRightColor: COLORS.cottonSeed,
      borderBottomColor: COLORS.cottonSeed,
      backgroundColor: COLORS.paleGrey,
      rowGap: 5,
    },
    item: {
      height: 40,
      justifyContent: "center",
      paddingHorizontal: SPACING.defaultPadding,
      marginHorizontal: 5,
      borderRadius: COMPONENT.defaultRaduis,
    },
    selectedItem: {
      backgroundColor: COLORS.heavyMetal,
    },
    selectedItemText: {
      color: COLORS.white,
    },
  });

export const dropdownSearch = StyleSheet.create({
  container: {
    zIndex: 2,
  },
  listContainer: {
    borderWidth: 1,
    paddingBottom: 5,
    top: -16,
    width: "100%",
    backgroundColor: COLORS.paleGrey,
    borderTopColor: COLORS.transparent,
    borderLeftColor: COLORS.cottonSeed,
    borderRightColor: COLORS.cottonSeed,
    borderBottomColor: COLORS.cottonSeed,
    borderBottomLeftRadius: COMPONENT.defaultRaduis,
    borderBottomRightRadius: COMPONENT.defaultRaduis,
    minHeight: 50,
  },
  list: {
    minHeight: 235,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 5,
    height: 40,
    paddingHorizontal: SPACING.defaultPadding,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: COMPONENT.defaultRaduis,
  },
  listItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cottonSeed,
  },
  footerContainer: {
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const emptyList = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.defaultPadding,
  },
});
