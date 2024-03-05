import { View } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { onBoardedTabs } from "../styles/onboardedtabs-styles/onboarded.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import {
  accommodationDisableIcon,
  accommodationEnableIcon,
  homeDisableIcon,
  homeEnableIcon,
  mapDisableIcon,
  mapEnableIcon,
  routesDisableIcon,
  routesEnableIcon,
  serviceDisableIcon,
  serviceEnableIcon,
} from "../assets";

type TabIconProps = {
  isFocused: boolean;
};

const icons: Record<string, ({ isFocused }: TabIconProps) => React.ReactNode> =
  {
    Home: ({ isFocused }) => (
      <Icon source={isFocused ? homeEnableIcon : homeDisableIcon} medium />
    ),
    Map: ({ isFocused }) => (
      <Icon source={isFocused ? mapEnableIcon : mapDisableIcon} medium />
    ),
    Routes: ({ isFocused }) => (
      <Icon source={isFocused ? routesEnableIcon : routesDisableIcon} medium />
    ),
    Accommodation: ({ isFocused }) => (
      <Icon
        source={isFocused ? accommodationEnableIcon : accommodationDisableIcon}
        medium
      />
    ),
    Service: ({ isFocused }) => (
      <Icon
        source={isFocused ? serviceEnableIcon : serviceDisableIcon}
        medium
      />
    ),
  };

const OnBoardedTabs = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { container, tab, lineMarker } = onBoardedTabs();

  return (
    <View style={container}>
      {state.routes.map((route, i) => {
        const isFocused = state.index === i;

        const onSwitchTab = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity key={route.key} style={tab} onPress={onSwitchTab}>
            {isFocused && <View style={lineMarker} />}
            {icons[route.name]({ isFocused })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OnBoardedTabs;
