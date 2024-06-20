import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { colors } from '../styles/colors'; // Adjust import path based on your project structure
import { sizes } from '../styles/sizes'; // Adjust import path based on your project structure

export default function LeftNavBar(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Navigation</Text>
        <DrawerItemList {...props} />
        <Button title="Logout" onPress={() => props.navigation.navigate('Login')} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.padding,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: sizes.title,
    marginBottom: sizes.margin,
    color: colors.primary,
  },
});
