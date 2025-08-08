import { useTheme } from '@/context/ThemeContext';
import styles from '@/styles/topSlider.styles';
import { spacingX, spacingY } from '@/types/theme';
import { TopSliderItemProps, TopSliderProps } from '@/types/types';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';
import Skeleton from './skeleton';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const TopSlider = ({ data, loading, error, onSelect }: TopSliderProps) => {
  const { theme } = useTheme();

  if (loading) {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: spacingX._10 }}>
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            height={spacingY._350}
            width={'80%'}
            radius={12}
            style={{ marginRight: spacingX._10 }}
          />
        ))}
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
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300} // or your approximate item width
        contentContainerStyle={{ paddingHorizontal: spacingX._10 }}
        renderItem={({ item, index }) => (
          <TopSliderItem item={item} index={index} onPress={onSelect} />
        )}
      />
    </View>
  );
};

const TopSliderItem = ({ item, index, onPress }: TopSliderItemProps) => {
  const imageUrl =
    item._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
    'https://via.placeholder.com/300';

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).springify().damping(14)}
      style={{ marginRight: spacingX._10 }}
    >
      <TouchableOpacity
        style={{
          height: spacingY._500,
          width: SCREEN_WIDTH * 0.8,
        }}
        onPress={() => onPress?.(item.id)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: SCREEN_WIDTH * 0.77,
            borderRadius: 12,
            marginBottom: spacingY._5,
          }}
          resizeMode="cover"
        />
        <Typo numberOfLines={3} style={styles.title}>
          {item.title.rendered}
        </Typo>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TopSlider
