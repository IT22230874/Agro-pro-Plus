import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleSubmit = async () => {
    setLoading(true);
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name.trim()) {
      setNameError("Name is required");
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/auth/register", { name, email, password });
      alert(data.message);
      navigation.navigate("Login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setPasswordError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* Top Accent Shape */}
        <View style={styles.accentShape} />

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, nameError ? styles.inputError : null]}>
            <Ionicons name="leaf-outline" size={20} color="#607F0E" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#666"
            />
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <Ionicons name="mail-outline" size={20} color="#607F0E" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <Ionicons name="lock-closed-outline" size={20} color="#607F0E" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword} // Toggle password visibility
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
            {/* Toggle password visibility */}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="gray"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        {/* Already have account text */}
        <Text style={styles.bottomText}>
          Already have a farm account?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
            Sign in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  accentShape: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 120,
    height: 120,
    backgroundColor: "#607F0E",
    borderBottomLeftRadius: 100,
  },
  title: {
    fontSize: 45,
    fontFamily: "poppins-bold",
    color: "#607F0E", // Green for nature theme
    textAlign: "left",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 16,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "#607F0E",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -9,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: "#607F0E",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    fontFamily: "Nunito-Regular",

  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  link: {
    color: "#607F0E",
    fontWeight: "bold",
  },
});

export default Register;
