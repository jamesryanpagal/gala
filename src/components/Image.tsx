import React from "react";
import { Image as RNImage, ImageProps } from "react-native";
import { image } from "../styles/components-styles/components.style";

const Image = ({ resizeMode, style, ...rest }: ImageProps) => {
  const { img } = image({ resizeMode });
  return <RNImage {...rest} style={[img, style]} />;
};

export default Image;
