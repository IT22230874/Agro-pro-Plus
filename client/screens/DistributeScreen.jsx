import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import axios from "axios";
import MapDisplay from "../components/DistributorsMap/MapDisplay";
import SearchBar from "../components/DistributorsMap/SearchBar";
import FertilizerList from "../components/DistributorsMap/FertilzerList";
import Toast from "react-native-toast-message";

const DistributeScreen = ({ navigation }) => {
  
  const [locations, setLocations] = useState([]); // Full list of locations
  const [filteredLocations, setFilteredLocations] = useState([]); // Filtered list for displaying
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [fertilizers, setFertilizers] = useState([]); // List of fertilizers
  const [selectedFertilizer, setSelectedFertilizer] = useState(""); // Currently selected fertilizer

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/distribute/");

        // Process the distributor locations
        if (Array.isArray(response.data) && response.data.length > 0) {
          const locationsData = response.data
            .map((distributor) => {
              const lat = distributor.location?.lat;
              const lng = distributor.location?.lng;

              if (lat !== undefined && lng !== undefined) {
                return {
                  business_name: distributor.business_name,
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                  ferti_name: distributor.ferti_name, // Assume this is in distributor data
                };
              } else {
                console.warn(
                  `Location data missing for distributor: ${distributor.business_name}`
                );
                return null;
              }
            })
            .filter(Boolean); // Filter out null values

          setLocations(locationsData);
          setFilteredLocations(locationsData); // Set the initial filtered list to all locations
        } else {
          throw new Error("No distributor data available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFertilizers = async () => {
      try {
        const response = await axios.get("/stock/fertilizers"); // Adjust the route as needed
        setFertilizers(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLocations();
    fetchFertilizers();
  }, []);

  // Update the filtered locations based on the search term and selected fertilizer
  useEffect(() => {
    const filtered = locations.filter(
      (location) =>
        location.business_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (selectedFertilizer ? location.ferti_name === selectedFertilizer : true)
    );
    setFilteredLocations(filtered);
  }, [searchTerm, locations, selectedFertilizer]);

  // Function to fetch stores with availability when a fertilizer is selected
  // Function to fetch stores with availability when a fertilizer is selected
  const fetchStoresByFertilizer = async (fertilizer) => {
    try {
      const response = await axios.get(`/stock/stores`, {
        params: {
          ferti_name: fertilizer,
          availability: "Available",
        },
      });

      // Check if response.data is an array before mapping
      if (Array.isArray(response.data)) {
        const availableStores = response.data.map((store) => ({
          business_name: store.business_name,
          lat: parseFloat(store.location?.lat),
          lng: parseFloat(store.location?.lng),
          ferti_name: store.ferti_name,
        }));

        console.log(availableStores);
        setFilteredLocations(availableStores); // Set filtered locations to available stores
      } else if (response.data.status === "Warning") {
        // Show toast message if the stock is out
        Toast.show({
          type: "info",
          position: "bottom", // Show toast at the bottom
          text1: response.data.message || "Stocks are out of stock.",
          visibilityTime: 4000, // Duration for which the toast is visible
          autoHide: true, // Automatically hide after duration
          bottomOffset: 40, // Offset from the bottom
        });
      }
    } catch (err) {
      // Handle axios error response without unnecessary messages
      if (err.response?.data?.status === "Warning") {
        Toast.show({
          type: "info",
          position: "bottom", // Show toast at the bottom
          text1: err.response.data.message || "Stocks are out of stock.",
          visibilityTime: 4000,
          autoHide: true,
          bottomOffset: 40,
        });
      }
    }
  };

  // Update the handleFilterPress function to call fetchStoresByFertilizer
  const handleFilterPress = (fertilizer) => {
    setSelectedFertilizer(fertilizer); // Set the selected fertilizer
    fetchStoresByFertilizer(fertilizer); // Fetch stores with availability
  };
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilterPress={() =>
          Alert.alert("Filter", "Filter options will be implemented here.")
        }
      />
      <FertilizerList
        fertilizers={fertilizers}
        onFilterPress={handleFilterPress} // Pass the handler to FertilizerList
      />
      <MapDisplay locations={filteredLocations} route={navigation} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default DistributeScreen;
