import { useTheme } from '@/context/ThemeContext';
import { radius, spacingX, spacingY } from '@/types/theme';
import { CategorySliderProps, CategoryType } from '@/types/types';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { styles } from '../styles/categories.styles';
import Typo from './Typo';
import Skeleton from './skeleton';

const CategorySlider = ({
    title,
    data,
    loading,
    error,
    onSelect,
    selectedCategoryId,
}: CategorySliderProps) => {
    const { theme } = useTheme();
    // console.log('Selected Category ID:', selectedCategoryId);

    return (
        <View style={styles.container}>
            {title && <Typo size={20} fontWeight="500">{title}</Typo>}

            {loading && (
                <View style={{ flexDirection: 'row', marginBottom: spacingX._10, marginHorizontal: spacingX._10 }}>
                    <Skeleton height={spacingX._30} width={spacingY._100} radius={radius._10} />
                    <Skeleton height={spacingX._30} width={spacingY._100} radius={radius._10} style={{ marginLeft: spacingX._5 }} />
                    <Skeleton height={spacingX._30} width={spacingY._100} radius={radius._10} style={{ marginLeft: spacingX._5 }} />
                </View>
            )}

            {!loading && data.length > 0 && (
                <FlatList
                    horizontal
                    data={data}
                    extraData={selectedCategoryId}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <CategoryItem
                            item={item}
                            index={index}
                            onPress={() => onSelect?.(item.id)}
                            selected={item.id === selectedCategoryId}
                        />
                    )}
                    // estimatedItemSize={100}
                    contentContainerStyle={styles.slider}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                />
            )}

            {!loading && data.length === 0 && (
                <View style={{ marginTop: spacingY._15 }}>
                    <Typo
                        size={15}
                        color={theme.colors.textSecondary}
                        style={{ textAlign: 'center' }}
                    >
                        {error || 'No categories found'}
                    </Typo>
                </View>
            )}
        </View>
    );
};


const CategoryItem = ({
    item,
    index,
    onPress,
    selected = false,
}: {
    item: CategoryType;
    index: number;
    onPress?: (id: number) => void;
    selected?: boolean;
}) => {
    const { theme } = useTheme();


    return (
        <Animated.View
            entering={FadeInDown.delay(index * 70).springify().damping(30).stiffness(200)}
        >
            <TouchableOpacity
                style={[
                    styles.categoryCard,
                    {
                        backgroundColor: selected
                            ? theme.colors.accent
                            : theme.colors.surface,
                    },
                ]}
                onPress={() => onPress?.(item.id)}

            >
                <Typo
                    size={16}
                    fontWeight="500"
                    color={selected ? theme.colors.white : theme.colors.textPrimary}
                >
                    {item.name}
                </Typo>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CategorySlider;
