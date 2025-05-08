import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const screenWidth = Dimensions.get("window").width;

const BudgetPlanOverviewScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [budgetPlan, setBudgetPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBudgetPlan = async () => {
    try {
      const response = await axios.get(`/finance/get2/${id}`);
      setBudgetPlan(response.data.BudgetPlan);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching budget plan details:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBudgetPlan();
    }, [id])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!budgetPlan) {
    return (
      <View style={styles.errorContainer}>
        <Text>No budget plan found.</Text>
      </View>
    );
  }

  const handleEdit = () => {
    navigation.navigate("EditBudgetPlanScreen", { id });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this budget plan?",
      [
        {
          text: "No",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await axios.delete(`/finance/delete2/${id}`);
              Alert.alert("Success", "Budget plan deleted successfully.", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("BudgetPlansScreen"),
                },
              ]);
            } catch (error) {
              console.log("Error deleting budget plan:", error);
              Alert.alert("Error", "Failed to delete the budget plan.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const downloadPdf = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                color: #333;
              }
              h1 {
                color: #34A853;
                font-size: 28px;
                text-align: center;
                margin-bottom: 30px;
              }
              h2 {
                font-size: 22px;
                color: #34A853;
                border-bottom: 2px solid #34A853;
                padding-bottom: 5px;
                margin-bottom: 15px;
              }
              p {
                font-size: 16px;
                margin: 5px 0;
              }
              .section {
                margin-bottom: 30px;
              }
              .header {
                background-color: #34A853;
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 20px;
              }
              .info-block {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
              }
              .label {
                font-weight: bold;
                color: #555;
              }
              .value {
                color: #000;
              }
              .total-section {
                background-color: #f9f9f9;
                padding: 10px;
                border-radius: 8px;
                text-align: center;
                margin-top: 20px;
              }
              .profit-section {
                background-color: #e5f8e5;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                color: #34A853;
              }
            </style>
          </head>
          <body>
            <h1>Budget Plan Report</h1>
  
            <div class="header">
              <h2>${budgetPlan.title}</h2>
            </div>
  
            <div class="section">
              <h2>Overview</h2>
              <div class="info-block">
                <span class="label">Crop:</span>
                <span class="value">${budgetPlan.crop}</span>
              </div>
              <div class="info-block">
                <span class="label">Climate Zone:</span>
                <span class="value">${budgetPlan.climateZone}</span>
              </div>
              <div class="info-block">
                <span class="label">Area of Land (acres):</span>
                <span class="value">${budgetPlan.areaOfLand}</span>
              </div>
            </div>
  
            <div class="section">
              <h2>Financial Details</h2>
              <div class="info-block">
                <span class="label">Total Expenditure:</span>
                <span class="value">Rs.${budgetPlan.totalExpenditure}</span>
              </div>
              <div class="info-block">
                <span class="label">Total Yield (kg):</span>
                <span class="value">${budgetPlan.totalYield}</span>
              </div>
              <div class="info-block">
                <span class="label">Estimated Income:</span>
                <span class="value">Rs.${budgetPlan.estimatedIncome}</span>
              </div>
              <div class="profit-section">
                Profit: Rs.${budgetPlan.profit}
              </div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const fileUri = `${FileSystem.documentDirectory}${budgetPlan.title}_report.pdf`;
        await FileSystem.moveAsync({
          from: uri,
          to: fileUri,
        });
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Budget Plan Overview</Text>

      {/* Detail Overview */}
      <View style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Crop:</Text>
          <Text style={styles.value}>{budgetPlan.crop}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Climate Zone:</Text>
          <Text style={styles.value}>{budgetPlan.climateZone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Area of Land (acres):</Text>
          <Text style={styles.value}>{budgetPlan.areaOfLand}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Expenditure:</Text>
          <Text style={styles.value}>Rs.{budgetPlan.totalExpenditure}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Yield (kg):</Text>
          <Text style={styles.value}>{budgetPlan.totalYield}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Estimated Income:</Text>
          <Text style={styles.value}>Rs.{budgetPlan.estimatedIncome}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Profit:</Text>
          <Text style={styles.value}>Rs.{budgetPlan.profit}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      {/* Bar Chart for Financial Overview */}
      <Text style={styles.sectionHeader}>Financial Overview</Text>

      <BarChart
        data={{
          labels: ["Total Expenditure", "Estimated Income", "Profit"],
          datasets: [
            {
              data: [
                budgetPlan.totalExpenditure,
                budgetPlan.estimatedIncome,
                budgetPlan.profit,
              ],
              color: (opacity = 1) => `rgba(34, 193, 195, ${opacity})`, // Color of the bars
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="Rs."
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />

      {/* Download PDF Button */}
      <TouchableOpacity onPress={downloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download PDF Report</Text>
      </TouchableOpacity>

      {/* Edit and Delete Buttons */}
      <View style={styles.iconContainer}>
        {/* <TouchableOpacity onPress={handleEdit}>
          <FontAwesome name="edit" size={24} color="#34A853" />
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34A853",
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#34A853",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default BudgetPlanOverviewScreen;
