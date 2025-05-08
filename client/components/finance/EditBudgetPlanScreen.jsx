import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../../constants/constants";

const EditBudgetPlanScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [budgetPlan, setBudgetPlan] = useState({
    title: "",
    crop: "",
    startDate: "",
    endDate: "",
    seedsCost: 0,
    fertilizerCost: 0,
    pesticidesCost: 0,
    otherCost: 0,
  });

  const [loading, setLoading] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Error state for validation
  const [errors, setErrors] = useState({
    title: "",
    crop: "",
    startDate: "",
    endDate: "",
    seedsCost: "",
    fertilizerCost: "",
    pesticidesCost: "",
    otherCost: "",
  });

  // Validation functions
  const validateTitle = (text) =>
    text.trim() === "" ? "Title is required." : "";
  const validateCrop = (text) =>
    text.trim() === "" || /[0-9]/.test(text)
      ? "Crop name cannot contain numbers."
      : "";
  const validateCost = (text) =>
    text !== "" && (isNaN(text) || parseFloat(text) < 0)
      ? "Cost cannot be negative."
      : "";
  const validateStartDate = (date) =>
    new Date(date) < new Date() ? "Start date cannot be in the past." : "";
  const validateEndDate = (start, end) =>
    new Date(end) <= new Date(start)
      ? "End date must be after start date."
      : "";

  useEffect(() => {
    const fetchBudgetPlan = async () => {
      try {
        const response = await axios.get(`/finance/get/${id}`);
        setBudgetPlan(response.data.BudgetPlan);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching budget plan:", error);
        setLoading(false);
      }
    };

    fetchBudgetPlan();
  }, [id]);

  useEffect(() => {
    setErrors({
      title: validateTitle(budgetPlan.title),
      crop: validateCrop(budgetPlan.crop),
      startDate: validateStartDate(budgetPlan.startDate),
      endDate: validateEndDate(budgetPlan.startDate, budgetPlan.endDate),
      seedsCost: validateCost(budgetPlan.seedsCost),
      fertilizerCost: validateCost(budgetPlan.fertilizerCost),
      pesticidesCost: validateCost(budgetPlan.pesticidesCost),
      otherCost: validateCost(budgetPlan.otherCost),
    });
  }, [budgetPlan]);

  const handleInputChange = (field, value) => {
    setBudgetPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (Object.values(errors).some((error) => error !== "")) {
      Alert.alert("Error", "Please fix the errors before saving.");
      return;
    }

    try {
      const response = await axios.patch(`/finance/update/${id}`, budgetPlan);
      if (response.status === 200) {
        Alert.alert("Success", "Budget plan updated successfully!");
        navigation.goBack(); // Navigate back to the overview screen
      }
    } catch (error) {
      console.log("Error updating budget plan:", error);
      Alert.alert("Error", "Failed to update budget plan.");
    }
  };

  const handleDateChange = (field, event, selectedDate) => {
    const currentDate = selectedDate || budgetPlan[field];
    if (field === "startDate") {
      setShowStartDatePicker(Platform.OS === "ios");
    } else {
      setShowEndDatePicker(Platform.OS === "ios");
    }
    handleInputChange(field, currentDate.toISOString().split("T")[0]);
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
      <Text style={styles.header}>Edit Budget Plan</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.title || ""}
        onChangeText={(text) => handleInputChange("title", text)}
        placeholder="Title"
        placeholderTextColor="#757575"
      />
      {errors.title ? (
        <Text style={styles.errorText}>{errors.title}</Text>
      ) : null}

      <Text style={styles.label}>Crop</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.crop || ""}
        onChangeText={(text) => handleInputChange("crop", text)}
        placeholder="Crop"
        placeholderTextColor="#757575"
      />
      {errors.crop ? <Text style={styles.errorText}>{errors.crop}</Text> : null}

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={budgetPlan.startDate?.split("T")[0] || ""}
          editable={false}
          placeholder="Start Date"
          placeholderTextColor="#757575"
        />
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={new Date(budgetPlan.startDate)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) =>
            handleDateChange("startDate", event, selectedDate)
          }
        />
      )}
      {errors.startDate ? (
        <Text style={styles.errorText}>{errors.startDate}</Text>
      ) : null}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={budgetPlan.endDate?.split("T")[0] || ""}
          editable={false}
          placeholder="End Date"
          placeholderTextColor="#757575"
        />
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={new Date(budgetPlan.endDate)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) =>
            handleDateChange("endDate", event, selectedDate)
          }
        />
      )}
      {errors.endDate ? (
        <Text style={styles.errorText}>{errors.endDate}</Text>
      ) : null}

      <Text style={styles.label}>Seeds Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.seedsCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("seedsCost", text)}
        placeholder="Seeds Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />
      {errors.seedsCost ? (
        <Text style={styles.errorText}>{errors.seedsCost}</Text>
      ) : null}

      <Text style={styles.label}>Fertilizer Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.fertilizerCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("fertilizerCost", text)}
        placeholder="Fertilizer Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />
      {errors.fertilizerCost ? (
        <Text style={styles.errorText}>{errors.fertilizerCost}</Text>
      ) : null}

      <Text style={styles.label}>Pesticides Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.pesticidesCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("pesticidesCost", text)}
        placeholder="Pesticides Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />
      {errors.pesticidesCost ? (
        <Text style={styles.errorText}>{errors.pesticidesCost}</Text>
      ) : null}

      <Text style={styles.label}>Other Cost</Text>
      <TextInput
        style={styles.input}
        value={budgetPlan.otherCost?.toString() || "0"}
        onChangeText={(text) => handleInputChange("otherCost", text)}
        placeholder="Other Cost"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />
      {errors.otherCost ? (
        <Text style={styles.errorText}>{errors.otherCost}</Text>
      ) : null}

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
    marginBottom: 30, // Adding marginBottom to avoid overlapping with the bottom of the screen
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default EditBudgetPlanScreen;
