import React from "react";
import { Text as RNText, TextProps as RnTextProps } from "react-native";
import { text } from "../styles/components-styles/components.style";
import { FONT_SIZE } from "../utils/constants/sizes";
import I18n from "../utils/translation/translation";

export type TextScaleStyleProps = {
  fontSize: number;
};

export type TextTypeProps = {
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  light?: boolean;
  success?: boolean;
  danger?: boolean;
  color?: string;
  centered?: boolean;
  visibility?: number;
};

export type TextProps = TextTypeProps &
  RnTextProps & {
    title: string;
  };

export const TextS = ({
  title,
  color,
  light,
  success,
  danger,
  centered,
  visibility,
  style,
  ...rest
}: TextProps) => {
  const { r } = text({
    color,
    light,
    success,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontS,
  });
  return (
    <RNText {...rest} style={[r, style]}>
      {title}
    </RNText>
  );
};

export const TextReg = ({
  title,
  color,
  light,
  success,
  danger,
  centered,
  visibility,
  style,
  ...rest
}: TextProps) => {
  const { r } = text({
    color,
    light,
    success,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontReg,
  });
  return (
    <RNText {...rest} style={[r, style]}>
      {title}
    </RNText>
  );
};

export const TextM = ({
  title,
  color,
  light,
  success,
  danger,
  centered,
  visibility,
  style,
  ...rest
}: TextProps) => {
  const { r } = text({
    color,
    light,
    success,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontM,
  });
  return (
    <RNText {...rest} style={[r, style]}>
      {title}
    </RNText>
  );
};

export const TextL = ({
  title,
  color,
  light,
  success,
  danger,
  centered,
  visibility,
  style,
  ...rest
}: TextProps) => {
  const { b } = text({
    color,
    light,
    success,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontL,
  });
  return (
    <RNText {...rest} style={[b, style]}>
      {title}
    </RNText>
  );
};
