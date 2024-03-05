import React, { useState, useRef, useMemo, useCallback } from "react";
import { View, TextInput } from "react-native";
import { Formik, FormikProps } from "formik";

import SafeAreaContainer from "../../components/SafeAreaContainer";
import { TextL, TextReg } from "../../components/Text";
import { form } from "../../styles/components-styles/components.style";
import Input from "../../components/Input";
import I18n from "../../utils/translation/translation";
import { Button } from "../../components/Button";
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
import { useSignup } from "../../utils/hooks/queries/useOnBoarding";
import { LoaderIndicator } from "../../components/Loader";
import { useMultipleState } from "../../utils/hooks/useMultipleState";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/redux/slices/userSlice";
import { AppDispatch } from "../../utils/redux/store";
import KeyboardView from "../../components/KeyboardView";

export const enum STEPS {
  STEP1 = 1,
  STEP2,
  STEP3,
  STEP4,
}

export type FormFieldProps = {
  details: SignupFormValues;
  setDetails: React.Dispatch<Partial<SignupFormValues>>;
  setStep: React.Dispatch<React.SetStateAction<STEPS>>;
};

export type SignupFormValues = {
  firstname: string;
  middle?: string;
  lastname?: string;
  birthdate: string;
  gender: "1" | "0";
  region: string;
  province: string;
  cityormunicipality: string;
  cellphonenum: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupForm = Omit<SignupFormValues, "confirmPassword">;

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

export type FullnameFormProps = Pick<
  SignupFormValues,
  "firstname" | "middle" | "lastname"
>;

export type BirthdateFormProps = Pick<SignupFormValues, "birthdate" | "gender">;

export type AddressContactInformationFormProps = Pick<
  SignupFormValues,
  "region" | "cellphonenum" | "province" | "cityormunicipality"
>;

export type UserDetailsFormProps = Pick<
  SignupFormValues,
  "username" | "email" | "password" | "confirmPassword"
>;

export type SearchType = "region" | "province" | "cityormunicipality";

export type DropDownKey = keyof DropDownState;

const FullnameForm = ({ details, setDetails, setStep }: FormFieldProps) => {
  const { firstname, middle, lastname } = details;
  const { formHeaderContainer, container } = form({});

  const formRef = useRef<FormikProps<FullnameFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const initialValues: FullnameFormProps = {
    firstname,
    middle,
    lastname,
  };

  const onFormSubmit = (val: FullnameFormProps) => {
    setDetails({ ...val });
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
        const {
          firstname: firstnameVal,
          middle: middleVal,
          lastname: lastnameVal,
        } = values;
        const isComplete = !!firstnameVal && !!lastnameVal && isValid;

        console.log("fullname");

        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupFullNameFormTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <KeyboardView>
              {/* <View style={{ borderWidth: 1, borderColor: "red", flex: 1 }}> */}
              <Container scrollable flexContent>
                <Cots>
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                </Cots>
              </Container>
              {/* </View> */}
              {/* <Container scrollable flexContent>
                <Cots>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("firstNameLbl")}
                    onChangeText={handleChange("firstname")}
                    value={firstnameVal}
                    error={touched.firstname && !!errors.firstname}
                    onBlur={handleBlur("firstname")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    optional
                    label={I18n.t("middleLbl")}
                    onChangeText={handleChange("middle")}
                    value={middleVal}
                    error={touched.middle && !!errors.middle}
                    onBlur={handleBlur("middle")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[2].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[2] = ref)}
                    label={I18n.t("lastNameLbl")}
                    onChangeText={handleChange("lastname")}
                    value={lastnameVal}
                    error={touched.lastname && !!errors.lastname}
                    onBlur={handleBlur("lastname")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[2].blur()}
                  />
                </Cots>
              </Container> */}
            </KeyboardView>
            <Button
              // disabled={!isComplete}
              // onPress={handleSubmit}
              onPress={() => setStep(STEPS.STEP2)}>
              <TextReg title={I18n.t("nextLbl")} light />
            </Button>
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
  const { formHeaderContainer, container, actionContainer } = form({});

  const formRef = useRef<FormikProps<BirthdateFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const { onChangeText, onKeyPress } = useAutoCompleteBirthdate();

  const initialValues: BirthdateFormProps = {
    birthdate,
    gender,
  };

  const onFormSubmit = (val: BirthdateFormProps) => {
    setDetails({ ...val });
    setStep(STEPS.STEP3);
  };

  console.log("birthdate");
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
        const { birthdate: birthdateVal } = values;
        const isComplete = !!birthdateVal && isValid;
        const handleChangeText = onChangeText(handleChange("birthdate"));
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupBirthdateFormTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <KeyboardView>
              {/* <View style={{ borderWidth: 1, borderColor: "red", flex: 1 }}> */}
              <Container scrollable flexContent>
                <Cots>
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                </Cots>
              </Container>
              {/* </View> */}
              {/* <Container>
                <Cots>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("birthdateLbl")}
                    onChangeText={handleChangeText}
                    onKeyPress={onKeyPress}
                    placeholder="mm/dd/yyyy"
                    value={birthdateVal}
                    error={touched.birthdate && !!errors.birthdate}
                    onBlur={handleBlur("birthdate")}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    onSubmitEditing={() => inputRef.current[0].blur()}
                  />
                  <Dropdown
                    label={I18n.t("genderLbl")}
                    values={GENDER}
                    defualtValue={values.gender}
                    onChange={handleChange("gender")}
                  />
                </Cots>
              </Container> */}
            </KeyboardView>
            <View style={actionContainer}>
              <Button bordered flex onPress={() => setStep(STEPS.STEP1)}>
                <TextReg title={I18n.t("previousLbl")} />
              </Button>
              <Button
                // disabled={!isComplete}
                flex
                // onPress={handleSubmit}
                onPress={() => setStep(STEPS.STEP3)}>
                <TextReg title={I18n.t("nextLbl")} light />
              </Button>
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
  const { region, province, cityormunicipality, cellphonenum } = details;
  const { formHeaderContainer, container, actionContainer } = form({});

  const formRef = useRef<FormikProps<AddressContactInformationFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const [state, setState] = useMultipleState<DropDownState>({
    dropDownRegions: [],
    dropDownProvinces: [],
    dropDownCitiesOrMunicipalities: [],
    regionSearch: "",
    provinceSearch: "",
    cityOrMunicipalitySearch: "",
    regionCode: region || "",
    provinceCode: province || "",
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
  } = useRegion(region ? { initialCode: region } : { search: regionSearch });

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    isFetchingNextPage: isFetchingNextPageProvinces,
    hasNextPage: provincesHasNextPage,
    fetchNextPage: fetchNextPageProvinces,
  } = useProvince(
    province
      ? { initialCode: province }
      : {
          search: provinceSearch,
          regionCode,
        },
  );

  const {
    data: citiesOrMunicipalities,
    isLoading: isLoadingCitiesOrMunicipalities,
    isFetchingNextPage: isFetchingNextPageCitiesOrMunicipalities,
    hasNextPage: citiesOrMunicipalitiesHasNextPage,
    fetchNextPage: fetchNextPageCitiesOrMunicipalities,
  } = useCityOrMunicipality(
    cityormunicipality
      ? { initialCode: cityormunicipality }
      : {
          search: cityOrMunicipalitySearch,
          regionCode,
          provinceCode,
        },
  );

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

      setState({ dropDownRegions: list || [] });
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

      setState({ dropDownProvinces: list || [] });
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

      setState({ dropDownCitiesOrMunicipalities: list || [] });
    },
  });

  const { onChangeText, onKeyPress } = useAutoCompleteContactNum();

  const initialValues: AddressContactInformationFormProps = {
    region,
    province,
    cityormunicipality,
    cellphonenum,
  };

  const onFormSubmit = (val: AddressContactInformationFormProps) => {
    setDetails({ ...val });
    setStep(STEPS.STEP4);
  };

  const onClearDetails = (searchtype?: SearchType) => {
    switch (searchtype) {
      case "region":
        setDetails({
          region: "",
          province: "",
          cityormunicipality: "",
        });
        setState({
          provinceSearch: "",
          cityOrMunicipalitySearch: "",
          regionCode: "",
          provinceCode: "",
        });
        formRef.current?.setValues(prev => ({
          ...prev,
          province: "",
          cityormunicipality: "",
        }));
        break;
      case "province":
        setDetails({ province: "", cityormunicipality: "" });
        setState({
          cityOrMunicipalitySearch: "",
          provinceCode: "",
        });
        formRef.current?.setValues(prev => ({
          ...prev,
          cityormunicipality: "",
        }));
        break;
      case "cityormunicipality":
        setDetails({ cityormunicipality: "" });
        break;
      default:
        break;
    }
  };

  const onSearch = useCallback(
    (
        stateKey: keyof DropDownState,
        initialVal?: string,
        currVal?: string,
        searchtype?: SearchType,
      ) =>
      (v: string) => {
        if (initialVal && initialVal !== currVal) {
          onClearDetails(searchtype);
        }
        setState({ [stateKey]: v });
      },
    [],
  );

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
          cityormunicipality: cityOrMunicipalityVal,
          cellphonenum: contactNumVal,
        } = values;

        const isComplete =
          !!regionVal && !!cityOrMunicipalityVal && !!contactNumVal && isValid;
        const isDisableProvince = !!regionVal && !!dropDownProvinces.length;

        const handleChangeText = onChangeText(handleChange("cellphonenum"));

        const onChange = useCallback(
          (key: string, stateKey?: keyof DropDownState) => (v: string) => {
            handleChange(key)(v);

            if (!stateKey) return;
            setState({ [stateKey]: v });
          },
          [],
        );

        console.log("Address");

        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupAddressAndContactInformationTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>

            <KeyboardView>
              {/* <View style={{ borderWidth: 1, borderColor: "red", flex: 1 }}> */}
              <Container scrollable flexContent>
                <Cots>
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                </Cots>
              </Container>
              {/* </View> */}
              {/* <Container scrollable flexContent>
                <Cots style={{ borderWidth: 1, borderColor: "red" }}>
                  <DropdownSearch
                    data={dropDownRegions}
                    value={regionVal}
                    label={I18n.t("regionLbl")}
                    loadingData={isLoadingRegions}
                    loadingNextPage={isFetchingNextPageRegions}
                    handleChange={onChange("region", "regionCode")}
                    onSearch={onSearch(
                      "regionSearch",
                      region,
                      regionVal,
                      "region",
                    )}
                    onBlur={handleBlur("region")}
                    clearSearch={!regionVal}
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
                    handleChange={onChange("province", "provinceCode")}
                    onSearch={onSearch(
                      "provinceSearch",
                      province,
                      provinceVal,
                      "province",
                    )}
                    onBlur={handleBlur("province")}
                    clearSearch={!!regionVal}
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
                    handleChange={onChange("cityormunicipality")}
                    onSearch={onSearch(
                      "cityOrMunicipalitySearch",
                      cityormunicipality,
                      cityOrMunicipalityVal,
                      "cityormunicipality",
                    )}
                    onBlur={handleBlur("cityormunicipality")}
                    clearSearch={!!provinceVal && !!regionVal}
                    error={
                      !!regionVal &&
                      touched.cityormunicipality &&
                      !!errors.cityormunicipality
                    }
                    {...(!cityOrMunicipalitySearch && {
                      disabled: !!!regionVal,
                    })}
                    {...(citiesOrMunicipalitiesHasNextPage && {
                      onLoadMore: () => fetchNextPageCitiesOrMunicipalities(),
                    })}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    prefix={<TextReg title={I18n.t("contactNumPrefixLbl")} />}
                    label={I18n.t("contactNumLbl")}
                    onChangeText={handleChangeText}
                    onKeyPress={onKeyPress}
                    value={contactNumVal}
                    error={touched.cellphonenum && !!errors.cellphonenum}
                    onBlur={handleBlur("cellphonenum")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].blur()}
                  />
                </Cots>
              </Container> */}
            </KeyboardView>
            <View style={actionContainer}>
              <Button bordered flex onPress={() => setStep(STEPS.STEP2)}>
                <TextReg title={I18n.t("previousLbl")} />
              </Button>
              <Button
                // disabled={!isComplete}
                flex
                // onPress={handleSubmit}
                onPress={() => setStep(STEPS.STEP4)}>
                <TextReg title={I18n.t("nextLbl")} light />
              </Button>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const UserDetailsForm = ({ details, setStep }: FormFieldProps) => {
  const { username, email, password, confirmPassword } = details;
  const { formHeaderContainer, container, actionContainer } = form({});

  const formRef = useRef<FormikProps<UserDetailsFormProps>>(null);
  const inputRef = useRef<TextInput[]>([]);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { mutateAsync: onSignup } = useSignup({
    onError: err => {
      console.log("err: ", err);
    },
    onSuccess: data => {
      if (!!!data.response) return;

      const { token, user } = data.response;
      dispatch(setUser({ token, user }));
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const initialValues: UserDetailsFormProps = {
    username,
    email,
    password,
    confirmPassword,
  };

  const onFormSubmit = async (val: UserDetailsFormProps) => {
    const { confirmPassword: cnfrmPswrd, ...rest } = val;
    const { confirmPassword, ...restDetails } = details;
    await onSignup({ ...restDetails, ...rest });
  };

  console.log("users");

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
        const {
          username: usernameVal,
          email: emailVal,
          password: passwordVal,
          confirmPassword: confirmPasswordVal,
        } = values;
        const isComplete =
          !!usernameVal &&
          !!emailVal &&
          !!passwordVal &&
          !!confirmPasswordVal &&
          isValid;
        return (
          <>
            <View style={formHeaderContainer}>
              <TextL title={I18n.t("signupUserDetailsTxt")} />
              <TextReg title={I18n.t("signupFormFillOutTxt")} />
            </View>
            <KeyboardView>
              {/* <View style={{ borderWidth: 1, borderColor: "red", flex: 1 }}> */}
              <Container scrollable flexContent>
                <Cots>
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                  <Input label="Text here..." />
                </Cots>
              </Container>
              {/* </View> */}
              {/* <Container scrollable flexContent>
                <Cots>
                  <Input
                    ref={ref => ref && (inputRef.current[0] = ref)}
                    label={I18n.t("usernameLbl")}
                    onChangeText={handleChange?.("username")}
                    value={usernameVal}
                    error={touched.username && !!errors?.username}
                    onBlur={handleBlur?.("username")}
                    returnKeyType="next"
                    onSubmitEditing={() => inputRef.current[1].focus()}
                  />
                  <Input
                    ref={ref => ref && (inputRef.current[1] = ref)}
                    label={I18n.t("emailLbl")}
                    onChangeText={handleChange?.("email")}
                    value={emailVal}
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
                    value={passwordVal}
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
                    value={confirmPasswordVal}
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
              </Container> */}
            </KeyboardView>
            <View style={[actionContainer, { marginTop: 10 }]}>
              <Button bordered flex onPress={() => setStep(STEPS.STEP3)}>
                <TextReg title={I18n.t("previousLbl")} />
              </Button>
              <Button
                // disabled={!isComplete || loading}
                flex
                // onPress={handleSubmit}
              >
                {loading ? (
                  <LoaderIndicator sm />
                ) : (
                  <TextReg title={I18n.t("signupLbl")} light />
                )}
              </Button>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const Signup = () => {
  const [step, setStep] = useState<STEPS>(STEPS.STEP1);
  const [details, setDetails] = useMultipleState<SignupFormValues>({
    firstname: "",
    middle: "",
    lastname: "",
    birthdate: "",
    gender: "1",
    region: "",
    province: "",
    cityormunicipality: "",
    cellphonenum: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // TODO : make renderFormField returns object of header ( form header ) and form ( actuaal form )
  // TODO : after doing 1 remove header from every form
  // TODO : the root will have <>{renderForm.header}<KeyboardView>{renderForm.form}</KeyboardView></>

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
      {/* <SignupHeader historyFallBack="Welcome" /> */}
      {renderFormField}
    </SafeAreaContainer>
  );
};

export default Signup;
