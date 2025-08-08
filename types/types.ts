import React, { ReactNode } from "react";
import {
    DimensionValue,
    StyleProp,
    TextInput,
    TextInputProps,
    TextProps,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle
} from "react-native";

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    // bg?: string;
};

export type accountOptionType = {
    title: string;
    icon: React.ReactNode;
    bgColor: string;
    routeName?: any;
};

export type HeaderProps = {
    title?: string;
    style?: ViewStyle;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

export type TypoProps = {
    size?: number;
    color?: string;
    fontWeight?: TextStyle["fontWeight"];
    children: any | null;
    style?: TextStyle;
    textProps?: TextProps;
    numberOfLines? : number;
};

export type BackButtonProps = {
    style?: ViewStyle;
    iconSize?: number;
};

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    inputRef?: React.RefObject<TextInput>;
    // label?: string;
    // error?: string;
};

export interface CustomButtonProps extends TouchableOpacityProps {
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    loading?: boolean;
    //hasShadow?: boolean;
    children: React.ReactNode;
};

export type ReportListType = {
    data: CategoryType[];
    title?: string;
    loading: boolean;
    emptyListMessage?: string;
    error_network?: string
};

export type CategoryType = {
    id: number;
    name: string;
    slug: string;
    count: number;
    description?: string;
};

export type CategorySliderProps = {
    title?: string;
    data: CategoryType[];
    loading?: boolean;
    error?: string;
    onSelect?: (categoryId: number) => void;
    selectedCategoryId?: number | null;
    onCategoryChanged?: (categoryId: number) => void;
};

export type ReportItemProps = {
    item: CategoryType;
    index: number;
    handleClick: (item: CategoryType) => void;
};

export type ModalWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    bg?: string;
};

export type Coordinates = {
    latitude: number;
    longitude: number;
};

export type RootStackParamList = {
    AddReportScreen: {
        selectedLocation?: {
            latitude: number;
            longitude: number;
        };
    };
    LocationPicker: undefined;
};

export type SkeletonProps = {
    width?: DimensionValue;
    height?: DimensionValue;
    //   radius?: number;
    //   orientation?: 'horizontal' | 'vertical';
    radius?: number;
    style?: ViewStyle;
};

export type TopSliderItemProps = {
  item: any;
  index: number;
  onPress?: (id: number) => void;
};

export type TopSliderProps = {
  data: any[];
  loading?: boolean;
  error?: string;
  onSelect?: (id: number) => void;
};