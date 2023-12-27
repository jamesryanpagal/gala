import { View, ScrollView as RNScrollView } from "react-native";
import React, { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren & {
  scrollable?: boolean;
  flexContent?: boolean;
};

const Container = ({ children, scrollable, flexContent }: ContainerProps) => {
  const Node = scrollable ? RNScrollView : View;
  return (
    <Node
      {...(scrollable && {
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        ...(flexContent && { contentContainerStyle: { flexGrow: 1 } }),
      })}>
      {children}
    </Node>
  );
};

export default Container;
