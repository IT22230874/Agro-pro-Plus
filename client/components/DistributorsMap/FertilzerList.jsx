import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

const FertilizerList = ({ fertilizers, onFilterPress }) => {
  return (
    <FlatList
      data={fertilizers}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onFilterPress(item)}
          style={styles.fertilizerButton}
        >
          <Text style={styles.fertilizerText}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      horizontal
      style={styles.fertilizerList}
      contentContainerStyle={styles.floatingList} // Add padding for space
    />
  );
};

// Styles
const styles = StyleSheet.create({
  fertilizerList: {
    position: "absolute", // Position it absolutely
    left: 20, // Distance from the left
    right: 20, // Distance from the right
    top: 100, // Distance from the top
    zIndex: 1, // Bring it to the front
  },
  floatingList: {
    paddingVertical: 10,
  },
  fertilizerButton: {
    backgroundColor: "#607F0E",
    padding: 10,
    borderRadius: 30, // Rounded corners for button effect
    marginRight: 10, // Spacing between buttons
  },
  fertilizerText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
  },
});

export default FertilizerList;
