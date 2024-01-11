import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

export const enum NATIVE_KEY {
  BACKSPACE = "Backspace",
}

export const useAutoCompleteBirthdate = () => {
  let nativeKey: string = "";

  const onChangeText =
    (handleChange: (field: string) => void) => (inputValue: string) => {
      if (inputValue.length > 10) return;

      if (nativeKey === NATIVE_KEY.BACKSPACE) {
        handleChange(inputValue);
        return;
      }

      const valueArr = inputValue.split("");

      if (inputValue.at(1) && inputValue.at(2) !== "/") {
        valueArr.splice(2, 0, "/");
      }

      if (inputValue.at(4) && inputValue.at(5) !== "/") {
        valueArr.splice(5, 0, "/");
      }

      handleChange(valueArr.join(""));
    };

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
    (nativeKey = e.nativeEvent.key);

  return {
    onChangeText,
    onKeyPress,
  };
};

export const useAutoCompleteContactNum = () => {
  let nativeKey = "";

  const onChangeText =
    (handleChange: (field: string) => void) => (inputValue: string) => {
      if (inputValue.length > 12) return;

      if (nativeKey === NATIVE_KEY.BACKSPACE) {
        handleChange(inputValue);
        return;
      }

      const valueArr = inputValue.split("");

      if (inputValue.at(0) === "0") {
        valueArr.splice(0, 1);
      }

      if (inputValue.at(2) && inputValue.at(3) !== " ") {
        valueArr.splice(3, 0, " ");
      }

      if (inputValue.at(6) && inputValue.at(7) !== " ") {
        valueArr.splice(7, 0, " ");
      }

      handleChange(valueArr.join(""));
    };

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
    (nativeKey = e.nativeEvent.key);

  return {
    onChangeText,
    onKeyPress,
  };
};
