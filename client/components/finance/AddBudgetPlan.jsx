import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const AddBudgetPlan = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState(""); // Manual input for crop
  const [area, setArea] = useState(""); // Area of cultivation input
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [seedsCost, setSeedsCost] = useState("");
  const [fertilizerCost, setFertilizerCost] = useState("");
  const [pesticidesCost, setPesticidesCost] = useState("");
  const [otherCost, setOtherCost] = useState("");

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Validation error messages
  const [errors, setErrors] = useState({
    title: "",
    crop: "",
    area: "",
    seedsCost: "",
    fertilizerCost: "",
    pesticidesCost: "",
    otherCost: "",
    startDate: "",
    endDate: "",
  });

  // Validations
  const validateTitle = (value) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, title: "" }));
      return true;
    }
  };

  const validateCrop = (value) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, crop: "Crop name is required." }));
      return false;
    } else if (/[0-9]/.test(value)) {
      setErrors((prev) => ({ ...prev, crop: "Crop name cannot contain numbers." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, crop: "" }));
      return true;
    }
  };

  const validateArea = (value) => {
    const num = parseFloat(value);
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, area: "Area is required." }));
      return false;
    } else if (isNaN(num) || num <= 0) {
      setErrors((prev) => ({ ...prev, area: "Area must be a positive number." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, area: "" }));
      return true;
    }
  };

  const validateSeedsCost = (value) => {
    const num = parseFloat(value);
    if (value.trim() && (isNaN(num) || num < 0)) {
      setErrors((prev) => ({ ...prev, seedsCost: "Seeds cost cannot be negative." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, seedsCost: "" }));
      return true;
    }
  };

  const validateFertilizerCost = (value) => {
    const num = parseFloat(value);
    if (value.trim() && (isNaN(num) || num < 0)) {
      setErrors((prev) => ({ ...prev, fertilizerCost: "Fertilizer cost cannot be negative." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, fertilizerCost: "" }));
      return true;
    }
  };

  const validatePesticidesCost = (value) => {
    const num = parseFloat(value);
    if (value.trim() && (isNaN(num) || num < 0)) {
      setErrors((prev) => ({ ...prev, pesticidesCost: "Pesticides cost cannot be negative." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, pesticidesCost: "" }));
      return true;
    }
  };

  const validateOtherCost = (value) => {
    const num = parseFloat(value);
    if (value.trim() && (isNaN(num) || num < 0)) {
      setErrors((prev) => ({ ...prev, otherCost: "Other costs cannot be negative." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, otherCost: "" }));
      return true;
    }
  };

  const validateStartDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      setErrors((prev) => ({ ...prev, startDate: "Start date cannot be before today." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, startDate: "" }));
      // Also validate end date if it's before new start date
      if (endDate < date) {
        setErrors((prev) => ({ ...prev, endDate: "End date must be after start date." }));
      } else {
        setErrors((prev) => ({ ...prev, endDate: "" }));
      }
      return true;
    }
  };

  const validateEndDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date <= today) {
      setErrors((prev) => ({ ...prev, endDate: "End date must be a future date." }));
      return false;
    } else if (date <= startDate) {
      setErrors((prev) => ({ ...prev, endDate: "End date must be after start date." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, endDate: "" }));
      return true;
    }
  };

  // Combined validation before submission
  const validateAll = () => {
    const isTitleValid = validateTitle(title);
    const isCropValid = validateCrop(crop);
    const isAreaValid = validateArea(area);
    const isSeedsCostValid = validateSeedsCost(seedsCost);
    const isFertilizerCostValid = validateFertilizerCost(fertilizerCost);
    const isPesticidesCostValid = validatePesticidesCost(pesticidesCost);
    const isOtherCostValid = validateOtherCost(otherCost);
    const isStartDateValid = validateStartDate(startDate);
    const isEndDateValid = validateEndDate(endDate);

    return (
      isTitleValid &&
      isCropValid &&
      isAreaValid &&
      isSeedsCostValid &&
      isFertilizerCostValid &&
      isPesticidesCostValid &&
      isOtherCostValid &&
      isStartDateValid &&
      isEndDateValid
    );
  };

  const handleAddPlan = async () => {
    if (!validateAll()) {
      Alert.alert("Error", "Please fix the errors before submitting.");
      return;
    }

    try {
      const newPlan = {
        title: title.trim(),
        crop: crop.trim(),
        area: parseFloat(area),
        startDate,
        endDate,
        seedsCost: parseFloat(seedsCost) || 0,
        fertilizerCost: parseFloat(fertilizerCost) || 0,
        pesticidesCost: parseFloat(pesticidesCost) || 0,
        otherCost: parseFloat(otherCost) || 0,
      };

      await axios.post(`${BASE_URL}/finance/add`, newPlan);
      Alert.alert("Success", "Budget Plan Added Successfully");
      navigation.navigate("BudgetPlansScreen");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      validateStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
      validateEndDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Budget Plan</Text>

      {/* Title Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            validateTitle(text);
          }}
          placeholder="Enter Title"
          placeholderTextColor="#888"
        />
        {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
      </View>

      {/* Crop Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Crop</Text>
        <TextInput
          style={styles.input}
          value={crop}
          onChangeText={(text) => {
            setCrop(text);
            validateCrop(text);
          }}
          placeholder="Enter Crop Name"
          placeholderTextColor="#888"
        />
        {errors.crop ? <Text style={styles.errorText}>{errors.crop}</Text> : null}
      </View>

      {/* Area of Cultivation Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Area of Cultivation (in acres)</Text>
        <TextInput
          style={styles.input}
          value={area}
          onChangeText={(text) => {
            // Allow only numbers and decimal
            const sanitizedText = text.replace(/[^0-9.]/g, "");
            setArea(sanitizedText);
            validateArea(sanitizedText);
          }}
          placeholder="Enter Area"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        {errors.area ? <Text style={styles.errorText}>{errors.area}</Text> : null}
      </View>

      {/* Start Date Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {errors.startDate ? <Text style={styles.errorText}>{errors.startDate}</Text> : null}
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={onStartDateChange}
          />
        )}
      </View>

      {/* End Date Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {errors.endDate ? <Text style={styles.errorText}>{errors.endDate}</Text> : null}
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)} // At least one day after start date
            onChange={onEndDateChange}
          />
        )}
      </View>

      {/* Seeds Cost Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Seeds Cost</Text>
        <TextInput
          style={styles.input}
          value={seedsCost}
          onChangeText={(text) => {
            // Allow only numbers and decimal
            const sanitizedText = text.replace(/[^0-9.]/g, "");
            setSeedsCost(sanitizedText);
            validateSeedsCost(sanitizedText);
          }}
          placeholder="Enter Seeds Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        {errors.seedsCost ? <Text style={styles.errorText}>{errors.seedsCost}</Text> : null}
      </View>

      {/* Fertilizer Cost Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fertilizer Cost</Text>
        <TextInput
          style={styles.input}
          value={fertilizerCost}
          onChangeText={(text) => {
            // Allow only numbers and decimal
            const sanitizedText = text.replace(/[^0-9.]/g, "");
            setFertilizerCost(sanitizedText);
            validateFertilizerCost(sanitizedText);
          }}
          placeholder="Enter Fertilizer Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        {errors.fertilizerCost ? (
          <Text style={styles.errorText}>{errors.fertilizerCost}</Text>
        ) : null}
      </View>

      {/* Pesticides Cost Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Pesticides Cost</Text>
        <TextInput
          style={styles.input}
          value={pesticidesCost}
          onChangeText={(text) => {
            // Allow only numbers and decimal
            const sanitizedText = text.replace(/[^0-9.]/g, "");
            setPesticidesCost(sanitizedText);
            validatePesticidesCost(sanitizedText);
          }}
          placeholder="Enter Pesticides Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        {errors.pesticidesCost ? (
          <Text style={styles.errorText}>{errors.pesticidesCost}</Text>
        ) : null}
      </View>

      {/* Other Cost Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Other Cost</Text>
        <TextInput
          style={styles.input}
          value={otherCost}
          onChangeText={(text) => {
            // Allow only numbers and decimal
            const sanitizedText = text.replace(/[^0-9.]/g, "");
            setOtherCost(sanitizedText);
            validateOtherCost(sanitizedText);
          }}
          placeholder="Enter Other Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        {errors.otherCost ? <Text style={styles.errorText}>{errors.otherCost}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddPlan}>
        <Text style={styles.buttonText}>Add Budget Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#419F57",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  datePicker: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#419F57",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default AddBudgetPlan;
