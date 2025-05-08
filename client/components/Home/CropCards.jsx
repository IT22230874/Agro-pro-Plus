import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios"; // Make sure to install axios if you haven't already
import imageMapping from "./ImageData"; // Adjust the path as necessary
import { Ionicons } from "@expo/vector-icons"; // Import the clock icon from Ionicons
import AntDesign from "@expo/vector-icons/AntDesign";

const getImageUri = (crop_type, stage) => {
  if (imageMapping[crop_type] && imageMapping[crop_type][stage]) {
    return imageMapping[crop_type][stage];
  }
  return null; // Return null if no matching image is found
};

const CropCard = () => {
  const [cropData, setCropData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/schedule/"); // Replace with your actual API URL

        if (Array.isArray(response.data)) {
          const today = new Date();
          const nextStages = response.data
            .map((crop) => {
              const nextStage = crop.growth_stages.find(
                (stage) => new Date(stage.application_date) > today
              );

              if (nextStage) {
                return {
                  crop_type: crop.crop_type,
                  ...nextStage,
                };
              }
              return null;
            })
            .filter((stage) => stage !== null);

          setCropData(nextStages);
        } else {
          console.error(
            "Schedule data is undefined or incorrectly structured."
          );
          setCropData([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCrop = ({ item }) => {
    const imageUri = getImageUri(item.crop_type, item.stage);

    const today = new Date();
    const applicationDate = new Date(item.application_date);
    const timeDiff = applicationDate - today;
    const daysUntilApplication = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={imageUri} style={styles.cropImage} />
          ) : (
            <Text>No image available</Text> // Fallback if imageUri is null
          )}
          <View style={styles.imageTextContainer}>
            <AntDesign name="clockcircleo" size={15} color="#607F0E" />
            <Text style={styles.imageText}>
              In {daysUntilApplication} Day
              {daysUntilApplication !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          {/* Column 1 (Left) */}
          <View style={styles.infoTextContainerColumn1}>
            <Text style={styles.cropText}>{item.crop_type}</Text>
            <Text style={styles.infoText}>
              <Text style={styles.labelText}>Stage: </Text>
              <Text style={styles.contentText}>{item.stage}</Text>
            </Text>
            <Text style={styles.weekText}>
              Week : 3
            </Text>
          </View>

          {/* Column 2 (Right) */}
          <View style={styles.infoTextContainerColumn2}>
            <View style={styles.iconTextRow}>
              <Ionicons
                name="leaf-outline"
                size={18}
                color="#607F0E"
                style={styles.icon}
              />
              <View style={styles.infoText}>
                <Text style={styles.labelText}>Fertilizer Type</Text>
                <Text style={styles.contentText}>{item.fertilizer_type}</Text>
              </View>
            </View>
            <View style={styles.hr} />

            <View style={styles.iconTextRow}>
              <Ionicons
                name="water-outline"
                size={18}
                color="#607F0E"
                style={styles.icon}
              />
              <View style={styles.infoText}>
                <Text style={styles.labelText}>Amount</Text>
                <Text style={styles.contentText}>{item.amount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.noteContainer}>
        <View style={styles.hr} />

          <Text style={styles.note}>
            <Text style={styles.noteText}>{item.notes}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={cropData}
      renderItem={renderCrop}
      keyExtractor={(item) => `${item.crop_type}_${item.application_date}`}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 330,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
    borderBottomWidth: 5,
    borderColor: "#927a4d",
  },
  imageContainer: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  cropImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Use 'cover' to fill the space and maintain aspect ratio
  },
  imageTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.78)",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 5,
  },
  imageText: {
    color: "#333", // Darker for better contrast
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#fff",
    flexDirection: "row", // Create two-column layout
    justifyContent: "space-between",
  },
  infoTextContainerColumn1: {
    width: "60%",
    // marginRight: 10,
  },
  infoTextContainerColumn2: {
    width: "40%",
    alignItems: "flex-start", // Align to the right
  },
  weekText: {
    backgroundColor: "#b3c322", // Light green background
    color: "#4e3c11", // Dark text color for contrast
    fontSize: 17, // Adjust font size as needed
    fontFamily: "Nunito-ExtraBold", // Use your desired font family
    paddingHorizontal: 16, // Horizontal padding to add space inside
    paddingVertical: 5, // Vertical padding for a more button-like feel
    borderRadius: 6, // Round the corners slightly
    alignSelf: "flex-start", // Align the week text to the start
    marginTop: 8, // Add some spacing from the top
  },
  cropText: {
    fontSize: 30,
    color: "#333",
    textTransform: "uppercase",
    fontFamily: "poppins-bold",
    marginBottom: -8, // Add some spacing between lines
  },
  labelText: {
    fontSize: 14,
    fontFamily: "Nunito-ExtraBold",
    color: "#555",
  },
  contentText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Nunito-ExtraBold",
    textTransform: "capitalize",
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    flexDirection: "column",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  iconTextRow: {
    flexDirection: "row", // Icon and text in one row
    alignItems: "center", // Align icon and text vertically
    marginBottom: 5,
  },
  typeContent: {
    color: "#607F0E",
    fontWeight: "bold", // Make the fertilizer type stand out
  },

  noteContainer: {
    paddingHorizontal: 15, // Increased padding for a more spacious feel
    paddingVertical: 10,
    backgroundColor: "#fff", // Light background for the info section
  },
  // note: {
  //   fontSize: 16,
  //   color: "#555",
  //   fontFamily: "Nunito-SemiBold",
  //   lineHeight: 20, // Improves readability with better line spacing
  // },
  noteText: {
    fontSize: 17,
    color: "#000",
    fontFamily: "Nunito-SemiBold",
    lineHeight: 20, // Improves readability with better line spacing
    marginTop: 10,
  },
  hr: {
    borderBottomColor: "#ccc", // Light gray color for the line
    borderBottomWidth: 0.8, // 1px width for the line
    marginBottom: 6, // Adds space below the line
    paddingHorizontal: 20,
  },
});

export default CropCard;
