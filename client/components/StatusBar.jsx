import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const StatusBar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.content}>
        <Text>Your content goes here</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: 'white',
    },
  });
export default StatusBar