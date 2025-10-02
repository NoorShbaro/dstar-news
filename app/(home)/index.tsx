import apiClient from '@/api/apiClient'
import CategorySlider from '@/components/categorySlider'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/news'
import ScreenWrapper from '@/components/ScreenWrapper'
import Skeleton from '@/components/skeleton'
import TopSlider from '@/components/topSlider'
import Typo from '@/components/Typo'
import { useTheme } from '@/context/ThemeContext'
import { spacingX, spacingY } from '@/types/theme'
import { CategoryType, PostType } from '@/types/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'
import { styles } from '../../styles/home.styles'

const Home = () => {
  const { theme, toggleTheme, mode } = useTheme();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingBreakingNews, setLoadingBreakingNews] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [breakingNews, setBreakingNews] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    if (!loadingPosts && posts.length === 0) {
      const timer = setTimeout(() => setShowEmpty(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowEmpty(false);
    }
  }, [loadingPosts, posts]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await apiClient.get('/wp-json/wp/v2/categories');
      setCategories(res.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorMessage('Failed to load categories.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const POSTS_PER_PAGE = 10;

  const fetchPosts = async (categoryId: number | null, pageNum = 1, append = false) => {
    if (append && paginationLoading) return;
    if (!append && loadingPosts) return;

    append ? setPaginationLoading(true) : setLoadingPosts(true);

    try {
      const url = categoryId
        ? `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=${POSTS_PER_PAGE}&page=${pageNum}`
        : `/wp-json/wp/v2/posts?_embed&per_page=${POSTS_PER_PAGE}&page=${pageNum}`;

      const res = await apiClient.get(url);
      // console.log('Fetched posts:', categoryId);

      if (append) {
        setPosts(prev => [...prev, ...res.data]);
      } else {
        setPosts(res.data);
      }

      setHasMore(res.data.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
      if (!append) setPosts([]);
    } finally {
      append ? setPaginationLoading(false) : setLoadingPosts(false);
    }
  };

  const fetchBreakingNews = async () => {
    setLoadingBreakingNews(true);
    try {
      const url = `/wp-json/wp/v2/posts?categories=163&_embed`
      const res = await apiClient.get(url);
      setBreakingNews(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingBreakingNews(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);

    try {
      await Promise.all([
        fetchCategories(),
        fetchBreakingNews(),
        fetchPosts(selectedCategoryId, 1, false)
      ]);

      setPage(1);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBreakingNews()
    fetchPosts(null);
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setPage(1);
    setPosts([]);
    setSelectedCategoryId(prev => (prev === categoryId ? null : categoryId));
  };

  useEffect(() => {
    fetchPosts(selectedCategoryId, page, page > 1);
  }, [selectedCategoryId, page]);

  const handleClick = (item: PostType) => {
    router.push({
      pathname: '/single/[id]',
      params: { id: item.id },
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={{ gap: 4 }}>
          <Image
            style={styles.avatar}
            source={
              mode === 'dark'
                ? require('@/assets/images/abyad-01.png')
                : require('@/assets/images/aswad-01.png')
            }
            contentFit="contain"
            transition={100}
          />
        </View>
        <TouchableOpacity
          style={[styles.searchIcon, { backgroundColor: theme.colors.disabled }]}
          onPress={toggleTheme}
        >
          {mode === 'dark' ? (
            <MaterialIcons
              name="sunny"
              size={20}
              weight="fill"
              color={theme.colors.white}
            />
          ) : (
            <MaterialIcons
              name="bedtime"
              size={20}
              weight="fill"
              color={theme.colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
      <CategorySlider
        data={categories}
        loading={loadingCategories}
        error={errorMessage}
        onSelect={handleCategoryChange}
        selectedCategoryId={selectedCategoryId}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          !showEmpty ? (
            <View style={{ marginTop: spacingY._15, marginHorizontal: spacingX._10, }}>
              <Skeleton height={130} radius={12} style={{ marginBottom: spacingY._5 }} />
              <Skeleton height={130} radius={12} style={{ marginBottom: spacingY._5 }} />
              <Skeleton height={130} radius={12} style={{ marginBottom: spacingY._5 }} />
            </View>
          ) : (
            <View style={{ marginTop: spacingY._15 }}>
              <Typo size={15} color={theme.colors.textSecondary} style={{ textAlign: 'center' }}>
                {errorMessage || 'No items found'}
              </Typo>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <NewsItem
            item={item}
            index={index}
            onPress={handleClick}
            loading={loadingPosts}
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              {/* <CategorySlider
                data={categories}
                loading={loadingCategories}
                error={errorMessage}
                onSelect={handleCategoryChange}
                selectedCategoryId={selectedCategoryId}
              /> */}
              <TopSlider data={breakingNews} loading={loadingBreakingNews} />
            </View>
          </>

        }
        ListFooterComponent={
          paginationLoading && hasMore ? (
            <View style={{ paddingVertical: 20 }}>
              <Loading />
            </View>
          ) : null
        }
        onEndReached={() => {
          if (hasMore && !paginationLoading) {
            setPage(prev => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primaryLight]}
            tintColor={theme.colors.white}
          />
        }
        contentContainerStyle={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>

  );
};

export default Home;
