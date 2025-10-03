import Typo from '@/components/Typo';
import { useTheme } from '@/context/ThemeContext';
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Loading from './Loading';
import ScreenWrapper from './ScreenWrapper';

const WaitingInternet = () => {
    const { theme } = useTheme()
    const imageSource = theme.mode === 'dark'
        ? require('@/assets/images/abyad-05.png')
        : require('@/assets/images/aswad-02.png');

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Image
                    source={imageSource}
                    style={styles.backgroundImage}
                    resizeMode='contain'
                />
                <Typo style={styles.text}>Loading Connection...</Typo>
                <Loading />
            </View>
        </ScreenWrapper>
    );
};

export default WaitingInternet;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        opacity: 0.3,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: verticalScale(20)
    },
});
