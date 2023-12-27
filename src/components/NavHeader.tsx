import React from "react";
import { View } from "react-native";
import {
  navHeader,
  navLoginHeader,
  navSignupHeader,
} from "../styles/components-styles/components.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appLogoFull, headerBackButton } from "../assets";
import { back } from "../navigate";
import Icon from "./Icon";
import { NavParamList } from "../navigation";
import Image from "./Image";
import { TextL, TextReg } from "./Text";
import I18n from "../utils/translation/translation";

export type NavHeaderProps = {
  historyFallBack: keyof NavParamList;
};

export const BackButton = ({ historyFallBack }: NavHeaderProps) => {
  const { leftBtnContainer } = navHeader;
  return (
    <TouchableOpacity
      onPress={() => back(historyFallBack)}
      style={leftBtnContainer}
      containerStyle={leftBtnContainer}>
      <Icon source={headerBackButton} />
    </TouchableOpacity>
  );
};

export const LoginHeader = ({ historyFallBack }: NavHeaderProps) => {
  const { header, appLogoContainer } = navLoginHeader;

  return (
    <View style={header}>
      <BackButton historyFallBack={historyFallBack} />
      <View style={appLogoContainer}>
        <Image source={appLogoFull} />
      </View>
    </View>
  );
};

export const SignupGetStartedHeader = () => {
  const { header, appLogoContainer } = navSignupHeader;
  return (
    <View style={header}>
      <View style={appLogoContainer}>
        <Image source={appLogoFull} />
      </View>
      <TextL title={I18n.t("signupNavHeaderLbl")} centered />
      <TextReg title={I18n.t("signupNavHeaderSlogan")} centered />
    </View>
  );
};

export const SignupHeader = ({ historyFallBack }: NavHeaderProps) => {
  return (
    <View>
      <BackButton historyFallBack={historyFallBack} />
    </View>
  );
};
