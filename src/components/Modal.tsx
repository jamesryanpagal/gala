import { useRef, useEffect, PropsWithChildren } from "react";
import { View, Text, Animated } from "react-native";
import { modal } from "../styles/components-styles/components.style";
import { Button } from "./Button";
import Icon from "./Icon";
import { headerCloseIconBlack, headerCloseIconWhite } from "../assets";
import { COLORS } from "../utils/constants/colors";

export type ModalStyleProps = {
  dark?: boolean;
  transparent?: boolean;
};

export type ModalProps = PropsWithChildren &
  ModalStyleProps & {
    open: boolean;
    onClose?: () => void;
    header?: React.ReactNode;
  };

const Modal = ({
  children,
  open,
  dark,
  transparent,
  onClose,
  header,
}: ModalProps) => {
  const { container, contentContainer, contentHeader } = modal({
    dark,
    transparent,
  });
  const modalRef = useRef(new Animated.Value(0));

  useEffect(() => {
    if (!open) return;
    Animated.timing(modalRef.current, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [open]);

  const onModalClose = () => {};

  return (
    open && (
      <View style={[container]}>
        <Animated.View style={[contentContainer]}>
          {header || (
            <View style={[contentHeader]}>
              <Button rounded size="sm" bgColor={COLORS.transparent}>
                <Icon
                  source={dark ? headerCloseIconWhite : headerCloseIconBlack}
                />
              </Button>
            </View>
          )}
          {children}
        </Animated.View>
      </View>
    )
  );
};

export default Modal;
