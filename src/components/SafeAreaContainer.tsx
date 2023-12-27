import React, { PropsWithChildren } from "react";
import { View, SafeAreaView } from "react-native";

import { safeArea } from "../styles/components-styles/components.style";

export type SafeAreaProps = {
  bg?: string;
  noPadding?: boolean;
};

type SafeAreaContainerProps = PropsWithChildren & SafeAreaProps;

const SafeAreaContainer = ({ children, ...rest }: SafeAreaContainerProps) => {
  const { sav, contentContainer } = safeArea({ ...rest });
  return (
    <SafeAreaView style={sav}>
      <View style={contentContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default SafeAreaContainer;
