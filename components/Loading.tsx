import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext';

const Loading = ({
    size = 'large',
    color,
}: ActivityIndicatorProps) => {
    const { theme } = useTheme();
    const finalColor = color || theme.colors.primary;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={size} color={finalColor} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})