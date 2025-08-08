import apiClient from '@/api/apiClient'
import CategorySlider from '@/components/categorySlider'
import News from '@/components/news'
import ScreenWrapper from '@/components/ScreenWrapper'
import TopSlider from '@/components/topSlider'
import Typo from '@/components/Typo'
import { useTheme } from '@/context/ThemeContext'
import { CategoryType } from '@/types/types'
import { verticalScale } from '@/utils/styling'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import { styles } from '../../styles/home.styles'

const Home = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);

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

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchCategories();
    await fetchPosts(selectedCategoryId);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts(null); // Load all posts initially
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
            <View style={{ flexDirection: 'row' }}>
              <Typo size={16} color={theme.colors.textPrimary}>Digital Star</Typo>
              <Typo size={16} fontWeight="600">News</Typo>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.searchIcon, { backgroundColor: theme.colors.disabled }]}
            onPress={() => router.push('/settings')}
          >
            <MaterialIcons
              name="settings"
              size={verticalScale(24)}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primaryLight}
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

          <TopSlider data={posts} loading={loadingPosts}/>
          <News />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Home;
