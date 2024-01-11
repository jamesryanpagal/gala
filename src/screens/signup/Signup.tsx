import React, { useState, useRef, useMemo, useEffect, useReducer } from "react";
import { View, TextInput } from "react-native";
import { Formik, FormikProps } from "formik";

import SafeAreaContainer from "../../components/SafeAreaContainer";
import { TextL, TextReg } from "../../components/Text";
import { form } from "../../styles/components-styles/components.style";
import Input from "../../components/Input";
import I18n from "../../utils/translation/translation";
import { Button } from "../../components/Button";
import KeyboardView from "../../components/KeyboardView";
import Cots from "../../components/ContainerClickOutSide";
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
import {
  useAutoCompleteBirthdate,
  useAutoCompleteContactNum,
} from "../../utils/hooks/useAutoComplete";
import Dropdown from "../../components/Dropdown";
import { GENDER } from "../../utils/constants/data";
import { passwordRules } from "../../utils/helpers/rules";
import {
  useCityOrMunicipality,
  useProvince,
  useRegion,
} from "../../utils/hooks/queries/usePHPlaces";
import { useInfiniteList } from "../../utils/hooks/useInfiniteList";
import DropdownSearch, { DropDownData } from "../../components/DropdownSearch";

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
  gender: "1" | "0";
  region: string;
  province: string;
  cityOrMunicipality: string;
  contactNum: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type DropDownState = {
  dropDownRegions: DropDownData[];
  dropDownProvinces: DropDownData[];
  dropDownCitiesOrMunicipalities: DropDownData[];
  regionSearch: string;
  provinceSearch: string;
  cityOrMunicipalitySearch: string;
  regionCode: string;
  provinceCode: string;
};

export type UpdateAction = {
  type: "updateRegion" | "updateProvince" | "updateCitiesOrMunicipalities";
  payload: DropDownData[];
};

export type SearchAction = {
  type:
    | "searchRegion"
    | "searchProvince"
    | "searchCityOrMunicipality"
    | "saveRegionCode"
    | "saveProvinceCode";
  payload: string;
};

export type DropDownActions = UpdateAction | SearchAction;

export type FullnameFormProps = Pick<
  SignupFormValues,
  "firstName" | "middle" | "lastName"
>;

export type BirthdateFormProps = Pick<SignupFormValues, "birthdate" | "gender">;

