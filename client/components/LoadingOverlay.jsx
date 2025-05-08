// LoadingOverlay.js
import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView

const LoadingOverlay = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.indicatorContainer}>
          <LottieView
            source={require('../assets/loading.json')} // Path to your Lottie animation file
            autoPlay
            loop
            style={styles.lottie} // Optional: Custom style for the Lottie view
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
  },
  indicatorContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'transparent', // Change to 'transparent' to see the Lottie animation's background
  },
  lottie: {
    width: 80, // Set the width you prefer
    height: 80, // Set the height you prefer
  },
});

export default LoadingOverlay;
