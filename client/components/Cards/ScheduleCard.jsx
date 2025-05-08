import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the delete icon
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient for gradients

const cropImages = {
  rice: require("../../assets/images/plantImages/rice.jpeg"),
  corn: require("../../assets/images/plantImages/corn.jpeg"),
  soybeans: require("../../assets/images/plantImages/soybean.jpeg"),
  watermelon: require("../../assets/images/plantImages/watermelon.jpeg"),
};

const ScheduleCard = ({
  crop_type,
  estimated_total_cost,
  estimated_harvesting_date,
  planting_date, // New prop
  area_size, // New prop
  soil_condition, // New prop
  alerts = [],
  onPress,
  onDelete,
}) => {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteInnerContainer}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const cropImage =
    cropImages[crop_type] ||
    require("../../assets/images/plantImages/rice.jpeg");

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={cropImage} style={styles.cropImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.cropTypeText}>{crop_type}</Text>

          {/* <View style={styles.detailContainer}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color="#666"
                style={styles.icon}
              />
              <View>
                <Text style={styles.detailText}>Planting Date</Text>
                <Text style={styles.detailValue}>{planting_date}</Text>
              </View>
            </View> */}

          <View style={styles.detailContainer}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color="#607F0E"
              style={styles.icon}
            />
            <View>
              <Text style={styles.detailText}> Est. Harvesting Date</Text>
              <Text style={styles.detailValue}>
                {estimated_harvesting_date}
              </Text>
            </View>
          </View>
          <View style={styles.detailContainer2}>
            <Ionicons
              name="wallet-outline"
              size={16}
              color="#607F0E"
              style={styles.icon}
            />
            <View>
              <Text style={styles.detailText}>
                {" "}
                Est. Total Cost:{" "}
                <Text style={styles.detailValue2}>
                  Rs.{estimated_total_cost}
                </Text>
              </Text>
            </View>
          </View>

          {/* <View style={styles.fertilizerInfo}></View>
          <Text style={styles.detailText}>
            Area Size: <Text style={styles.detailValue}>{area_size} acres</Text>
          </Text>

          <View style={styles.soilCondition}>
            <Text style={styles.detailText}>Soil Condition:</Text>
            <Text style={styles.detailText}>
              Nitrogen:{" "}
              <Text style={styles.detailValue}>{soil_condition.nitrogen}</Text>
            </Text>
            <Text style={styles.detailText}>
              pH: <Text style={styles.detailValue}>{soil_condition.pH}</Text>
            </Text>
          </View> */}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 390,
    elevation: 3,

  },
  imageContainer: {
    width: 110,
    height: 118,
    marginRight: 10,
    alignItems: "center",
  },
  cropImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
  },
  cropTypeText: {
    fontSize: 20,
    color: "#353c22",
    fontFamily: "poppins-bold",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6, // Space between items
  },
  detailContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0, // Space between items
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Nunito-SemiBold",
    marginLeft: -4,
    marginBottom: -3,
  },
  detailValue: {
    fontFamily: "poppins-bold",
    color: "#564b04",
  },
  detailValue2: {
    fontSize: 18,
    fontFamily: "poppins-bold",
    color: "#564b04",
  },
  fertilizerInfo: {
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#ff5e5e",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 100,
    height: 118, // Match the height of the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 8
  },
  deleteInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default ScheduleCard;
