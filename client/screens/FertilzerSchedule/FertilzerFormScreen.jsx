import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import FertilizerForm from "../../components/Forms/FertilizerForm";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";

const FertilizerFormScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Create a reusable instance of axios
  const fertilizerAPI = axios.create({
    baseURL: "http://192.168.206.141:8000",
    timeout: 50000,
  });

  // Function to fetch fertilizer schedule
  const fetchFertilizerSchedule = async (formData) => {
    setLoading(true);
    try {
      // API request
      const { data } = await fertilizerAPI.post("/generate_schedule", {
        crop_type: formData.cropType,
        planting_date: formData.plantingDate,
        area_size: formData.areaSize,
        soil_condition: formData.soilCondition,
        weather_forecast: weatherData || null, // Gracefully handle null weather data
      });

      // Check if valid data is received
      if (data.schedule && data.schedule.fertilizer_schedule) {
        navigation.navigate("ScheduleDetails", {
          schedule: data.schedule.fertilizer_schedule,
          isGenerated: true, // You can use this to mark if it's a generated schedule
          loading: loading, // Pass the loading state
        });
      } else {
        // console.error("No valid fertilizer schedule data received:", data);
        Alert.alert("Error", "No valid schedule data received.");
      }
    } catch (error) {
      // console.error("Failed to fetch the fertilizer schedule:", error);
      Alert.alert(
        "Error",
        "Failed to fetch the fertilizer schedule.Please Generate Schedule Again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle weather data updates
  const handleWeatherDataUpdate = (data) => setWeatherData(data);

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log("Form data submitted:", formData);
    fetchFertilizerSchedule(formData); // Fetch schedule based on form data
  };

  return (
    <View style={styles.container}>
      <FertilizerForm onSubmit={handleFormSubmit} />
      <LoadingOverlay visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Ensure the overlay is on top
  },
});

export default FertilizerFormScreen;
