import React, { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import { button } from "../styles/components-styles/components.style";

export type ButtonTypeProps = {
  bordered?: boolean;
  link?: boolean;
  bgColor?: string;
  flex?: boolean;
  disabled?: boolean;
};

type ButtonProps = PropsWithChildren &
  ButtonTypeProps & {
    onPress?: () => void;
  };

export const ButtonReg = ({
  children,
  onPress,
  disabled,
  ...rest
}: ButtonProps) => {
  const { btn } = button({ ...rest, disabled });
  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      style={btn}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};