export type AddressContactInformationFormProps = Pick<
  SignupFormValues,
  "region" | "contactNum" | "province" | "cityOrMunicipality"
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
                <Cots>
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
                </Cots>
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

  const { onChangeText, onKeyPress } = useAutoCompleteBirthdate();

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
        isValid,
      }) => {
        const { birthdate } = values;
        const isComplete = !!birthdate && isValid;
        const handleChangeText = onChangeText(handleChange("birthdate"));
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupBirthdateFormTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container>
                <Cots>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("birthdateLbl")}
                    onChangeText={handleChangeText}
                    onKeyPress={onKeyPress}
                    placeholder="mm/dd/yyyy"
                    value={values.birthdate}
                    error={touched.birthdate && !!errors.birthdate}
                    onBlur={handleBlur("birthdate")}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Dropdown
                    label={I18n.t("genderLbl")}
                    values={GENDER}
                    defualtValue={values.gender}
                    onChange={handleChange("gender")}
                  />
                </Cots>
              </Container>
              <View style={actionContainer}>
                <Button bordered flex onPress={() => setStep(STEPS.STEP1)}>
                  <TextReg title={I18n.t("previousLbl")} />
                </Button>
                <Button disabled={!isComplete} flex onPress={handleSubmit}>
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
  const { region, province, cityOrMunicipality, contactNum } = details;
  const { formHeaderContainer, container, actionContainer } = form;

  const formRef = useRef<FormikProps<AddressContactInformationFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const dropDownReducer = (state: DropDownState, actions: DropDownActions) => {
    const { type, payload } = actions;

    const onChangeState = (key: keyof DropDownState) => {
      return { ...state, [key]: payload };
    };

    switch (type) {
      case "updateRegion":
        return onChangeState("dropDownRegions");
      case "updateProvince":
        return onChangeState("dropDownProvinces");
      case "updateCitiesOrMunicipalities":
        return onChangeState("dropDownCitiesOrMunicipalities");
      case "searchRegion":
        return onChangeState("regionSearch");
      case "searchProvince":
        return onChangeState("provinceSearch");
      case "searchCityOrMunicipality":
        return onChangeState("cityOrMunicipalitySearch");
      case "saveRegionCode":
        return onChangeState("regionCode");
      case "saveProvinceCode":
        return onChangeState("provinceCode");
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(dropDownReducer, {
    dropDownRegions: [],
    dropDownProvinces: [],
    dropDownCitiesOrMunicipalities: [],
    regionSearch: "",
    provinceSearch: "",
    cityOrMunicipalitySearch: "",
    regionCode: "",
    provinceCode: "",
  });

  const {
    dropDownRegions,
    dropDownProvinces,
    dropDownCitiesOrMunicipalities,
    regionSearch,
    provinceSearch,
    cityOrMunicipalitySearch,
    regionCode,
    provinceCode,
  } = state;

  const {
    data: regions,
    isLoading: isLoadingRegions,
    isFetchingNextPage: isFetchingNextPageRegions,
    hasNextPage: regionsHasNextPage,
    fetchNextPage: fetchNextPageRegions,
  } = useRegion({ search: regionSearch });

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    isFetchingNextPage: isFetchingNextPageProvinces,
    hasNextPage: provincesHasNextPage,
    fetchNextPage: fetchNextPageProvinces,
  } = useProvince({
    search: provinceSearch,
    regionCode,
  });

  const {
    data: citiesOrMunicipalities,
    isLoading: isLoadingCitiesOrMunicipalities,
    isFetchingNextPage: isFetchingNextPageCitiesOrMunicipalities,
    hasNextPage: citiesOrMunicipalitiesHasNextPage,
    fetchNextPage: fetchNextPageCitiesOrMunicipalities,
  } = useCityOrMunicipality({
    search: cityOrMunicipalitySearch,
    regionCode,
    provinceCode,
  });

  useInfiniteList(regions, {
    onSuccess: data => {
      const list = data?.reduce((acc, c, _i, _arr) => {
        return (acc = [
          ...acc,
          {
            id: c.code,
            primaryLabel: c.regionname,
            secondaryLabel: c.region,
            value: c.code,
          },
        ]);
      }, [] as DropDownData[]);

      dispatch({ type: "updateRegion", payload: list || [] });
    },
  });

  useInfiniteList(provinces, {
    onSuccess: data => {
      const list = data?.reduce((acc, c, _i, _arr) => {
        return (acc = [
          ...acc,
          {
            id: c.code,
            primaryLabel: c.province,
            value: c.code,
          },
        ]);
      }, [] as DropDownData[]);

      dispatch({ type: "updateProvince", payload: list || [] });
    },
  });

  useInfiniteList(citiesOrMunicipalities, {
    onSuccess: data => {
      const list = data?.reduce((acc, c, _i, _arr) => {
        return (acc = [
          ...acc,
          {
            id: c.code,
            primaryLabel: c.cityormunicipality,
            value: c.code,
          },
        ]);
      }, [] as DropDownData[]);

      dispatch({ type: "updateCitiesOrMunicipalities", payload: list || [] });
    },
  });

  const { onChangeText, onKeyPress } = useAutoCompleteContactNum();

  const initialValues: AddressContactInformationFormProps = {
    region,
    province,
    cityOrMunicipality,
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
        isValid,
      }) => {
        const {
          region: regionVal,
          province: provinceVal,
          cityOrMunicipality: cityOrMunicipalityVal,
          contactNum: contactNumVal,
        } = values;
        const isComplete =
          !!regionVal &&
          !!provinceVal &&
          !!cityOrMunicipalityVal &&
          !!contactNum &&
          isValid;
        const isDisableProvince = !!regionVal && !!dropDownProvinces.length;

        // const handleChangeText = onChangeText(handleChange("contactNum"));

        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupAddressAndContactInformationTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container>
                <Cots>
                  <DropdownSearch
                    data={dropDownRegions}
                    value={regionVal}
                    label={I18n.t("regionLbl")}
                    loadingData={isLoadingRegions}
                    loadingNextPage={isFetchingNextPageRegions}
                    handleChange={v => {
                      handleChange("region")(v);
                      dispatch({ type: "saveRegionCode", payload: v });
                    }}
                    onSearch={v => {
                      dispatch({ type: "searchRegion", payload: v });
                    }}
                    onBlur={handleBlur("region")}
                    error={touched.region && !!errors.region}
                    {...(regionsHasNextPage && {
                      onLoadMore: () => fetchNextPageRegions(),
                    })}
                  />
                  <DropdownSearch
                    data={dropDownProvinces}
                    value={provinceVal}
                    label={I18n.t("provinceLbl")}
                    loadingData={isLoadingProvinces}
                    loadingNextPage={isFetchingNextPageProvinces}
                    handleChange={v => {
                      handleChange("province")(v);
                      dispatch({ type: "saveProvinceCode", payload: v });
                    }}
                    onSearch={v => {
                      dispatch({ type: "searchProvince", payload: v });
                    }}
                    onBlur={handleBlur("province")}
                    error={
                      isDisableProvince && touched.province && !!errors.province
                    }
                    {...(!provinceSearch && {
                      disabled: !isDisableProvince,
                    })}
                    {...(provincesHasNextPage && {
                      onLoadMore: () => fetchNextPageProvinces(),
                    })}
                  />
                  <DropdownSearch
                    data={dropDownCitiesOrMunicipalities}
                    value={cityOrMunicipalityVal}
                    label={I18n.t("citiesOrMunicipalitiesLbl")}
                    loadingData={isLoadingCitiesOrMunicipalities}
                    loadingNextPage={isFetchingNextPageCitiesOrMunicipalities}
                    handleChange={v => {
                      handleChange("cityOrMunicipality")(v);
                    }}
                    onSearch={v => {
                      dispatch({
                        type: "searchCityOrMunicipality",
                        payload: v,
                      });
                    }}
                    onBlur={handleBlur("cityOrMunicipality")}
                    error={
                      !!regionVal &&
                      touched.cityOrMunicipality &&
                      !!errors.cityOrMunicipality
                    }
                    {...(!cityOrMunicipalitySearch && {
                      disabled: !!!regionVal,
                    })}
                    {...(citiesOrMunicipalitiesHasNextPage && {
                      onLoadMore: () => fetchNextPageCitiesOrMunicipalities(),
                    })}
                  />
                  {/* <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    prefix={<TextReg title={I18n.t("contactNumPrefixLbl")} />}
                    label={I18n.t("contactNumLbl")}
                    onChangeText={handleChangeText}
                    onKeyPress={onKeyPress}
                    value={values.contactNum}
                    error={touched.contactNum && !!errors.contactNum}
                    onBlur={handleBlur("contactNum")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].blur()}
                  /> */}
                </Cots>
              </Container>
              <View style={actionContainer}>
                <Button bordered flex onPress={() => setStep(STEPS.STEP2)}>
                  <TextReg title={I18n.t("previousLbl")} />
                </Button>
                <Button disabled={!isComplete} flex onPress={handleSubmit}>
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
        isValid,
      }) => {
        const { username, email, password, confirmPassword } = values;
        const isComplete =
          !!username && !!email && !!password && !!confirmPassword && isValid;
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupUserDetailsTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <View style={container}>
              <Container scrollable>
                <Cots>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("usernameLbl")}
                    onChangeText={handleChange?.("username")}
                    value={values.username}
                    error={touched.username && !!errors?.username}
                    onBlur={handleBlur?.("username")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    label={I18n.t("emailLbl")}
                    onChangeText={handleChange?.("email")}
                    value={values.email}
                    error={touched.email && !!errors?.email}
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
                    value={values.password}
                    error={touched.password && !!errors?.password}
                    onBlur={handleBlur?.("password")}
                    textContentType="password"
                    returnKeyType="next"
                    {...(values.password && {
                      rules: passwordRules(values.password),
                    })}
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
                    value={values.confirmPassword}
                    error={touched.confirmPassword && !!errors?.confirmPassword}
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
                </Cots>
              </Container>

              <View style={[actionContainer, { marginTop: 10 }]}>
                <Button bordered flex onPress={() => setStep(STEPS.STEP3)}>
                  <TextReg title={I18n.t("previousLbl")} />
                </Button>
                <Button disabled={!isComplete} flex onPress={handleSubmit}>
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
    gender: "1",
    region: "",
    province: "",
    cityOrMunicipality: "",
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

  return (
    <SafeAreaContainer>
      <SignupHeader historyFallBack="Welcome" />
      <KeyboardView>{renderFormField}</KeyboardView>
    </SafeAreaContainer>
  );
};

export default Signup;
