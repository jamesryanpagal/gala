import React, { useState, useRef, useMemo } from "react";
import { View, TextInput } from "react-native";
import { Formik, FormikProps } from "formik";

import SafeAreaContainer from "../../components/SafeAreaContainer";
import { TextL, TextReg } from "../../components/Text";
import { form } from "../../styles/components-styles/components.style";
import Input from "../../components/Input";
import I18n from "../../utils/translation/translation";
import { Button } from "../../components/Button";
import KeyboardView from "../../components/KeyboardView";
import ContainerClickOutSide from "../../components/ContainerClickOutSide";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../components/Icon";
import { hidePassword, showPassword } from "../../assets";
import { SignupHeader } from "../../components/NavHeader";
import Container from "../../components/Container";
import {
  fullnameValidatonSchema,
  birthdateGenderValidationSchema,
  addressContactInformationValidationSchema,
  userDetailsValidationSchema,
} from "../../utils/regexp/schema";

export const enum STEPS {
  STEP1 = 1,
  STEP2,
  STEP3,
  STEP4,
}

export type FormFieldProps = {
  details: SignupFormValues;
  setDetails: React.Dispatch<React.SetStateAction<SignupFormValues>>;
  setStep: React.Dispatch<React.SetStateAction<STEPS>>;
};

