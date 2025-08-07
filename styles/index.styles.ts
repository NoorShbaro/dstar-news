import { spacingX, spacingY } from '@/types/theme';
import { verticalScale } from '@/utils/styling';
import { StyleSheet } from 'react-native';

// const { i18n, isRTL, toggleLanguage, language } = useLanguage();

export const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: spacingY._7
    },
    welcomeImage: {
        width: '100%',
        height: verticalScale(300),
        alignSelf: 'center',
        marginTop: verticalScale(80)
    },
    loginButton: {
        alignSelf: 'flex-end',
        marginRight: spacingX._20,
        marginLeft: spacingX._20
    },
    footer: {
        //backgroundColor: neutral900,
        alignItems: 'center',
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        marginBottom: spacingY._40,
        gap: spacingY._20,
        //shadowColor: white,
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: spacingX._25
    }
});

export default styles
