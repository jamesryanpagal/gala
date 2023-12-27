import React from "react";
import { View } from "react-native";

import { welcomeStyle } from "../../styles/welcome-styles/welcome.style";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import I18n from "../../utils/translation/translation";
import { TextReg } from "../../components/Text";
import {
  appLogoFull,
  fbSSOicon,
  googleSSOicon,
  welcomeImg,
} from "../../assets";
import { ButtonReg } from "../../components/Button";
import { navigate } from "../../navigate";
import Image from "../../components/Image";
import Icon from "../../components/Icon";

const Header = () => {
  const { header, appIconContainer } = welcomeStyle;
  return (
    <View style={header}>
      <View style={appIconContainer}>
        <Image source={appLogoFull} />
      </View>
      <TextReg title={I18n.t("slogan")} />
    </View>
  );
};

const Body = () => {
  const { body, welcomeImage } = welcomeStyle;
  return (
    <View style={body}>
      <View style={welcomeImage}>
        <Image source={welcomeImg} />
      </View>
    </View>
  );
};

const FooterSeparator = () => {
  const { separatorContainer, separatorLine } = welcomeStyle;
  return (
    <View style={separatorContainer}>
      <View style={separatorLine}></View>
      <TextReg title={I18n.t("footerSeparatorLbl")} />
      <View style={separatorLine}></View>
    </View>
  );
};

const FooterSSO = () => {
  const { ssoContainer, ssoBtn } = welcomeStyle;
  return (
    <View style={ssoContainer}>
      <View style={ssoBtn}>
        <Icon source={googleSSOicon} xl />
      </View>
      <View style={ssoBtn}>
        <Icon source={fbSSOicon} xl />
      </View>
    </View>
  );
};

const Footer = () => {
  const { footer } = welcomeStyle;
  const onLogin = () => {
    navigate({ screen: "Login" });
  };
  const onSignup = () => {
    navigate({ screen: "CreateAccount" });
  };
  return (
    <View style={footer}>
      <ButtonReg onPress={onLogin}>
        <TextReg title={I18n.t("loginLbl")} light />
      </ButtonReg>
      <ButtonReg bordered onPress={onSignup}>
        <TextReg title={I18n.t("createAccountLbl")} />
      </ButtonReg>
      <FooterSeparator />
      <FooterSSO />
    </View>
  );
};

const Welcome = () => {
  const { container } = welcomeStyle;
  return (
    <SafeAreaContainer noPadding>
      <View style={container}>
        <Header />
        <Body />
        <Footer />
      </View>
    </SafeAreaContainer>
  );
};

export default Welcome;
