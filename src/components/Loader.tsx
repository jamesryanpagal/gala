import { useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import React from "react";
import Modal, { ModalProps } from "./Modal";
import { loader } from "../styles/components-styles/components.style";

export type LoaderProps = Pick<ModalProps, "open">;

const Loader = ({ open }: LoaderProps) => {
  const { container, line } = loader;

  const lineRef1 = useRef(new Animated.Value(0));
  const lineRef2 = useRef(new Animated.Value(0));
  const lineRef3 = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineRef1.current, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),

        Animated.timing(lineRef2.current, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),

        Animated.timing(lineRef3.current, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Modal open={open} header={<></>} transparent>
      <View style={container}>
        <Animated.View
          style={[
            line,
            {
              transform: [
                {
                  translateY: lineRef1.current.interpolate({
                    inputRange: [0, 5, 10],
                    outputRange: [0, -10, 0],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            line,
            {
              transform: [
                {
                  translateY: lineRef2.current.interpolate({
                    inputRange: [0, 5, 10],
                    outputRange: [0, -10, 0],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            line,
            {
              transform: [
                {
                  translateY: lineRef3.current.interpolate({
                    inputRange: [0, 5, 10],
                    outputRange: [0, -10, 0],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </Modal>
  );
};

export default Loader;
