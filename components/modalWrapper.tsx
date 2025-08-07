import { useTheme } from '@/context/ThemeContext';
import { spacingY } from '@/types/theme';
import { ModalWrapperProps } from '@/types/types';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const isIOS = Platform.OS == 'ios'

const ModalWrapper = ({
  style,
  children,
  bg
}: ModalWrapperProps) => {

  const { theme, mode, toggleTheme } = useTheme();
  const finalColor = bg || theme.colors.background;

  return (
    <View style={[styles.container, { backgroundColor: finalColor }, style && style]}>
      {children}
    </View>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isIOS ? spacingY._15 : 50,
    paddingBottom: isIOS ? spacingY._20 : spacingY._10
  }
})