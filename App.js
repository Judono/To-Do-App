import React, { useEffect, useState } from 'react';
import Todo from './screens/main';
import { Appearance, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Todo isDark={isDarkMode}/>
    </>
  )
}
