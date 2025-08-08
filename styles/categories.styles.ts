import { radius, spacingX, spacingY } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
  },
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
    paddingHorizontal: spacingX._15,
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