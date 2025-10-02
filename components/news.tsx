import { useTheme } from '@/context/ThemeContext';
import styles from '@/styles/news.styles';
import { radius, spacingX, spacingY } from '@/types/theme';
import { PostType, TopSliderItemProps, TopSliderProps } from '@/types/types';
import { decodeHtmlEntities } from '@/utils/html';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';
import Skeleton from './skeleton';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const News = ({ data, loading, error }: TopSliderProps) => {
    const { theme } = useTheme();
    const handleClick = (item: PostType) => {
        router.push({
            pathname: '/single/[id]',
            params: { id: item.id },
        });
    };

    if (loading) {
        return (
            <View style={{ marginBottom: spacingX._10 }}>

                <Skeleton
                    height={verticalScale(130)}
                    // width={SCREEN_WIDTH * 0.8}
                    radius={12}
                    style={{ marginRight: spacingX._10, marginBottom: spacingX._10 }}
                />
                <Skeleton
                    height={verticalScale(130)}
                    // width={SCREEN_WIDTH * 0.8}
                    radius={12}
                    style={{ marginRight: spacingX._10 }}
                />

            </View>
        );
    }

    if ((!data || data.length === 0)) {
        return (
            <View style={{ marginTop: spacingY._15 }}>
                <Typo
                    size={15}
                    color={theme.colors.textSecondary}
                    style={{ textAlign: 'center' }}
                >
                    {error || 'No items found'}
                </Typo>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={data}
                // horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                // estimatedItemSize={300}
                contentContainerStyle={{ paddingHorizontal: spacingX._10 }}
                renderItem={({ item, index }) => (
                    <NewsItem item={item} index={index} onPress={handleClick} />
                )}
            />
        </View>
    );
};

export const NewsItem = ({ item, index, onPress, loading }: TopSliderItemProps) => {
    const imageUrl =
        item._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
        'https://via.placeholder.com/300';
    const { theme } = useTheme();

    if (loading) {
        return (
            <View style={{ marginHorizontal: spacingX._10, }}>
              <Skeleton height={130} radius={12} style={{ marginBottom: spacingY._5 }} />
              <Skeleton height={130} radius={12} style={{ marginBottom: spacingY._5 }} />
              <Skeleton height={130} radius={12} style={{ marginBottom: spacingY._5 }} />
            </View>
        );
    }

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 70).springify().damping(30).stiffness(200)}
            style={{ marginHorizontal: spacingX._10 }}
        >
            {/* <View style={[styles.line, { backgroundColor: theme.colors.disabled }]} ></View> */}
            <TouchableOpacity
                style={{
                    marginTop: spacingX._10,
                    flexDirection: 'row',
                    borderColor: theme.colors.surface,
                    borderWidth: 1,
                    borderRadius: radius._10,
                    padding: spacingX._10,
                }}
                onPress={() => onPress?.(item)}
                activeOpacity={0.9}
            >
                <Image
                    source={{ uri: imageUrl }}
                    style={{
                        height: verticalScale(100),
                        width: verticalScale(100),
                        borderRadius: 12,
                    }}
                    resizeMode="cover"
                />

                <View
                    style={{
                        flex: 1,
                        marginLeft: spacingX._10,
                        justifyContent: "center",
                    }}
                >
                    <Typo numberOfLines={4} style={styles.title}>
                        {decodeHtmlEntities(item.title.rendered)}
                    </Typo>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};


export default News
