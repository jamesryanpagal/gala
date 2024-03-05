import { useState, useMemo } from "react";
import { View, Text, TextInput } from "react-native";

export const FindIndexPosition = () => {
  const [inputValue, setInputValue] = useState({
    firstInputBox: "",
    secondInputBox: "",
  });

  const onInputChange = (key: keyof typeof inputValue) => (v: string) => {
    setInputValue(prev => ({ ...prev, [key]: v }));
  };

  const secondInputBoxIndex = useMemo(() => {
    let isIndexFound = false;
    let index: number = -1;
    const { firstInputBox, secondInputBox } = inputValue;

    if (!isIndexFound) {
      for (let i = 0; i < firstInputBox.length; i++) {
        if (firstInputBox[i] === secondInputBox) {
          if (index < 0) {
            isIndexFound = true;
            index = i + 1;
          }
        }
      }
    }

    return index;
  }, [inputValue]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          First InputBox:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            height: 50,
            width: "100%",
            borderRadius: 5,
            marginTop: 10,
            textAlign: "center",
          }}
          onChangeText={onInputChange("firstInputBox")}
        />
      </View>
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Second InputBox:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            height: 50,
            width: "100%",
            borderRadius: 5,
            marginTop: 10,
            textAlign: "center",
          }}
          maxLength={1}
          onChangeText={onInputChange("secondInputBox")}
        />
      </View>
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}>
        <Text>Second InputBox Index: </Text>
        {secondInputBoxIndex > -1 && (
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {secondInputBoxIndex}
          </Text>
        )}
      </View>
    </View>
  );
};

const ReverseOrderApp = () => {
  const [inputValue, setInputValue] = useState("");
  const onInputChange = (v: string) => setInputValue(() => v);

  const reversedValue = useMemo(() => {
    let value = "";

    if (!inputValue) {
      return value;
    }

    for (let index = inputValue.length; index > 0; index--) {
      value += inputValue[index - 1];
    }

    return value;
  }, [inputValue]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Enter some value:
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          height: 50,
          width: "90%",
          borderRadius: 5,
          marginTop: 10,
          textAlign: "center",
        }}
        onChangeText={onInputChange}
      />
      <View style={{ borderTopWidth: 1, marginTop: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Resversed value:
        </Text>
        <Text style={{ textAlign: "center" }}>{reversedValue}</Text>
      </View>
    </View>
  );
};
