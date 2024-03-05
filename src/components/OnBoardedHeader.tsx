import { View, TouchableOpacity } from "react-native";
import React from "react";
import { onBoardedHeader } from "../styles/components-styles/components.style";
import Icon from "./Icon";
import { appLogo } from "../assets";
import { HEADERTAB } from "../utils/constants/data";

const OnBoardedHeader = () => {
  const { container, logoContainer, headerTabContainer } = onBoardedHeader;
  return (
    <View style={container}>
      <View style={logoContainer}>
        <Icon source={appLogo} large />
      </View>
      <View style={headerTabContainer}>
        {HEADERTAB.map(({ img, link }, i) => (
          <TouchableOpacity key={i}>
            <Icon source={img} size={28} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OnBoardedHeader;
