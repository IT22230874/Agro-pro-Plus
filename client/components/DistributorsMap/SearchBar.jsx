// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other icon set

const SearchBar = ({ searchTerm, setSearchTerm, onBackPress, onFilterPress }) => {
  return (
    <View style={styles.container}>
      {/* Uncomment the back button if needed */}
      {/* <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity> */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search stores..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholderTextColor="#aaa" // Placeholder color
      />
      <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
        <Icon name="filter" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Set position to absolute for floating effect
    top: 40, // Adjust the distance from the top of the screen
    left: 70,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color
    borderRadius: 30, // Rounded corners
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 10, // Padding for the container
    zIndex: 10, // Ensure it stays above other components
  },
  searchBar: {
    height: 49,
    flex: 1, // Allow the TextInput to take the remaining space
    marginHorizontal: 10,
    borderRadius: 30, // Match the container's border radius
    paddingHorizontal: 15, // Padding inside the search bar
    backgroundColor: '#fff', // Light gray background for the search input
  },
  iconButton: {
    padding: 5, // Add some padding around the icons
  },
});

export default SearchBar;
