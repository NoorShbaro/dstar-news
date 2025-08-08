import BackButton from '@/components/backButton'
import Header from '@/components/header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useTheme } from '@/context/ThemeContext'
import { spacingY } from '@/types/theme'
import { accountOptionType } from '@/types/types'
import { verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
// import * as Icons from 'phosphor-react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { styles } from '../../styles/profile.styles'

const Profile = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    // {
    //   title: `View Profile`,
    //   icon: (
    //     <MaterialIcons
    //       name='person'
    //       size={26}
    //       color={theme.colors.white}
    //       weight='fill'
    //     />
    //   ),
    //   routeName: '/forms/profileModal',
    //   bgColor: '#6366f1'
    // },
    {
      title: `Term of use`,
      icon: (
        <MaterialIcons
          name='policy'
          size={26}
          color={theme.colors.white}
          weight='fill'
        />
      ),
      // routeName: '/(modals)/profileModal',
      bgColor: '#059669'
    },
    {
      title: `Privacy policy`,
      icon: (
        <MaterialIcons
          name='privacy-tip'
          size={26}
          color={theme.colors.white}
          weight='fill'
        />
      ),
      // routeName: '/(modals)/profileModal',
      bgColor: theme.colors.info
    },
    // {
    //   title: `Logout`,
    //   icon: (
    //     <MaterialIcons
    //       name='power-settings-new'
    //       size={26}
    //       color={theme.colors.white}
    //       weight='fill'
    //     />
    //   ),
    //   // routeName: '/(modals)/profileModal',
    //   bgColor: '#e11d48'
    // },
  ]

  const handlePress = async (item: accountOptionType) => {

    if (item.routeName) {
      router.push(item.routeName)
    }
  }

  // const fetchUserProfile = async () => {
  //   try {
  //     if (!accessToken) throw new Error('Authentication token not found.');

  //     const response = await apiClient.get('/citizen/user', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     const result = response.data;

  //     setUserData({
  //       name: result.name || '',
  //       email: result.email || '',
  //       phone: result.phone?.toString() || '',
  //     });

  //     // if (result.profile_image) {
  //     //     setProfileImage(result.profile_image);
  //     // }

  //   } catch (err: any) {
  //     console.log('Error fetching user profile:', err.message);
  //     Alert.alert('Error', 'Could not load your profile.');
  //   }
  // };

  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        {/** header */}
        <Header title='Settings' style={{ marginVertical: spacingY._10 }} />

        {/** user info */}
        {/* <View style={styles.userInfo}> */}
        {/** avatar */}
        <View style={styles.avatarContainer}>
          <Image
            style={[styles.avatar, {   }]}
            source={require('@/assets/images/abyad-02.png')}
            contentFit='cover'
            transition={100}
          />

        </View>

        {/** name & email */}
        {/* <View style={styles.nameContainer}>
              <Typo size={24} fontWeight={'600'} color={theme.colors.textPrimary}>
                {userData.name}
              </Typo>
              <Typo size={15} color={theme.colors.textSecondary}>
                {userData.email}
              </Typo>
            </View> */}
        {/* </View> */}

        {/** account options */}
        <View style={styles.accountOptions}>
          <Animated.View
            style={[styles.listItem]}
            entering={FadeInDown.delay(50).springify().damping(14)}
          >
            <TouchableOpacity
              style={[
                styles.flexRow,
              ]}
              onPress={toggleTheme}
            >
              <View style={[styles.listIcon, { backgroundColor: '#F39C12' }]}>
                {
                  mode === 'dark' ? <MaterialIcons
                    name='sunny'
                    size={26}
                    weight="fill"
                    color={theme.colors.white}
                  /> : <MaterialIcons
                    name='shield-moon'
                    size={26}
                    weight="fill"
                    color={theme.colors.white}
                  />
                }

              </View>
              <Typo size={16} style={{ flex: 1 }} fontWeight={'500'}>
                {mode === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
                }
              </Typo>
              {
                <MaterialIcons
                  name='chevron-right'
                  size={verticalScale(20)}
                  weight="bold"
                  color={theme.colors.textPrimary}
                />
              }

            </TouchableOpacity>
          </Animated.View>

          {
            accountOptions.map((item, index) => {
              return (
                <Animated.View key={index.toString()} style={styles.listItem} entering={FadeInDown.delay(index * 50).springify().damping(14)}>
                  <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                    {/** icon */}
                    <View style={[styles.listIcon, { backgroundColor: item?.bgColor }]}>
                      {item.icon && item.icon}
                    </View>
                    <Typo size={16} style={{ flex: 1 }} fontWeight={'500'}>
                      {item.title}
                    </Typo>
                    {
                      <MaterialIcons
                        name='chevron-right'
                        size={verticalScale(20)}
                        weight="bold"
                        color={theme.colors.textPrimary}
                      />
                    }
                  </TouchableOpacity>
                </Animated.View>
              )
            })
          }


        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile
