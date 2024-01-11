import React, { useState, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import Input from "../../components/Input";
import I18n from "../../utils/translation/translation";
import Icon from "../../components/Icon";
import { showPassword, hidePassword } from "../../assets";
import { Formik } from "formik";
import { Button } from "../../components/Button";
import { TextReg } from "../../components/Text";
import { form } from "../../styles/components-styles/components.style";
import { useLogin } from "../../utils/hooks/queries/useOnBoarding";
import KeyboardView from "../../components/KeyboardView";
import Cots from "../../components/ContainerClickOutSide";
import { LoginHeader } from "../../components/NavHeader";
import InvalidMessage from "../../components/InvalidMessage";
import Loader from "../../components/Loader";

export type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { container, invalidContainer } = form;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isInvalid = useMemo(() => err && <InvalidMessage title={err} />, [err]);

  const { mutateAsync: onLogin } = useLogin({
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      setErr(error.message);
    },
    onMutate: () => {
      setErr(null);
      setIsLoading(true);
    },
    onSettled: () => setIsLoading(false),
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: LoginFormValues) => {
    await onLogin(values);
  };

  return (
    <>
      <SafeAreaContainer>
        <LoginHeader historyFallBack="Welcome" />
        <View style={invalidContainer}>{isInvalid}</View>
        <KeyboardView>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, handleChange, values }) => {
              return (
                <View style={container}>
                  <Cots>
                    <Input
                      label={I18n.t("email")}
                      onChangeText={handleChange("email")}
                      value={values.email}
                    />
                    <Input
                      label={I18n.t("password")}
                      secureTextEntry={!isShowPassword}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      suffix={
                        <TouchableOpacity
                          onPress={() => setIsShowPassword(prev => !prev)}>
                          <Icon
                            source={
                              isShowPassword ? showPassword : hidePassword
                            }
                          />
                        </TouchableOpacity>
                      }
                    />
                  </Cots>
                  <Button onPress={handleSubmit} disabled={isLoading}>
                    <TextReg title={I18n.t("loginLbl")} light />
                  </Button>
                </View>
              );
            }}
          </Formik>
        </KeyboardView>
      </SafeAreaContainer>
      <Loader open={isLoading} />
    </>
  );
};

export default Login;
