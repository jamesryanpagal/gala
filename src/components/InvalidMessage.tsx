import { View } from "react-native";
import React from "react";
import { invalidMessage } from "../styles/components-styles/components.style";
import Icon from "./Icon";
import { invalidIcon } from "../assets";
import { TextReg } from "./Text";

export type InvalidMessageProps = {
  title: string;
};

const InvalidMessage = ({ title }: InvalidMessageProps) => {
  const { container, textContainer } = invalidMessage;
  return (
    <View style={container}>
      <Icon source={invalidIcon} />
      <View style={textContainer}>
        <TextReg title={title} danger />
      </View>
    </View>
  );
};

export default InvalidMessage;
