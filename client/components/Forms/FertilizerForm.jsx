import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header";

const FertilizerForm = ({ onSubmit }) => {
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [soilCondition, setSoilCondition] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Show or hide the date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();

  // Handle date change
  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep date picker open on iOS if needed
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      setPlantingDate(formattedDate);
      setSelectedDate(date);
    }
  };

  const handleSubmit = () => {
    if (cropType && plantingDate && soilCondition && areaSize) {
      onSubmit({
        cropType,
        plantingDate,
        soilCondition,
        areaSize,
      });
      setError(null);
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Add Details" />

      <View style={styles.form}>
        <Text style={styles.label}>Crop Type:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCropType(value)}
          items={[
            { label: "Rice", value: "rice" },
            { label: "Corn", value: "corn" },
            { label: "Soybeans", value: "soybeans" },
            { label: "Watermelon", value: "watermelon" },
            { label: "Big Onion", value: "big onion" },
            { label: "Red Onion", value: "red onion" },
            { label: "Cowpea", value: "cowpea" },
            { label: "Chili", value: "big onion" },
            { label: "Potato", value: "potato" },
          ]}
          placeholder={{
            label: "Select a crop type",
            value: null,
            color: "#9EA0A4", // Placeholder color
          }}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>Planting Date:</Text>
        <View>
          <TextInput
            style={styles.input}
            value={plantingDate}
            placeholder="Enter planting date (YYYY-MM-DD)"
            onFocus={showDatepicker} // Show date picker on input focus
          />

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()} // Optional: limit to past dates
            />
          )}
        </View>
        <Text style={styles.label}>Area Size:</Text>
        <TextInput
          style={styles.input}
          value={areaSize}
          onChangeText={setAreaSize}
          placeholder="Enter your area size in hectares"
        />
        <Text style={styles.label}>Soil Type:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSoilCondition(value)}
          items={[
            { label: "Reddish Brown Earth Soil", value: "Reddish Brown Earths" },
            { label: "Noncalcic Brown Soil", value: "Noncalcic Brown Soil" },
            { label: "Reddish Brown Lateritic Soil", value: "Reddish Brown Lateritic Soil" },
            { label: "Red-Yellow Podzolic Soil", value: "Red-Yellow Podzolic Soil" },
            { label: "Immature Brown Loams", value: "Immature Brown Loams" },
            { label: "Grumusols", value: "Grumusols" },
            { label: "Solodized Solonetz", value: "Solodized Solonetz" },
            { label: "Low-Humic Gley Soils", value: "Low-Humic Gley Soils" },
            { label: "Meadow Podzolic Soils", value: "Meadow Podzolic Soils" },
            { label: "Bog and Half-Bog Soils", value: "Bog and Half-Bog Soils" },
            { label: "Alluvial Soils", value: "Alluvial Soils" },
            { label: "Regosols", value: "Regosols" },
          ]}
          placeholder={{
            label: "Select soil condition",
            value: null,
            color: "#9EA0A4", // Placeholder color
          }}
          style={pickerSelectStyles}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Generate Schedule</Text>
          </View>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    marginTop: 10,
    padding: 0,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
    
  },
  button: {
    backgroundColor: "#607F0E",
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    // For Android
    elevation: 5, 
    
    // For iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // Adjust for softer shadow
  },
  
  buttonText: {
    fontSize: 18,
    fontFamily: "Nunito-Bold",
    // fontWeight: "900",
    color: "#fff",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#d1d1d1", // Border color
    borderRadius: 25,       // Border radius for iOS
    backgroundColor: "#fafafa",
    color: "black",
    paddingRight: 30,        // Padding for right side
    borderWidth: 1,
    borderColor: "#d1d1d1",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#d1d1d1", // Border color
    borderRadius: 25,       // Border radius for Android
    backgroundColor: "#fafafa",
    color: "black",
    paddingRight: 30,        // Padding for right side
    marginBottom: 10,

  },
  placeholder: {
    color: "#9EA0A4",        // Placeholder text color
    
  },
});


export default FertilizerForm;
