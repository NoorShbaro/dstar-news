import { useTheme } from '@/context/ThemeContext';
import styles from '@/styles/topSlider.styles';
import { spacingX, spacingY } from '@/types/theme';
import { PostType, TopSliderItemProps, TopSliderProps } from '@/types/types';
import { decodeHtmlEntities } from '@/utils/html';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';
import Skeleton from './skeleton';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const TopSlider = ({ data, loading, error }: TopSliderProps) => {
  const { theme } = useTheme();

  const handleClick = (item: PostType) => {
    router.push({
      pathname: '/single/[id]',
      params: { id: item.id },
    });
  };

  if (loading) {
    return (
      <View style={{ flexDirection: 'row', marginBottom: spacingX._20}}>
        <Skeleton
          height={verticalScale(350)}
          width={SCREEN_WIDTH * 0.95}
          radius={12}
          style={{ marginRight: spacingX._10 }}
        />
        <Skeleton
          height={verticalScale(350)}
          width={SCREEN_WIDTH * 0.95}
          radius={12}
        // style={{ marginRight: spacingX._10 }}
        />
      </View>
    );
  }

  if (!data || data.length === 0) {
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{ paddingRight: spacingX._10 }}
      >
        {data.map((item, index) => (
          <TopSliderItem
            key={item.id}
            item={item}
            index={index}
            onPress={handleClick}
          />
        ))}
      </ScrollView>
    </View>

  );
};

const TopSliderItem = ({ item, index, onPress }: TopSliderItemProps) => {
  const { theme } = useTheme();
  const imageUrl =
    item._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
    'https://via.placeholder.com/300';

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).springify().damping(30).stiffness(200)}
      style={{ marginRight: spacingX._10, marginBottom: spacingX._20 }}
    >
      <TouchableOpacity
        style={{
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 12,
          overflow: "hidden", 
        }}
        activeOpacity={0.8}
        onPress={() => onPress?.(item)}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: SCREEN_WIDTH * 0.9,
            width: "100%",
          }}
          resizeMode="cover"
        />

        {/* Title Overlay */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: spacingY._10,
            alignContent: 'center',
            height: verticalScale(80)
          }}
        >
          <Typo
            numberOfLines={2}
            style={styles.title} color={theme.colors.white}
          >
            {decodeHtmlEntities(item.title.rendered)}
          </Typo>
        </View>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default TopSlider;
