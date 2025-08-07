import { radius, spacingX, spacingY } from '@/types/theme';
import { scale, verticalScale } from '@/utils/styling';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: spacingY._20,
      marginTop: Platform.OS == 'ios' ? spacingY._35 : 0
    },
    form: {
      gap: spacingY._20,
      paddingVertical: spacingY._15,
      paddingBottom: spacingY._40
    },
    iosDatePicker: {
  
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: spacingX._20,
      gap: scale(12),
      paddingTop: spacingY._15,
      //borderTopColor: 700
      marginBottom: spacingY._40,
      borderTopWidth: 1
    },
    inputContainer: {
      gap: spacingY._10
    },
    selectContainer: {
    height: verticalScale(54),
    borderRadius: radius._15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderStyle: 'dashed'
  },
    iosDropDown: {
      flexDirection: 'row',
      height: verticalScale(54),
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: verticalScale(14),
      borderWidth: 1,
      //color:white
      //borderColor: 300
      borderRadius: radius._17,
      borderCurve: 'continuous',
      paddingHorizontal: spacingX._15,
    },
    androidDropDown: {
      height: verticalScale(54),
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: verticalScale(14),
      borderWidth: 1,
      //color:white
      //borderColor: 300
      borderRadius: radius._17,
      borderCurve: 'continuous',
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacingX._5,
    },
    dateInput: {
      flexDirection: 'row',
      height: verticalScale(54),
      alignItems: 'center',
      borderWidth: 1,
      // borderColor: 300
      borderRadius: radius._17,
      borderCurve: 'continuous',
      paddingHorizontal: spacingX._15
    },
    datePickerButton: {
      //backgroundColor: 700
      alignSelf: 'flex-end',
      padding: spacingY._7,
      marginRight: spacingX._7,
      paddingHorizontal: spacingY._15,
      borderRadius: radius._10
    },
    dropdownContainer: {
      height: verticalScale(54),
      borderWidth: 1,
      //borderColor: 300
      paddingHorizontal: spacingX._15,
      borderRadius: radius._15,
      borderCurve: 'continuous',
    },
    dropdownItemText: {
      // color: white
    },
    dropdownSelectedText: {
      // color: white
      fontSize: verticalScale(14)
    },
    dropdownListContainer: {
      // backgroundColor: 900
      borderRadius: radius._15,
      borderCurve: 'continuous',
      paddingVertical: spacingY._7,
      top: 5,
      // borderColor: 500
      // shadowColor: black
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 5
    },
    dropdownPlaceholder: {
      // color: white
    },
    dropdownItemContainer: {
      borderRadius: radius._15,
      marginHorizontal: spacingX._7,
    },
    dropdownIcon: {
      height: verticalScale(30),
      //tintColor: 300
    },
    errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    // alignSelf: 'center'
  },
})

export default styles