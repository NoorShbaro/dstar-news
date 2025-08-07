import { spacingX, spacingY } from '@/types/theme';
import { verticalScale } from '@/utils/styling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._40
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    //color: Colors.text
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '500',
    //color: text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    //color: Text,
    fontSize: verticalScale(15),
  },
  // errorText: {
  //   color: 'red',
  //   fontSize: 14,
  //   marginTop: 10,
  //   alignSelf: 'center'
  // },
   errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    // alignSelf: 'center'
  },
});

export default styles
