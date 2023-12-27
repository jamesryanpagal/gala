import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView } from "react-native";
import { platform } from "../utils/constants/platform";
import { SPACING } from "../utils/constants/sizes";

const KeyboardView = ({ children }: PropsWithChildren) => {
  const { isIos } = platform;
  return (
    <KeyboardAvoidingView
      {...(isIos && { behavior: "padding" })}
      keyboardVerticalOffset={
        isIos
          ? SPACING.keyboardViewOffsetIos
          : SPACING.keyboardViewOffsetAndroid
      }
      style={{
        flex: 1,
      }}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
