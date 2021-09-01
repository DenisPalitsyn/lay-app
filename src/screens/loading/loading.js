import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const image = require('../../assets/img/landing.jpg');

export default function Loading({ navigation }) {
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'Main' : 'Auth');
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.bg} blurRadius={1}>
        <ActivityIndicator />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
