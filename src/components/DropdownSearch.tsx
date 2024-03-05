import { useState, useMemo, useEffect, useCallback, memo } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  TextInputFocusEventData,
  View,
} from "react-native";
import { dropdownSearch } from "../styles/components-styles/components.style";
import Cots from "./ContainerClickOutSide";
import Input, { InputProps } from "./Input";
import Icon from "./Icon";
import { dropdownExpandIcon, dropdownMinimizeIcon } from "../assets";
import { TextReg, TextS } from "./Text";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import I18n from "../utils/translation/translation";
import { Button } from "./Button";
import EmptyList from "./EmptyList";
import { LoaderIndicator } from "./Loader";
import { useDeferred } from "../utils/hooks/useDeferred";

export type DropDownData = {
  id: string | number;
  primaryLabel: string;
  secondaryLabel?: string;
  value: string;
};

export type DropdownSearchProps<T, V> = InputProps & {
  value: V;
  data: T[];
  onLoadMore?: () => void;
  onSearch?: (params: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleChange?: (value: string) => void;
  loadingNextPage?: boolean;
  loadingData?: boolean;
  clearSearch?: boolean;
};

const DropdownSearch = <T extends DropDownData>({
  value,
  data,
  onLoadMore,
  onSearch,
  onBlur,
  handleChange,
  loadingData,
  loadingNextPage,
  clearSearch,
  ...rest
}: DropdownSearchProps<T, T["value"]>) => {
  const {
    container,
    listContainer,
    list,
    listItem,
    listItemDivider,
    footerContainer,
    loaderContainer,
  } = dropdownSearch;

  const [search, setSearch] = useState("");
  const [isShowList, setIsShowList] = useState(false);

  const searched = useDeferred(search);

  useEffect(() => {
    onSearch?.(searched || "");
  }, [searched]);

  useEffect(() => {
    const initialInputValue = data.find(d => d.value === value);

    if (!initialInputValue) return;

    setSearch(initialInputValue.primaryLabel);
  }, [value, data]);

  useEffect(() => {
    if (!clearSearch) return;
    setSearch("");
  }, [clearSearch]);

  const valueOnBlur = useCallback(() => {
    const checkSearchValue = data.find(d => {
      const primaryLabel = d.primaryLabel.toLowerCase();
      const secondaryLabel = d.secondaryLabel?.toLowerCase();
      const searchVal = search.toLowerCase();
      return (
        primaryLabel === searchVal ||
        (secondaryLabel && secondaryLabel === searchVal)
      );
    });

    if (checkSearchValue) {
      handleChange?.(checkSearchValue.value);
      return;
    }

    setSearch("");
  }, [data, search]);

  const renderItem = useMemo(
    () =>
      (
        {
          item: { primaryLabel, secondaryLabel, value },
          index,
        }: ListRenderItemInfo<DropDownData>,
        lastIndex: number,
      ) => {
        const hasBottomBorder = index !== lastIndex - 1;
        return (
          <Pressable
            onPress={() => {
              handleChange?.(value);
              setIsShowList(false);
            }}
            style={[listItem, hasBottomBorder && listItemDivider]}>
            <TextS numberOfLines={1} style={{ flex: 1 }} title={primaryLabel} />
            {secondaryLabel && <TextS title={secondaryLabel} />}
          </Pressable>
        );
      },
    [data],
  );

  const renderList = useMemo(() => {
    if (loadingData && !data.length) {
      return (
        <View style={loaderContainer}>
          <LoaderIndicator sm dark />
        </View>
      );
    }

    return !!data.length ? (
      <>
        <View style={list}>
          <FlashList
            data={data}
            renderItem={props => renderItem(props, data.length)}
            estimatedItemSize={320}
          />
        </View>
        {!!onLoadMore && (
          <View style={footerContainer}>
            <Button reg onPress={onLoadMore}>
              {loadingNextPage ? (
                <LoaderIndicator sm />
              ) : (
                <TextReg title={I18n.t("addressLoadMoreLbl")} light />
              )}
            </Button>
          </View>
        )}
      </>
    ) : (
      <EmptyList />
    );
  }, [loadingData, loadingNextPage, data]);

  return (
    <Cots onClickOutSide={() => setIsShowList(false)}>
      <View style={container}>
        <Input
          {...rest}
          value={search}
          suffix={
            <Pressable onPress={() => setIsShowList(prev => !prev)}>
              <Icon
                source={isShowList ? dropdownMinimizeIcon : dropdownExpandIcon}
              />
            </Pressable>
          }
          onFocus={() => setIsShowList(true)}
          onChangeText={v => {
            handleChange?.("");
            setIsShowList(true);
            setSearch(v);
          }}
          onBlur={e => {
            onBlur?.(e);
            valueOnBlur();
          }}
        />
        {isShowList && <View style={listContainer}>{renderList}</View>}
      </View>
    </Cots>
  );
};

export default memo(DropdownSearch);
