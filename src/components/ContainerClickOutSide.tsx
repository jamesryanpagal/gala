import React, { PropsWithChildren } from "react";
import { View, Keyboard, ViewStyle } from "react-native";
import { useClickOutside } from "react-native-click-outside";
import { clickOutSide } from "../styles/components-styles/components.style";

export type ContainerClickOutSideProps = PropsWithChildren &
  ViewStyle & {
    onClickOutSide?: () => void;
  };

export const ContainerClickOutSide = ({
  children,
  onClickOutSide = () => {
    Keyboard.dismiss();
  },
  ...rest
}: ContainerClickOutSideProps) => {
  const { container } = clickOutSide({ ...rest });
  const ref = useClickOutside<View>(onClickOutSide);
  return (
    <View ref={ref} style={container}>
      {children}
    </View>
  );
};

export default ContainerClickOutSide;
