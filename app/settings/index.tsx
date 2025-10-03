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
import { Linking, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { styles } from '../../styles/profile.styles'

const Settings = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    {
      title: `Terms of use`,
      icon: (
        <MaterialIcons
          name='policy'
          size={26}
          color={theme.colors.white}
          weight='fill'
        />
      ),
      // bgColor: '#059669'
      bgColor: theme.colors.disabled
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
      // bgColor: theme.colors.info
      bgColor: theme.colors.disabled
    },
    {
      title: `Contact us`,
      icon: (
        <MaterialIcons
          name='help-outline'
          size={26}
          color={theme.colors.white}
          weight='fill'
        />
      ),
      // bgColor: '#9333EA'
      bgColor: theme.colors.disabled
      
    },
  ]

  const handlePress = async (item: accountOptionType) => {
    if (item.title == 'Contact us') {
      Linking.openURL('mailto:info@dstar.news')
    } else {
      router.push(item.routeName)
    }
  }

  const imageSource = theme.mode === 'dark'
    ? require('@/assets/images/abyad-05.png')
    : require('@/assets/images/aswad-02.png');

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        {/** header */}
        <Header title='Settings' style={{ marginVertical: spacingY._10 }} />
        <View style={styles.avatarContainer}>
          <Image
            style={[styles.avatar, {}]}
            source={imageSource}
            contentFit='contain'
            transition={100}
          />

        </View>

        <View style={styles.accountOptions}>
          <Animated.View
            style={[styles.listItem]}
            entering={FadeInDown.delay(50).springify().damping(30).stiffness(200)}
          >
            <TouchableOpacity
              style={[
                styles.flexRow,
              ]}
              onPress={toggleTheme}
            >
              <View style={[styles.listIcon, { 
                // backgroundColor: '#F39C12'
                backgroundColor: theme.colors.disabled
                 }]}>
                {
                  mode === 'dark' ? <MaterialIcons
                    name='sunny'
                    size={26}
                    weight="fill"
                    color={theme.colors.white}
                  /> : <MaterialIcons
                    name='nightlight-round'
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
                <Animated.View key={index.toString()} style={styles.listItem} entering={FadeInDown.delay(index * 50).springify().damping(30).stiffness(200)}>
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

export default Settings
