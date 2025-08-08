import { useTheme } from '@/context/ThemeContext';
import { spacingX } from '@/types/theme';
import { SkeletonProps } from '@/types/types';
import React from 'react';
import { View } from 'react-native';

const Skeleton = ({
    width = '100%',
    height = '100%',
    radius = 20,
    style
}: SkeletonProps) => {
    const { theme } = useTheme();

    const baseColor = theme.colors.skeletonBase;

    return (
        <View
            style={[{
                width,
                height,
                borderRadius: radius,
                backgroundColor: baseColor,
                overflow: 'hidden',
            }, style]}
        >
        </View>
    );
};

export default Skeleton;
