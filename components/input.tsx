import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// import { InputProps } from '@/types'
// import { useTheme } from '@/contexts/ThemeContext';
// import { darkMode, lightMode, radius, spacingX } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { radius, spacingX } from '@/types/theme';
import { InputProps } from '@/types/types';
import { verticalScale } from '@/utils/styling';

const Input = (props: InputProps) => {

    const { theme, mode } = useTheme();

    return (
        <View
            style={[styles.container, props.containerStyle && props.containerStyle, { borderColor: theme.colors.primaryLight, flexDirection: 'row', }]}
        >
            {
                props.icon && props.icon
            }
            <TextInput
                style={[styles.input, { color: theme.colors.textPrimary },
                props.inputStyle
                ]}
                placeholderTextColor={theme.colors.textSecondary}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15,
        gap: spacingX._10
    },
    input: {
        flex: 1,
        fontSize: verticalScale(14),
    }
})