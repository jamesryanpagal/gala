import React, { ForwardedRef } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { input } from "../styles/components-styles/components.style";
import { TextReg } from "./Text";
import { COLORS } from "../utils/constants/colors";
import I18n from "../utils/translation/translation";

export type Message = {
  type: "error" | "info" | "warning";
  title: string;
};

export type InputProps = TextInputProps & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  message?: Message;
  optional?: boolean;
  error?: boolean;
  label: string;
  forwardedRef?: ForwardedRef<TextInput>;
};

const Input = ({
  prefix,
  suffix,
  message,
  optional,
  label,
  error,
  forwardedRef,
  ...rest
}: InputProps) => {
  const {
    container,
    labelContainer,
    fieldContainer,
    iconContainer,
    field,
    invalidContainer,
  } = input({ error });
  return (
    <View style={container}>
      <View style={labelContainer}>
        <TextReg
          title={label}
          visibility={0.6}
          {...(error ? { danger: true } : { dark: true })}
        />
        {optional && <TextReg title={I18n.t("optionalLbl")} visibility={0.5} />}
      </View>
      <View style={fieldContainer}>
        {!!prefix && <View style={iconContainer}>{prefix}</View>}
        <TextInput
          ref={forwardedRef}
          {...rest}
          placeholderTextColor={COLORS.cottonSeed}
          selectionColor={COLORS.carbonGrey}
          style={field}
        />
        {!!suffix && <View style={iconContainer}>{suffix}</View>}
      </View>
      {!!message && (
        <View style={invalidContainer}>
          {/* <TextReg title={invalid} danger /> */}
        </View>
      )}
    </View>
  );
};

export default React.forwardRef<TextInput, InputProps>((props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
