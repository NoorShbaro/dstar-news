import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useTheme } from '@/context/ThemeContext'
import { ReportType } from '@/types/types'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
// import * as Icons from 'phosphor-react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useState } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import { styles } from '../../styles/home.styles'

const Home = () => {

  const { theme } = useTheme();
  const router = useRouter();
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);

      setErrorMessage('')
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
      <ScreenWrapper>
        <View style={styles.container}>
          {/** header */}
          <View style={styles.header}>
            <View style={{ gap: 4 }}>
              <View style={{ flexDirection: 'row' }}>
                <Typo size={16} color={theme.colors.textPrimary}>
                  Digital Star
                </Typo>
                <Typo size={16} fontWeight={'600'}>
                  News
                </Typo>
              </View>
            </View>
            <TouchableOpacity style={[styles.searchIcon, { backgroundColor: theme.colors.disabled }]} onPress={() => {router.push('/profile')}}>
              <MaterialIcons
                name='settings'
                size={verticalScale(24)}
                color={theme.colors.white}
                weight='bold'
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
            } >
            {/** card */}
            {/* <View>
            <HomeCard />
          </View> */}
          </ScrollView>

          {/* <Button
            style={[
              styles.floatingButton,
            ]}
            onPress={() => {}}>
            <MaterialIcons
              name='add'
              color={theme.colors.background}
              weight='bold'
              size={verticalScale(24)}
            />
          </Button> */}
        </View>
        {/* {errorMessage == 'Network Error' ? <Typo style={styles.errorText}>{i18n.t('error_network')}</Typo> : null} */}
      </ScreenWrapper>
  )
}

export default Home
