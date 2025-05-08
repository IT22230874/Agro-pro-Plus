import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Icon name="arrow-back-outline" size={25} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10, // Ensure it stays on top of other components
  },
});

export default BackIcon;
