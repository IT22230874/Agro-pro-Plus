import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import ScheduleCard from "../../components/Cards/ScheduleCard";

const FertilizerSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savedSchedule, setSavedSchedule] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchSavedSchedule(); // Initial fetch
  }, []);

  // Fetch the schedules from the database
  const fetchSavedSchedule = async (isRefreshing = false) => {
    setLoading(isRefreshing); // Set loading state based on whether it's a refresh
    if (isRefreshing) setRefreshing(true); // Set refreshing state if it's a refresh

    try {
      const response = await axios.get("/schedule/");
      setSavedSchedule(response.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch saved schedule:", error);
    } finally {
      setLoading(false);
      if (isRefreshing) setRefreshing(false); // Reset refreshing state after fetch
    }
  };

  // Handle the deletion of a schedule
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/schedule/${id}`);
      setSavedSchedule((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
  };

  const handleCardClick = (schedule) => {
    navigation.navigate("ScheduleDetails", { schedule });
  };

  const renderCard = (schedule) => {
    const {
      _id,
      crop_type,
      imageUri,
      estimated_harvesting_date,
      estimated_total_cost,
      planting_date,
      area_size,
      soil_condition,
    } = schedule || {};
  
    return (
      <ScheduleCard
        key={_id}
        imageUri={imageUri}
        crop_type={crop_type}
        estimated_harvesting_date={estimated_harvesting_date}
        estimated_total_cost={estimated_total_cost}
        planting_date={planting_date}
        area_size={area_size}
        soil_condition={soil_condition}
        onPress={() => handleCardClick(schedule)} 
        onDelete={() => handleDelete(_id)} 
      />
    );
  };
  

  return (
    <>
      <Header title="Fertilizer Schedule" />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => fetchSavedSchedule(true)} // Fetch data when refreshing
          />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            {savedSchedule.length > 0 ? (
              savedSchedule.map(renderCard)
            ) : (
              <Text>No schedules available</Text>
            )}
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("FertilizerFormScreen")}
      >
        <Text style={styles.floatingButtonText}>Generate Schedule</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#607F0E",
    borderRadius: 50,
    width: 180,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "Nunito-Bold",
    textAlign: "center",
  },
});

export default FertilizerSchedule;
