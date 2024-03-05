import React from "react";
import { Image, ImageProps } from "react-native";
import { image } from "../styles/components-styles/components.style";

export type IconSizeProps = {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  xl?: boolean;
  size?: number;
};

export type IconProps = IconSizeProps & ImageProps;

const Icon = ({
  resizeMode,
  small,
  medium,
  large,
  xl,
  size,
  style,
  ...rest
}: IconProps) => {
  const { icon } = image({ resizeMode, small, medium, large, xl, size });
  return <Image {...rest} style={[icon, style]} />;
};

export default Icon;
