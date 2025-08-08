import { radius, spacingX, spacingY } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
  },
  slider: {
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._10,
  },
  categoryCard: {
    paddingVertical: spacingX._10,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._17,
    marginRight: spacingX._10,
    borderWidth: 1,
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