import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from "react-native";
import { platform } from "../utils/constants/platform";
import { SPACING } from "../utils/constants/sizes";

type KeyboardViewProps = PropsWithChildren & KeyboardAvoidingViewProps;

const KeyboardView = ({ children, style, ...rest }: KeyboardViewProps) => {
  const { isIos } = platform;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    Keyboard.addListener(isIos ? "keyboardWillShow" : "keyboardDidShow", () => {
      setOffset(() =>
        isIos
          ? SPACING.keyboardViewOffsetIos
          : SPACING.keyboardViewOffsetAndroid,
      );
    });

    Keyboard.addListener(isIos ? "keyboardWillHide" : "keyboardDidHide", () => {
      setOffset(() => 0);
    });

    return () => {
      Keyboard.removeAllListeners(
        isIos ? "keyboardWillShow" : "keyboardDidShow",
      );
      Keyboard.removeAllListeners(
        isIos ? "keyboardWillHide" : "keyboardDidHide",
      );
    };
  }, []);

  return (
    <KeyboardAvoidingView
      {...rest}
      {...(isIos ? { behavior: "padding" } : { behavior: "height" })}
      style={[
        {
          flex: 1,
          paddingBottom: offset,
        },
        style,
      ]}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
