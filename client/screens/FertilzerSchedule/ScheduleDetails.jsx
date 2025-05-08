import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import imageMapping from "../../components/Home/ImageData"; // Adjust the path as necessary
import ScheduleCard from "../../components/Cards/ScheduleCard";

const getImageUri = (crop_type, stage) => {
  if (imageMapping[crop_type] && imageMapping[crop_type][stage]) {
    return imageMapping[crop_type][stage];
  }
  return null; // Return null if no matching image is found
};

const ScheduleDetails = ({ route }) => {
  const { schedule, isGenerated, loading } = route.params; // Access the loading state here
  const navigation = useNavigation(); // Access navigation

  const saveScheduleToDB = async () => {
    const formattedSchedule = {
      ...schedule,
      soil_condition: {
        nitrogen: parseFloat(schedule.soil_condition.nitrogen) || 0,
        pH: parseFloat(schedule.soil_condition.pH) || 0,
      },
    };

    try {
      const response = await axios.post("/schedule/save", {
        schedule: formattedSchedule,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Fertilizer schedule saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save the fertilizer schedule.");
      }
      navigation.navigate("FertilizerSchedule");
    } catch (error) {
      console.error("Failed to save schedule:", error);
      Alert.alert("Error", "An error occurred while saving the schedule.");
    }
  };

  const getImagePath = (cropType) => {
    switch (cropType) {
      case "Rice":
        return require("../../assets/images/plantImages/rice.png");
      default:
        return require("../../assets/images/plantImages/rice.png");
    }
  };

  const imageUri = getImageUri(schedule.crop_type, schedule.stage); // Refer to schedule directly

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("Menu", "Three-dot menu pressed")}
          style={styles.menuIcon}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.spinner}
        />
      ) : (
        <View style={styles.animatedContainer}>
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {schedule.growth_stages.map((stage, index) => {
              const imageSource = getImageUri(schedule.crop_type, stage.stage);

              return (
                <View key={index} style={styles.stageContainer}>
                  <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                      {imageSource ? (
                        <Image source={imageSource} style={styles.stageImage} />
                      ) : (
                        <Text style={styles.noImageText}>
                          No Image Available
                        </Text>
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.stageTitle}>
                        <Ionicons
                          name="leaf-outline"
                          size={18}
                          style={styles.stageIcon} // Updated style for the icon
                        />
                        Stage:{" "}
                        <Text style={styles.stageContent}>{stage.stage}</Text>
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.label}>Amount: </Text>
                        <Text style={styles.content}>{stage.amount}</Text>
                      </Text>

                      <Text style={styles.text}>
                        {/* <Ionicons
                          name="calendar-outline"
                          size={18}
                          style={styles.icon}
                        /> */}
                        <Text style={styles.label}>Application Date: </Text>
                        <Text style={styles.content}>
                          {stage.application_date}
                        </Text>
                      </Text>

                      <Text style={styles.text}>
                        <Text style={styles.label}>Fertilizer Type: </Text>
                        <Text style={styles.content}>
                          {stage.fertilizer_type}
                        </Text>
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.label}>Est. Cost: </Text>
                        <Text style={styles.content}>Rs. {stage.cost}</Text>
                      </Text>

                      <View style={styles.hr} />

                      <Text style={styles.text}>
                        <Ionicons
                          name="document-text-outline"
                          size={18}
                          style={styles.icon}
                        />

                        <Text style={styles.label}>Notes: </Text>
                        <Text style={styles.notesContent}>{stage.notes}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      {isGenerated && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveScheduleToDB}
          >
            <Text style={styles.saveButtonText}>Save Schedule</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  wrapperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF", // Add white background color
    padding: 10, // Optional: Add padding for better spacing
    borderRadius: 8, // Optional: Add rounded corners for a smoother look
    shadowColor: "#000", // Optional: Add shadow for better visibility
    shadowOffset: { width: 0, height: 2 }, // Optional: Control shadow offset
    shadowOpacity: 0.1, // Optional: Control shadow transparency
    shadowRadius: 4, // Optional: Control how much the shadow spreads
    elevation: 2, // Optional: For Android shadow effect
    zIndex: 10,
  },
  
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "#FFFFFF", // Add white background color
    borderRadius: 60, // Optional: Add rounded corners for a more polished look
    shadowColor: "#000", // Optional: Add shadow for better visibility
    shadowOffset: { width: 0, height: 2 }, // Optional: Control shadow offset
    shadowOpacity: 0.2, // Optional: Control shadow transparency
    shadowRadius: 4, // Optional: Control how much the shadow spreads
    elevation: 5, // Optional: For Android, to give a similar shadow effect
  },
  
  menuIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  stageIcon: {
    marginRight: 30, // Add some spacing between the icon and the text
    color: "#4A7C59", // Matching the icon color with the stage title text
  },
  imageContainer: { flex: 1, paddingRight: 10, zIndex: 1 },
  animatedContainer: {
    padding: 16,
  },
  container: { flexGrow: 1, paddingBottom: 80 },
  stageContainer: {
    marginVertical: 12,
    marginHorizontal: 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center", // Center vertically
    padding: 14,
    paddingLeft: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  stageImage: {
    width: "100%",
    height: 200,
    minHeight: 230,
    resizeMode: "cover",
    borderRadius: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: { flex: 2 },
  stageTitle: {
    fontSize: 18, // Larger font size for the title
    fontFamily: "Nunito-Bold", // Bold font for emphasis
    color: "#4A7C59", // Greenish color to match the theme
    flexDirection: "row", // Ensures proper alignment between text and icon
    // alignItems: "center", // Vertically align icon with text
    marginBottom: 10, // Space between the title and other content
    // marginLeft: 6,
    // gap: 8,
    textTransform: "capitalize",
    justifyContent: "space-between",
  },
  stageContent: {
    fontSize: 18, // Same size for stage content
    fontFamily: "Nunito-ExtraBold", // Regular font for the content
    color: "#333", // Dark color for the stage content
    textTransform: "uppercase",
  },
  text: { fontSize: 16, marginVertical: 4 },
  saveButtonContainer: {
    position: "absolute",
    bottom: 20, // Position at the bottom
    width: "100%", // Ensure it stretches across the width
    alignItems: "center", // Center horizontally
    zIndex: 3,
  },
  saveButton: {
    backgroundColor: "#607F0E", // Button background color
    paddingVertical: 16,
    paddingHorizontal: 150,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "poppins-semibold",
  },

  text: {
    marginBottom: 8, // Add spacing between each text block
  },
  label: {
    fontSize: 13, // Slightly larger font for labels
    fontFamily: "Nunito-Bold", // Bold font for emphasis
    color: "#555", // Dark gray color for labels
  },
  content: {
    fontSize: 18, // Regular font size for content
    fontFamily: "Nunito-ExtraBold", // Normal font for content
    color: "#333", // Darker color for content
  },
  icon: {
    marginRight: 5, // Add spacing between the icon and the text
    color: "#555", // Match icon color with the label text
  },
  notesContent: {
    fontSize: 16, // Same size as other content
    fontFamily: "Nunito-Bold", // Italic font for notes content
    color: "#4e3c11", // Darker color for readability
    // backgroundColor: "#F0F8E8", // Light green background for the notes section
    padding: 10, // Add some padding to give the notes section more space
    borderRadius: 5, // Rounded corners to make it visually distinct
    marginTop: 5, // Add some spacing above the notes content
  },
  hr: {
    borderBottomColor: "#ccc", // Light gray color for the line
    borderBottomWidth: 0.6, // 1px width for the line
    marginBottom: 10, // Adds space below the line
    marginTop: 3, // Adds space above the line
    paddingHorizontal: 20,
  },
});

export default ScheduleDetails;
