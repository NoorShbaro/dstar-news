import React, { ReactNode } from "react";
import {
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
    data: ReportType[];
    title?: string;
    loading: boolean;
    emptyListMessage?: string;
    error_network?: string
};

export type ReportType = {
    id: number;
    citizen_id: number | string;
    title: string;
    description: string;
    status: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
    media: any[];
};

export type ReportItemProps = {
    item: ReportType;
    index: number;
    handleClick: (item: ReportType) => void;
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
