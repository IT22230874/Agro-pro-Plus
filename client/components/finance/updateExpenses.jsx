import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { BASE_URL } from '../../constants/constants';

const UpdateExpenses = ({ route, navigation }) => {
  const { id } = route.params;

  const [budgetPlan, setBudgetPlan] = useState({
    aseedsCost: 0,
    afertilizerCost: 0,
    apesticidesCost: 0,
    aotherCost: 0,
    actualYield: 0,
    actualRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgetPlan = async () => {
      try {
        const response = await axios.get(`/finance/get/${id}`);
        const data = response.data.BudgetPlan;
        setBudgetPlan({
          aseedsCost: data.aseedsCost || 0,
          afertilizerCost: data.afertilizerCost || 0,
          apesticidesCost: data.apesticidesCost || 0,
          aotherCost: data.aotherCost || 0,
          actualYield: data.actualYield || 0,
          actualRevenue: data.actualRevenue || 0,
        });
        setLoading(false);
      } catch (error) {
        console.log("Error fetching budget plan:", error);
        setLoading(false);
      }
    };

    fetchBudgetPlan();
  }, [id]);

  const handleInputChange = (field, value) => {
    setBudgetPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        aseedsCost: budgetPlan.aseedsCost,
        afertilizerCost: budgetPlan.afertilizerCost,
        apesticidesCost: budgetPlan.apesticidesCost,
        aotherCost: budgetPlan.aotherCost,
        actualYield: budgetPlan.actualYield,
        actualRevenue: budgetPlan.actualRevenue,
      };

      const response = await axios.patch(`/finance/update/${id}`, updateData);

      if (response.status === 200) {
        alert("Budget plan updated successfully!");
        navigation.goBack(); // Navigate back to the overview screen
      }
    } catch (error) {
      console.log("Error updating budget plan:", error);
      alert("Failed to update budget plan.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Actual Costs and Revenue</Text>

      <Text style={styles.label}>Actual Seeds Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.aseedsCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("aseedsCost", text)}
        placeholder="Actual Seeds Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Actual Fertilizer Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.afertilizerCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("afertilizerCost", text)}
        placeholder="Actual Fertilizer Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Actual Pesticides Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.apesticidesCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("apesticidesCost", text)}
        placeholder="Actual Pesticides Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Actual Other Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.aotherCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("aotherCost", text)}
        placeholder="Actual Other Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Actual Yield</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.actualYield?.toString() || "0"}
        onChangeText={(text) => handleInputChange("actualYield", text)}
        placeholder="Actual Yield"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Actual Revenue</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.actualRevenue?.toString() || "0"}
        onChangeText={(text) => handleInputChange("actualRevenue", text)}
        placeholder="Actual Revenue"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34A853",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#34A853",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F5F5F5",
  },
  saveButton: {
    backgroundColor: "#34A853",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateExpenses;
