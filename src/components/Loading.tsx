import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { loading } from "../styles/components-styles/components.style";

export type LoadingProps = {
  dark?: boolean;
};

const Loading = ({ ...rest }: LoadingProps) => {
  const fadeDot1 = useRef(new Animated.Value(0)).current;
  const fadeDot2 = useRef(new Animated.Value(0)).current;
  const fadeDot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeDot1, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(fadeDot2, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(fadeDot3, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(fadeDot1, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(fadeDot2, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(fadeDot3, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const { container, loader } = loading({ ...rest });
  return (
    <View style={container}>
      <Animated.View
        style={[
          loader,
          {
            opacity: fadeDot1.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.5, 0],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          loader,
          {
            opacity: fadeDot2.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.5, 0],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          loader,
          {
            opacity: fadeDot3.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.5, 0],
            }),
          },
        ]}
      />
    </View>
  );
};

export default Loading;
