import React from "react";
import { Text as RNText, TextProps as RnTextProps } from "react-native";
import { text } from "../styles/components-styles/components.style";
import { FONT_SIZE } from "../utils/constants/sizes";

export type TextScaleStyleProps = {
  fontSize: number;
};

export type TextTypeProps = {
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  light?: boolean;
  danger?: boolean;
  color?: string;
  centered?: boolean;
  visibility?: number;
};

export type TextProps = TextTypeProps &
  RnTextProps & {
    title: string;
  };

export const TextReg = ({
  title,
  color,
  light,
  danger,
  centered,
  visibility,
  ...rest
}: TextProps) => {
  const { r } = text({
    color,
    light,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontReg,
  });
  return (
    <RNText {...rest} style={r}>
      {title}
    </RNText>
  );
};

export const TextM = ({
  title,
  color,
  light,
  danger,
  centered,
  visibility,
  ...rest
}: TextProps) => {
  const { r } = text({
    color,
    light,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontM,
  });
  return (
    <RNText {...rest} style={r}>
      {title}
    </RNText>
  );
};

export const TextL = ({
  title,
  color,
  light,
  danger,
  centered,
  visibility,
  ...rest
}: TextProps) => {
  const { b } = text({
    color,
    light,
    danger,
    centered,
    visibility,
    fontSize: FONT_SIZE.fontL,
  });
  return (
    <RNText {...rest} style={b}>
      {title}
    </RNText>
  );
};
