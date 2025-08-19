import apiClient from '@/api/apiClient'
import CategorySlider from '@/components/categorySlider'
import Loading from '@/components/Loading'
import News from '@/components/news'
import ScreenWrapper from '@/components/ScreenWrapper'
import TopSlider from '@/components/topSlider'
import { useTheme } from '@/context/ThemeContext'
import { CategoryType, PostType } from '@/types/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isBottom && hasMore && !paginationLoading) {
      setPage(prev => prev + 1);
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

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Image
              style={[styles.avatar, {}]}
              source={mode === 'dark' ? require('@/assets/images/abyad-01.png') : require('@/assets/images/aswad-01.png')}
              contentFit='contain'
              transition={100}
            />
          </View>
          <TouchableOpacity
            style={[styles.searchIcon, { backgroundColor: theme.colors.disabled }]}
            onPress={toggleTheme}
          // () => { router.push('/settings') }
          >
            {
              mode === 'dark' ? <MaterialIcons
                name='sunny'
                size={20}
                weight="fill"
                color={theme.colors.white}
              /> : <MaterialIcons
                name='bedtime'
                size={20}
                weight="fill"
                color={theme.colors.white}
              />
            }
          </TouchableOpacity>
        </View>

        <CategorySlider
          // title="Categories"
          data={categories}
          loading={loadingCategories}
          error={errorMessage}
          onSelect={handleCategoryChange}
          selectedCategoryId={selectedCategoryId}
        />

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primaryLight]}
              tintColor={theme.colors.white}
            />
          }
        >

          <TopSlider data={breakingNews} loading={loadingBreakingNews} />
          <News data={posts} loading={loadingPosts} />
          {paginationLoading && hasMore && (
            <View>
              <Loading />
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Home;
