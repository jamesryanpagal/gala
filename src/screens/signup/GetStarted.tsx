import { View } from "react-native";
import React from "react";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { SignupGetStartedHeader } from "../../components/NavHeader";
import { signup } from "../../styles/login-signup-styles/loginsignup.style";
import { back, navigate } from "../../navigate";
import I18n from "../../utils/translation/translation";
import { Button } from "../../components/Button";
import { TextReg } from "../../components/Text";
import Image from "../../components/Image";
import { joinJourneyImage } from "../../assets";

const GetStarted = () => {
  const { getStartedBodyContainer, getStartedFooterContainer } = signup;
  return (
    <SafeAreaContainer>
      <SignupGetStartedHeader />
      <View style={getStartedBodyContainer}>
        <Image source={joinJourneyImage} />
      </View>
      <View style={getStartedFooterContainer}>
        <Button onPress={() => navigate({ screen: "Signup" })}>
          <TextReg title={I18n.t("signupGetStartedLbl")} light />
        </Button>
        <Button link onPress={() => back("Welcome")}>
          <TextReg title={I18n.t("signupGetStartedBacktoLogin")} />
        </Button>
      </View>
    </SafeAreaContainer>
  );
};

export default GetStarted;
