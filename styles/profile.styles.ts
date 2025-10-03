import { radius, spacingX, spacingY } from '@/types/theme';
import { verticalScale } from '@/utils/styling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center'
  },
  avatar: {
    alignSelf: 'center',
    // backgroundColor: 300
    height: verticalScale(135),
    width: verticalScale(80),
    // borderRadius: 200,
    // resizeMode: 'contain'
    // borderWidth: 1,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    borderRadius: 50,
    //backgroundColor: 100
    //shadowColor: black
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    //backgroundColor: 500
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous'
  },
  listItem: {
    marginBottom: verticalScale(17)
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10
  }
})

export default styles