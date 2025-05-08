// UserInfo.js
import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { AuthContext } from "../../context/authContext"; // Adjust the path accordingly

const UserInfo = () => {
  const [state] = useContext(AuthContext); // Get the state from AuthContext

  // Use the user name from the auth state
  const userName = state.user?.name || "User"; // Default to "User" if not found

  return (
    <Text style={styles.userName}>{userName}</Text> // Display the user's name
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default UserInfo;