export type SignupFormValues = {
  firstName: string;
  middle?: string;
  lastName?: string;
  birthdate: string;
  gender: "male" | "female";
  address: string;
  contactNum: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FullnameFormProps = Pick<
  SignupFormValues,
  "firstName" | "middle" | "lastName"
>;

export type BirthdateFormProps = Pick<SignupFormValues, "birthdate" | "gender">;

export type AddressContactInformationFormProps = Pick<
  SignupFormValues,
  "address" | "contactNum"
>;

export type UserDetailsFormProps = Pick<
  SignupFormValues,
  "username" | "email" | "password" | "confirmPassword"
>;

const FullnameForm = ({ details, setDetails, setStep }: FormFieldProps) => {
  const { firstName, middle, lastName } = details;
  const { formHeaderContainer, container } = form;

  const formRef = useRef<FormikProps<FullnameFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const initialValues: FullnameFormProps = {
    firstName,
    middle,
    lastName,
  };

  const onFormSubmit = (val: FullnameFormProps) => {
    setDetails(prev => ({ ...prev, ...val }));
    setStep(STEPS.STEP2);
  };
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={fullnameValidatonSchema}
      onSubmit={onFormSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => {
        const { firstName, middle, lastName } = values;
        const isComplete = !!firstName && !!lastName && isValid;
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupFullNameFormTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container>
                <ContainerClickOutSide>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("firstNameLbl")}
                    onChangeText={handleChange("firstName")}
                    value={firstName}
                    error={touched.firstName && !!errors.firstName}
                    onBlur={handleBlur("firstName")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    optional
                    label={I18n.t("middleLbl")}
                    onChangeText={handleChange("middle")}
                    value={middle}
                    error={touched.middle && !!errors.middle}
                    onBlur={handleBlur("middle")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[2].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[2] = ref)}
                    label={I18n.t("lastNameLbl")}
                    onChangeText={handleChange("lastName")}
                    value={lastName}
                    error={touched.lastName && !!errors.lastName}
                    onBlur={handleBlur("lastName")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[2].blur()}
                  />
                </ContainerClickOutSide>
              </Container>
              <Button disabled={!isComplete} onPress={handleSubmit}>
                <TextReg title={I18n.t("nextLbl")} light />
              </Button>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const BirthdateGenderForm = ({
  details,
  setDetails,
  setStep,
}: FormFieldProps) => {
  const { birthdate, gender } = details;
  const { formHeaderContainer, container, actionContainer } = form;

  const formRef = useRef<FormikProps<BirthdateFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const initialValues: BirthdateFormProps = {
    birthdate,
    gender,
  };

  const onFormSubmit = (val: BirthdateFormProps) => {
    setDetails(prev => ({ ...prev, ...val }));
    setStep(STEPS.STEP3);
  };
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={birthdateGenderValidationSchema}
      onSubmit={onFormSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => {
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupBirthdateFormTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container>
                <ContainerClickOutSide>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("birthdateLbl")}
                    onChangeText={handleChange("birthdate")}
                    placeholder="mm/dd/yyyy"
                    value={values.birthdate}
                    error={touched.birthdate && !!errors.birthdate}
                    onBlur={handleBlur("birthdate")}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    label={I18n.t("genderLbl")}
                    onChangeText={handleChange("gender")}
                    value={values.gender}
                    error={touched.gender && !!errors.gender}
                    onBlur={handleBlur("gender")}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    onSubmitEditing={() => inputRef.current[1].blur()}
                  />
                </ContainerClickOutSide>
              </Container>
              <View style={actionContainer}>
                <Button bordered flex onPress={() => setStep(STEPS.STEP1)}>
                  <TextReg title={I18n.t("previousLbl")} />
                </Button>
                <Button flex onPress={handleSubmit}>
                  <TextReg title={I18n.t("nextLbl")} light />
                </Button>
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const AddressContactInformationForm = ({
  details,
  setDetails,
  setStep,
}: FormFieldProps) => {
  const { address, contactNum } = details;
  const { formHeaderContainer, container, actionContainer } = form;

  const formRef = useRef<FormikProps<AddressContactInformationFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const initialValues: AddressContactInformationFormProps = {
    address,
    contactNum,
  };

  const onFormSubmit = (val: AddressContactInformationFormProps) => {
    setDetails(prev => ({ ...prev, ...val }));
    setStep(STEPS.STEP4);
  };
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={addressContactInformationValidationSchema}
      onSubmit={onFormSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => {
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupAddressAndContactInformationTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container>
                <ContainerClickOutSide>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("addressLbl")}
                    onChangeText={handleChange("address")}
                    value={values.address}
                    error={touched.address && !!errors.address}
                    onBlur={handleBlur("address")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    label={I18n.t("contactNumLbl")}
                    onChangeText={handleChange("contactNum")}
                    value={values.contactNum}
                    error={touched.contactNum && !!errors.contactNum}
                    onBlur={handleBlur("contactNum")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].blur()}
                  />
                </ContainerClickOutSide>
              </Container>
              <View style={actionContainer}>
                <Button bordered flex onPress={() => setStep(STEPS.STEP2)}>
                  <TextReg title={I18n.t("previousLbl")} />
                </Button>
                <Button flex onPress={handleSubmit}>
                  <TextReg title={I18n.t("nextLbl")} light />
                </Button>
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const UserDetailsForm = ({ details, setDetails, setStep }: FormFieldProps) => {
  const { username, email, password, confirmPassword } = details;
  const { formHeaderContainer, container, actionContainer } = form;

  const formRef = useRef<FormikProps<UserDetailsFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const initialValues: UserDetailsFormProps = {
    username,
    email,
    password,
    confirmPassword,
  };

  const onFormSubmit = (val: UserDetailsFormProps) => {
    setDetails(prev => ({ ...prev, ...val }));
  };
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={userDetailsValidationSchema}
      onSubmit={onFormSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => {
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupUserDetailsTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container scrollable>
                <ContainerClickOutSide>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("usernameLbl")}
                    onChangeText={handleChange?.("username")}
                    value={values?.username}
                    error={touched?.username && !!errors?.username}
                    onBlur={handleBlur?.("username")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    label={I18n.t("emailLbl")}
                    onChangeText={handleChange?.("email")}
                    value={values?.email}
                    error={touched?.email && !!errors?.email}
                    onBlur={handleBlur?.("email")}
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onSubmitEditing={() => inputRef.current[2].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[2] = ref)}
                    label={I18n.t("passwordLbl")}
                    onChangeText={handleChange?.("password")}
                    secureTextEntry={!isShowPassword}
                    value={values?.password}
                    error={touched?.password && !!errors?.password}
                    onBlur={handleBlur?.("password")}
                    textContentType="password"
                    returnKeyType="next"
                    suffix={
                      <TouchableOpacity
                        onPress={() => setIsShowPassword?.(prev => !prev)}>
                        <Icon
                          source={isShowPassword ? showPassword : hidePassword}
                        />
                      </TouchableOpacity>
                    }
                    onSubmitEditing={() => inputRef.current[3].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[3] = ref)}
                    label={I18n.t("confirmPasswordLbl")}
                    onChangeText={handleChange?.("confirmPassword")}
                    secureTextEntry={!isShowConfirmPassword}
                    value={values?.confirmPassword}
                    error={
                      touched?.confirmPassword && !!errors?.confirmPassword
                    }
                    onBlur={handleBlur?.("confirmPassword")}
                    textContentType="password"
                    returnKeyType="done"
                    suffix={
                      <TouchableOpacity
                        onPress={() =>
                          setIsShowConfirmPassword?.(prev => !prev)
                        }>
                        <Icon
                          source={
                            isShowConfirmPassword ? showPassword : hidePassword
                          }
                        />
                      </TouchableOpacity>
                    }
                    onSubmitEditing={() => inputRef.current[3].blur()}
                  />
                </ContainerClickOutSide>
              </Container>

              <View style={[actionContainer, { marginTop: 10 }]}>
                <Button bordered flex onPress={() => setStep(STEPS.STEP3)}>
                  <TextReg title={I18n.t("previousLbl")} />
                </Button>
                <Button flex onPress={handleSubmit}>
                  <TextReg title={I18n.t("signupLbl")} light />
                </Button>
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const Signup = () => {
  const [step, setStep] = useState<STEPS>(STEPS.STEP1);
  const [details, setDetails] = useState<SignupFormValues>({
    firstName: "",
    middle: "",
    lastName: "",
    birthdate: "",
    gender: "male",
    address: "",
    contactNum: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const renderFormField = useMemo(() => {
    switch (step) {
      case STEPS.STEP1:
        return (
          <FullnameForm
            details={details}
            setDetails={setDetails}
            setStep={setStep}
          />
        );
      case STEPS.STEP2:
        return (
          <BirthdateGenderForm
            details={details}
            setDetails={setDetails}
            setStep={setStep}
          />
        );
      case STEPS.STEP3:
        return (
          <AddressContactInformationForm
            details={details}
            setDetails={setDetails}
            setStep={setStep}
          />
        );
      case STEPS.STEP4:
        return (
          <UserDetailsForm
            details={details}
            setDetails={setDetails}
            setStep={setStep}
          />
        );
    }
  }, [details, step]);

  // const { onChangeText, onKeyPress } = useAutoComplete();

  return (
    <SafeAreaContainer>
      <SignupHeader historyFallBack="Welcome" />
      <KeyboardView>{renderFormField}</KeyboardView>
    </SafeAreaContainer>
  );
};

export default Signup;
