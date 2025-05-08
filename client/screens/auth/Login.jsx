import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleSubmit = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

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
      const { data } = await axios.post("/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      navigation.navigate("Home");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      if (error.response?.data?.field === "email") {
        setEmailError(errorMessage);
      } else if (error.response?.data?.field === "password") {
        setPasswordError(errorMessage);
      } else {
        setEmailError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farm Login</Text>
      <Text style={styles.subtitle}>Please sign in to access your farm data.</Text>

      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
          <Ionicons name="mail-outline" size={20} color="#607F0E" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            placeholderTextColor="#666"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
          <Ionicons name="lock-closed-outline" size={20} color="#607F0E" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
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

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => console.log("Forgot Password pressed")}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 45,
    fontFamily: "poppins-bold",
    color: "#607F0E", // Green for nature theme
    marginBottom: -10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    fontFamily: "Nunito-Regular",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 16,
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
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  forgotPassword: {
    alignItems: "flex-end",
  },
  forgotText: {
    color: "#607F0E", // Light green for consistency with theme
    fontSize: 14,
  },
  button: {
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  link: {
    color: "#607F0E", // Link color matching theme
    fontWeight: "bold",
  },
});

export default Login;
