import { useTheme } from '@/context/ThemeContext';
import { ScreenWrapperProps } from '@/types/types';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 50;
    const { theme, mode } = useTheme();
    const isLightMode = mode ? 'light' : 'dark';
    return (
        <View
            style={[
                {
                    paddingTop,
                    flex: 1,
                    backgroundColor: theme.colors.background
                },
                style
            ]}
        >
            {/* <StatusBar barStyle={isLightMode ? 'light-content' : 'dark-content'} backgroundColor={currentColors.neutral900} /> */}

            {children}
        </View>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({})