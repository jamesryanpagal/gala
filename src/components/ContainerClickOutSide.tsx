import React, { PropsWithChildren } from "react";
import { View, Keyboard, ViewStyle } from "react-native";
import { useClickOutside } from "react-native-click-outside";
import { clickOutSide } from "../styles/components-styles/components.style";

export const ContainerClickOutSide = ({
  children,
  ...rest
}: PropsWithChildren & ViewStyle) => {
  const { container } = clickOutSide({ ...rest });
  const ref = useClickOutside<View>(() => {
    Keyboard.dismiss();
  });
  return (
    <View ref={ref} style={container}>
      {children}
    </View>
  );
};

export default ContainerClickOutSide;
