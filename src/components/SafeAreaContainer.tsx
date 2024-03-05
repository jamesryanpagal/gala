import React, { PropsWithChildren } from "react";
import { View, SafeAreaView } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import { safeArea } from "../styles/components-styles/components.style";

export type SafeAreaProps = {
  bg?: string;
  noPadding?: boolean;
};

type SafeAreaContainerProps = PropsWithChildren &
  SafeAreaProps &
  SafeAreaViewProps;

const SafeAreaContainer = ({
  children,
  style,
  ...rest
}: SafeAreaContainerProps) => {
  const { sav, contentContainer } = safeArea({ ...rest });
  return (
    <SafeAreaView style={[sav, style]}>
      <View style={contentContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default SafeAreaContainer;
