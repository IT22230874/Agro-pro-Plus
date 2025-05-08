import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ShareExperience = () => {
  const [experience, setExperience] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedExperience, setEditedExperience] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage the expanded view
  const [expandedPost, setExpandedPost] = useState(null);
  const [expandedModalVisible, setExpandedModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://192.168.206.141:8070/post"); // Replace with your actual IP or URL
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePost = async () => {
    if (experience.trim()) {
      const post = { text: experience, image: selectedImage };
      try {
        const response = await fetch("http://192.168.206.141:8070/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
        const newPost = await response.json();
        setPosts([newPost, ...posts]);
        setExperience("");
        setSelectedImage(null);
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access media library is required.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleExpandPost = (post) => {
    setExpandedPost(post);
    setExpandedModalVisible(true);
    setEditedExperience(post.text); // Set the editing experience to the current post text
  };

  const handleCloseExpandedModal = () => {
    setExpandedModalVisible(false);
    setExpandedPost(null);
  };

  const handleUpdate = async () => {
    if (editedExperience.trim() && editingIndex !== null) {
      const updatedPost = {
        text: editedExperience,
        image: posts[editingIndex].image,
      };
      try {
        const response = await fetch(
          `http://192.168.206.141:8070/post/${posts[editingIndex]._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
          }
        );
        const updatedPostData = await response.json();
        const newPosts = [...posts];
        newPosts[editingIndex] = updatedPostData;
        setPosts(newPosts);
        setModalVisible(false);
        setEditingIndex(null);
        setEditedExperience("");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  const handleDelete = (postId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await fetch(`http://192.168.206.141:8070/post/${postId}`, {
                method: "DELETE",
              });
              setPosts(posts.filter((post) => post._id !== postId));
              handleCloseExpandedModal(); // Close the modal after deletion
            } catch (error) {
              console.error("Error deleting post:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleExpandPost(item)}
      style={styles.postContainer}
    >
      <Text style={styles.postText}>{item.text}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Share Your Experience</Text>

        <Image
          source={{
            uri: "https://d1g9yur4m4naub.cloudfront.net/images/Article_Images/ImageForArticle_1111_16825011217071293.jpg",
          }}
          style={styles.headerImage}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Write your experience here..."
          value={experience}
          onChangeText={setExperience}
          multiline
        />

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Add an Image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePost}
          disabled={!experience.trim()}
        >
          <Text style={styles.buttonText}>Post Experience</Text>
        </TouchableOpacity>

        <View style={styles.recentPostsContainer}>
          <Text style={styles.recentPostsHeader}>Recent Posts</Text>
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.gridContainer}
            scrollEnabled={false}
          />
        </View>

        {/* Expanded Post Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={expandedModalVisible}
          onRequestClose={handleCloseExpandedModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {expandedPost && (
                <>
                  {/* <Text style={styles.modalPostText}>{expandedPost.text}</Text> */}
                  {expandedPost.image && (
                    <Image
                      source={{ uri: expandedPost.image }}
                      style={styles.modalPostImage}
                    />
                  )}
                  <Text style={styles.modalPostText}>{expandedPost.text}</Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={styles.updateButton}
                      onPress={() => {
                        setModalVisible(true);
                        setEditingIndex(
                          posts.findIndex(
                            (post) => post._id === expandedPost._id
                          )
                        );
                      }}
                    >
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(expandedPost._id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleCloseExpandedModal}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* Modal for updating post */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setEditingIndex(null);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalInput}
                placeholder="Update your experience..."
                value={editedExperience}
                onChangeText={setEditedExperience}
                multiline
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleUpdate}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#617F0F",
    marginVertical: 10,
  },
  headerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#617F0F",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  recentPostsContainer: {
    marginTop: 20,
  },
  recentPostsHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333",
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalInput: {
    height: 150,
    width: "100%",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalPostText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  modalPostImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  updateButton: {
    backgroundColor: "#617F0F",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#617F0F",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
});

export default ShareExperience;
