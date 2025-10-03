import { spacingX, spacingY } from '@/types/theme';
import { verticalScale } from '@/utils/styling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._10,
    // marginTop: verticalScale(8),
  },
  header: {
    paddingHorizontal: spacingX._20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10
  },
  avatar: {
    resizeMode: 'contain',
    height: verticalScale(30),
    width: verticalScale(220),
  },
  searchIcon: {
    // backgroundColor: 700
    padding: spacingX._10,
    borderRadius: 50
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: 'absolute',
    bottom: verticalScale(70),
    right: verticalScale(30),
  },
  scrollViewStyle: {
    // marginTop: spacingY._10,
    paddingBottom: verticalScale(80),
    // gap: spacingY._20,
    // marginHorizontal: spacingX._10
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    // alignSelf: 'center'
  },
  title: {
    marginTop: spacingX._10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  line:{
    height:1,
    marginTop: spacingY._10
  },
})

export default styles