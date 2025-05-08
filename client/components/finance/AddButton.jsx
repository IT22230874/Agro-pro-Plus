import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons or react-native-vector-icons

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#419F57', // Button background color
    width: 60,                  // Button width (same as height to make it round)
    height: 60,                 // Button height (same as width to make it round)
    borderRadius: 30,           // Half of width/height to make it a perfect circle
    justifyContent: 'center',   // Center the plus icon vertically
    alignItems: 'center',       // Center the plus icon horizontally
    position: 'absolute',       // Position it if needed, e.g., fixed at the bottom-right
    bottom: 20,                 // Adjust this based on your layout
    right: 20,                  // Adjust this based on your layout
  },
});

export default AddButton;
