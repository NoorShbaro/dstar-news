import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
// import { TypoProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import { TypoProps } from '@/types/types';
import { useTheme } from '@/context/ThemeContext';

const Typo = ({
    size,
    color,
    fontWeight = '400',
    children,
    style,
    textProps = {}
}: TypoProps) => {

    const { theme, mode } = useTheme();

    const finalColor = color || theme.colors.textPrimary;
    const textStyle: TextStyle = {
        fontSize: size ? verticalScale(size) : verticalScale(18),
        color: finalColor,
        fontWeight
    }
    return (
        <Text style={[textStyle, style]} {...textProps}>
            {children}
        </Text>
    )
}

export default Typo

const styles = StyleSheet.create({})