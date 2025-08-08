import apiClient from '@/api/apiClient'
import CategorySlider from '@/components/categorySlider'
import News from '@/components/news'
import ScreenWrapper from '@/components/ScreenWrapper'
import TopSlider from '@/components/topSlider'
import { useTheme } from '@/context/ThemeContext'
import { CategoryType } from '@/types/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
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
  const [posts, setPosts] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);

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

  const fetchPosts = async (categoryId: number | null) => {
    setLoadingPosts(true);
    try {
      const url = categoryId
        ? `/wp-json/wp/v2/posts?categories=${categoryId}&_embed`
        : `/wp-json/wp/v2/posts?_embed`;
      const res = await apiClient.get(url);
      setPosts(res.data); // ✅ Store posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
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
    await fetchCategories();
    await fetchPosts(selectedCategoryId);
    await fetchBreakingNews()
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts(null); // Load all posts initially
    fetchBreakingNews()
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      // Already selected → toggle to "all posts"
      setSelectedCategoryId(null);
      fetchPosts(null);
    } else {
      setSelectedCategoryId(categoryId);
      fetchPosts(categoryId);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Image
              style={[styles.avatar, {}]}
              source={mode === 'dark' ? require('@/assets/images/abyad-01.png'): require( '@/assets/images/aswad-01.png')}
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
                size={26}
                weight="fill"
                color={theme.colors.white}
              /> : <MaterialIcons
                name='bedtime'
                size={26}
                weight="fill"
                color={theme.colors.white}
              />
            }
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primaryLight]}
              tintColor={theme.colors.white}
            />
          }
        >
          <CategorySlider
            // title="Categories"
            data={categories}
            loading={loadingCategories}
            error={errorMessage}
            onSelect={handleCategoryChange}
            selectedCategoryId={selectedCategoryId}
          />

          <TopSlider data={breakingNews} loading={loadingBreakingNews} />
          <News data={posts} loading={loadingPosts} />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Home;
