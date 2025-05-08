import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from '../../constants/constants';

const BudgetPlansScreen = ({ navigation }) => {
  const [budgetPlans, setBudgetPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("API Base URL:", BASE_URL);

  const fetchBudgetPlans = async () => {
    try {
      const response = await axios.get(`/finance/2`);
      setBudgetPlans(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong while fetching the data");
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);  // Show loader while fetching data
      fetchBudgetPlans(); // Fetch data when the screen is focused
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Budget Plan Overview2", { id: item._id })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDetails}>
        Budget Period: {new Date(item.startDate).toISOString().split("T")[0]} To{" "}
        {new Date(item.endDate).toISOString().split("T")[0]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate("BudgetPlansScreen")}>
          <Text style={styles.filterText}>Custom</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtona} >
          <Text style={styles.filterTexta}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate("MarketPriceTable")}>
          <Text style={styles.filterText}>Market Prices</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recentText}>Recent</Text>
      <FlatList
        data={budgetPlans}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CropSelectionScreen")}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#607F0E",
    marginBottom: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 10,
    paddingLeft: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#607F0E",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtona: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#607F0E",
  },
  filterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  filterTexta: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  recentText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#E8F0C8",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: "#607F0E",
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 14,
    color: "#607F0E",
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: '#607F0E',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

export default BudgetPlansScreen;
