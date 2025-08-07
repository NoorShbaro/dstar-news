import { spacingX, spacingY } from '@/types/theme';
import { scale, verticalScale } from '@/utils/styling';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacingY._20,
    marginTop: Platform.OS == 'ios' ? spacingY._35 : 0
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: spacingY._20,
    gap: spacingY._15,
  },
  section: {
    marginTop: spacingY._10,
    gap: spacingY._10,
  },
  input: {
    minHeight: 60,
  },
  mediaImage: {
    width: 160,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#000',
  },
  mapContainer: {
    marginTop: spacingY._10,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  mapWebView: {
  width: '100%',
  height: 200,
  borderRadius: 8,
  overflow: 'hidden',
},
  map: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    // alignSelf: 'center'
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    // borderTopColor: 700
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center'
  },
  avatar: {
    alignSelf: 'center',
    // backgroundColor: 300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    // borderColor: 500
  },
  editIcon: {
    position: 'absolute',
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    // backgroundColor: 100
    // shadowColor: black
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7
  },
  inputContainer: {
    gap: spacingY._10
  },
})

export default styles