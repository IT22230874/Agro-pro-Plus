import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";

const API_URL = "http://192.168.206.141:8070/notice";
const backgroundImage = require("../assets/images/stages/corn-milk-stage.jpeg"); // Update with your image path

const SpecialNotices = () => {
  const [notices, setNotices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newNotice, setNewNotice] = useState({ heading: "", description: "" });
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const addNotice = async () => {
    if (!newNotice.heading || !newNotice.description) {
      Alert.alert("Error", "Please fill out both fields");
      return;
    }

    try {
      await axios.post(API_URL, newNotice);
      setNewNotice({ heading: "", description: "" });
      setIsAdding(false);
      fetchNotices();
      Alert.alert("Success", "Notice added successfully");
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  const updateNotice = async () => {
    if (!newNotice.heading || !newNotice.description) {
      Alert.alert("Error", "Please fill out both fields");
      return;
    }

    try {
      await axios.put(`${API_URL}/${updateId}`, newNotice);
      setNewNotice({ heading: "", description: "" });
      setIsAdding(false);
      setUpdateId(null);
      fetchNotices();
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleNoticeAction = (id, action) => {
    if (action === "delete") {
      Alert.alert("Confirm", "Are you sure you want to delete this notice?", [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => deleteNotice(id),
        },
      ]);
    } else if (action === "update") {
      const foundOne = notices.find((n) => n._id === id);
      let res = foundOne
        ? { heading: foundOne.heading, description: foundOne.description }
        : { heading: "", description: "" };
      setNewNotice(res);
      setUpdateId(id);
      setIsAdding(true);
      setIsAdd(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noticeContainer}>
      {/* Modern Bell Alert Icon */}
      <Icon
        name="bell"
        size={24}
        color="#ff9800"
        style={styles.emergencyIcon}
      />
      <Text style={styles.noticeHeading}>{item.heading}</Text>
      <Text style={styles.noticeDescription}>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleNoticeAction(item._id, "update")}
        >
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNoticeAction(item._id, "delete")}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Special Notices</Text>
        <FlatList
          data={notices}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
        {isAdding ? (
          <View style={styles.addNoticeContainer}>
            <TextInput
              placeholder="Heading"
              value={newNotice.heading}
              onChangeText={(text) =>
                setNewNotice({ ...newNotice, heading: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={newNotice.description}
              onChangeText={(text) =>
                setNewNotice({ ...newNotice, description: text })
              }
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => (isAdd ? addNotice() : updateNotice())}
            >
              <Text style={styles.buttonText}>
                {isAdd ? "Add Notice" : "Update Notice"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsAdding(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setIsAdding(true);
              setIsAdd(true);
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#617F0F",
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  noticeContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: "#617F0F",
    position: "relative",
  },
  emergencyIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  noticeHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#617F0F",
    marginLeft: 40,
  },
  noticeDescription: {
    fontSize: 16,
    color: "#617F0F",
    marginTop: 8,
    marginLeft: 40,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionText: {
    color: "#ff9800",
    fontWeight: "500",
    marginLeft: 20,
  },
  addNoticeContainer: {
    marginTop: 20,
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 15,
    elevation: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd",
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#617F0F",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#d32f2f",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#617F0F",
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  addButtonText: {
    fontSize: 30,
    color: "#fff",
  },
});

export default SpecialNotices;
