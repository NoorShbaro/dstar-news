import { radius, spacingX } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // title: {
    
  // },
  slider: {
    paddingHorizontal: spacingX._5,
    // paddingVertical: spacingY._5,
  },
  categoryCard: {
    paddingVertical: spacingX._10,
    paddingHorizontal: spacingX._10,
    borderRadius: radius._17,
    // marginRight: spacingX._5,
    // borderWidth: 1,
  },

  title: {
    // marginTop: spacingX._10,
    fontSize: 20,
    fontWeight: '900',
    alignSelf: 'center'
  },
  list: {
    paddingHorizontal: spacingX._12,
    gap: spacingX._10,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
  },
})

export default styles