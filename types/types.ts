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

export type ModalWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    bg?: string;
};

export type SkeletonProps = {
    width?: DimensionValue;
    height?: DimensionValue;
    //   orientation?: 'horizontal' | 'vertical';
    radius?: number;
    style?: ViewStyle;
};

export type TopSliderItemProps = {
  item: PostType;
  index: number;
  loading?: boolean;
  onPress?: (item: PostType) => void;
};

export type TopSliderProps = {
  data: PostType[];
  loading?: boolean;
  error?: string;
  onSelect?: (item: PostType) => void;
};

export type PostType = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url?: string;
    }[];
  };
};