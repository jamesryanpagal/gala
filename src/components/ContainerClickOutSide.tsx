import React, { PropsWithChildren } from "react";
import { View, Keyboard, ViewStyle, ViewProps } from "react-native";
import { useClickOutside } from "react-native-click-outside";
import { clickOutSide } from "../styles/components-styles/components.style";

export type ContainerClickOutSideProps = PropsWithChildren &
  ViewProps & {
    onClickOutSide?: () => void;
  };

export const Cots = ({
  children,
  style,
  onClickOutSide = () => {
    Keyboard.dismiss();
  },
  ...rest
}: ContainerClickOutSideProps) => {
  const { container } = clickOutSide({ ...rest });
  const ref = useClickOutside<View>(onClickOutSide);
  return (
    <View ref={ref} style={[container, style]}>
      {children}
    </View>
  );
};

export default Cots;
