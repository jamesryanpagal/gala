import { View, ScrollView as RNScrollView, ViewProps } from "react-native";
import React, { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren &
  ViewProps & {
    scrollable?: boolean;
    flexContent?: boolean;
  };

const Container = ({
  children,
  scrollable,
  flexContent,
  style,
  ...rest
}: ContainerProps) => {
  const Node = scrollable ? RNScrollView : View;
  return (
    <Node
      {...rest}
      {...(scrollable && {
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        ...(flexContent && { contentContainerStyle: { flexGrow: 1 } }),
      })}
      style={[{ borderWidth: 1 }, style]}>
      {children}
    </Node>
  );
};

export default Container;
