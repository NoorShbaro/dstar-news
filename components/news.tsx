import { useTheme } from '@/context/ThemeContext';
import styles from '@/styles/news.styles';
import { spacingX, spacingY } from '@/types/theme';
import { PostType, TopSliderItemProps, TopSliderProps } from '@/types/types';
import { decodeHtmlEntities } from '@/utils/html';
import { verticalScale } from '@/utils/styling';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
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
            <FlashList
                data={data}
                // horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                estimatedItemSize={300} // or your approximate item width
                contentContainerStyle={{ paddingHorizontal: spacingX._10 }}
                renderItem={({ item, index }) => (
                    <TopSliderItem item={item} index={index} onPress={handleClick} />
                )}
            />
        </View>
    );
};

const TopSliderItem = ({ item, index, onPress }: TopSliderItemProps) => {
    const imageUrl =
        item._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
        'https://via.placeholder.com/300';
    const { theme } = useTheme();

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 70).springify().damping(14)}
            style={{ marginRight: spacingX._10 }}
        >
            <View style={[styles.line, { backgroundColor: theme.colors.disabled }]} />
            <TouchableOpacity
                style={{
                    marginTop: spacingX._10,
                    display: 'flex',
                    flexDirection: 'row'
                }}
                onPress={() => onPress?.(item)}
                activeOpacity={0.8}
            >
                <Image
                    source={{ uri: imageUrl }}
                    style={{
                        height: verticalScale(130),
                        width: verticalScale(130),
                        borderRadius: 12,
                        marginBottom: spacingY._5,
                    }}
                    resizeMode="cover"
                />
                <View style={{ marginRight: verticalScale(130), marginLeft: spacingX._10 }}>
                    <Typo numberOfLines={4} style={styles.title}>
                        {decodeHtmlEntities(item.title.rendered)}
                    </Typo>

                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{
                    alignSelf: 'flex-end',
                }}
                onPress={() => onPress?.(item)}
            >
                <Typo size={14} color={theme.colors.accent} fontWeight="500">
                    Read More
                </Typo>
            </TouchableOpacity> */}
        </Animated.View>
    );
};

export default News
