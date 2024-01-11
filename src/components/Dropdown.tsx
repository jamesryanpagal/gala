import React, { useState, useMemo } from "react";
import { TouchableOpacity, View, Pressable } from "react-native";
import { dropDown } from "../styles/components-styles/components.style";
import { InputProps } from "./Input";
import I18n from "../utils/translation/translation";
import Icon from "./Icon";
import { dropdownExpandIcon, dropdownMinimizeIcon } from "../assets";
import { TextReg } from "./Text";
import Cots from "./ContainerClickOutSide";

type Value<T> = {
  label: string;
  value: T;
};

export type DropDownProps<T, K> = Pick<InputProps, "error" | "label"> & {
  values: T[];
  defualtValue: K;
  onChange: (prop: string) => void;
};

const Dropdown = <T extends Value<T["value"]>>({
  values,
  defualtValue,
  error,
  label,
  onChange,
}: DropDownProps<T, Value<T["value"]>["value"]>) => {
  const {
    container,
    listContainer,
    item,
    selectedItem,
    selectedItemText,
    contentContainer,
    valueContainer,
    valueText,
    suffixContainer,
  } = dropDown({
    error,
  });

  const [isOpen, setIsOpen] = useState(false);

  const defaultVal = useMemo(() => {
    return (
      values.find(v => v.value === defualtValue)?.label ||
      I18n.t("errInvalidDropdownValueLbl")
    );
  }, [defualtValue, values]);

  const onToggle = () => setIsOpen(prev => !prev);

  const onSelectedItem = (val: string) => {
    onChange(val);
  };

  return (
    <Cots onClickOutSide={() => setIsOpen(false)}>
      <View style={container}>
        <TextReg
          title={label}
          visibility={0.6}
          {...(error ? { danger: true } : { dark: true })}
        />
        <Pressable
          onPress={() => setIsOpen(prev => !prev)}
          style={contentContainer}>
          <View style={valueContainer}>
            <TextReg style={valueText} title={defaultVal} />
          </View>
          <View style={suffixContainer}>
            <Icon source={isOpen ? dropdownMinimizeIcon : dropdownExpandIcon} />
          </View>
        </Pressable>
        {isOpen && (
          <View style={listContainer}>
            {values.map((v, i) => {
              const isSelected = v.value === defualtValue;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    item,
                    {
                      ...(isSelected && selectedItem),
                    },
                  ]}
                  onPress={() => onSelectedItem(v.value as string)}>
                  <TextReg
                    title={v.label}
                    style={[valueText, { ...(isSelected && selectedItemText) }]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </Cots>
  );
};

export default Dropdown;
