import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from "axios";
import { BASE_URL } from '../../constants/constants';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const screenWidth = Dimensions.get("window").width;

const AnalysisScreen = ({ route }) => {
  const { id } = route.params; // Budget Plan ID from navigation
  const [budgetPlan, setBudgetPlan] = useState(null);
  
  useEffect(() => {
    const fetchBudgetPlan = async () => {
      try {
        const response = await axios.get(`/finance/get/${id}`);
        setBudgetPlan(response.data.BudgetPlan);
      } catch (error) {
        console.log("Error fetching budget plan:", error);
      }
    };

    fetchBudgetPlan();
  }, [id]);

  const downloadPdf = async () => {
    try {
      const htmlContent = `
        <h1>Budget Plan: ${budgetPlan.title}</h1>
        <p>Crop: ${budgetPlan.crop}</p>
        <p>Estimated Revenue: ₹${budgetPlan.actualRevenue}</p>
        <p>Profit: ₹${budgetPlan.actualRevenue - (budgetPlan.aseedsCost + budgetPlan.afertilizerCost + budgetPlan.apesticidesCost + budgetPlan.aotherCost)}</p>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // For iOS, directly share the generated PDF
      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri);
      } else {
        // For Android, save the file and then share it
        const fileUri = `${FileSystem.documentDirectory}${budgetPlan.title}_analysis.pdf`;
        await FileSystem.moveAsync({
          from: uri,
          to: fileUri,
        });

        // Open the PDF file after saving it
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!budgetPlan) {
    return <Text>Loading...</Text>;
  }

  // Data for charts
  const actualExpenses = [
    { name: "Seeds", cost: budgetPlan.aseedsCost, color: "green", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Fertilizer", cost: budgetPlan.afertilizerCost, color: "blue", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Pesticides", cost: budgetPlan.apesticidesCost, color: "orange", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Other", cost: budgetPlan.aotherCost, color: "red", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  const estimatedExpenses = [
    budgetPlan.seedsCost,
    budgetPlan.fertilizerCost,
    budgetPlan.pesticidesCost,
    budgetPlan.otherCost
  ];

  const actualExpensesTotal = actualExpenses.reduce((acc, curr) => acc + curr.cost, 0);
  const estimatedExpensesTotal = estimatedExpenses.reduce((acc, curr) => acc + curr, 0);

  const expectedProfit = budgetPlan.actualRevenue - estimatedExpensesTotal;
  const actualProfit = budgetPlan.actualRevenue - actualExpensesTotal;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Budget Plan Analysis</Text>
      
      <Text style={styles.sectionHeader}>Expense Comparison</Text>
      <BarChart
        data={{
          labels: ["Seeds", "Fertilizer", "Pesticides", "Other"],
          datasets: [
            {
              data: estimatedExpenses,
              color: () => `rgba(0, 0, 255, 0.5)` // Estimated expenses color
            },
            {
              data: [budgetPlan.seedsCost, budgetPlan.fertilizerCost, budgetPlan.pesticidesCost, budgetPlan.otherCost],
              color: () => `rgba(0, 255, 0, 0.5)` // Actual expenses color
            },
          ]
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        }}
      />

      <Text style={styles.sectionHeader}>Total Expenses</Text>
      <PieChart
        data={actualExpenses}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        }}
        accessor={"cost"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />

      <Text style={styles.sectionHeader}>Profit Analysis</Text>
      <Text>Expected Profit: Rs.{expectedProfit.toFixed(2)}</Text>
      <Text>Actual Profit: Rs.{actualProfit.toFixed(2)}</Text>

      <TouchableOpacity onPress={downloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download PDF Report</Text>
      </TouchableOpacity>
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
});

export default AnalysisScreen;
