import { View } from "react-native";
import React from "react";
import Icon from "./Icon";
import { emptyDataIcon } from "../assets";
import { TextS } from "./Text";
import I18n from "../utils/translation/translation";
import { emptyList } from "../styles/components-styles/components.style";

const EmptyList = () => {
  const { container } = emptyList;
  return (
    <View style={container}>
      <Icon source={emptyDataIcon} large />
      <TextS title={I18n.t("emptyListLbl")} />
    </View>
  );
};

export default EmptyList;
