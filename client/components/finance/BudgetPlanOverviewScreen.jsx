import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import {BASE_URL} from '../../constants/constants';

const BudgetPlanOverviewScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [budgetPlan, setBudgetPlan] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchBudgetPlan = async () => {
    try {
      const response = await axios.get(`/finance/get/${id}`);
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
    navigation.navigate('EditBudgetPlanScreen', { id });
  };

  const handleExpensesUpdate = () => {
    navigation.navigate('updateExpenses', { id });
  };

  const handleAnalysisScreen = () => {
    navigation.navigate('AnalysisScreen', { id });
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
              await axios.delete(`/finance/delete/${id}`);
              Alert.alert("Success", "Budget plan deleted successfully.", [
                { text: "OK", onPress: () => navigation.navigate('BudgetPlansScreen') }
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

    // Convert seedsCost and fertilizerCost to numbers and calculate the sum
    const seedsCost = parseFloat(budgetPlan.seedsCost) || 0;
    const fertilizerCost = parseFloat(budgetPlan.fertilizerCost) || 0;
    const pesticidesCost = parseFloat(budgetPlan.pesticidesCost) || 0;
    const otherCost = parseFloat(budgetPlan.otherCost) || 0;
    const estimatedRevenue = parseFloat(budgetPlan.estimatedRevenue) || 0;
    const estimatedYield = parseFloat(budgetPlan.estimatedYield) || 0;
    const totalCost = seedsCost + fertilizerCost + pesticidesCost + otherCost;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.header}>{budgetPlan.title || "No Title Available"}</Text>
    
          <View style={styles.budgetCard}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleEdit}>
                <FontAwesome name="edit" size={24} color="#fff" />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={handleExpensesUpdate}>
                <FontAwesome name="dollar" size={24} color="#fff" />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={handleDelete}>
                <FontAwesome name="trash" size={24} color="#fff" style={styles.icon} />
              </TouchableOpacity>
            </View>
    
            <Text style={styles.budgetLabel}>Estimated Budget</Text>
            <Text style={styles.budgetAmount}>Rs. {totalCost}</Text>
            <View style={styles.budgetStatus}>
              <View style={styles.statusItem}>
                <FontAwesome name="arrow-up" size={18} color="red" />
                <Text style={styles.statusText}>Actual Yield(Kg)</Text>
                <Text style={styles.statusAmount}>{budgetPlan.actualYield}</Text>
              </View>
              <View style={styles.statusItem}>
                <FontAwesome name="check-circle" size={18} color="white" />
                <Text style={styles.statusText}>Actual Revenue</Text>
                <Text style={styles.statusAmount}>Rs. {budgetPlan.actualRevenue}</Text>
              </View>
            </View>
          </View>
    
          <View style={styles.expensesHeader}>
            <Text style={styles.expensesLabel}>Expenses</Text>
            <TouchableOpacity onPress={handleAnalysisScreen}>
              <Text style={styles.viewAnalysis}>View Analysis</Text>
            </TouchableOpacity>
          </View>
    
          <View style={styles.expensesContainer}>
            <View style={styles.expenseItem}>
              <View style={styles.expenseCircle}>
                <Image source={require('../../assets/images/fertilizer.png')} style={styles.expenseImage} />
              </View>
              <View>
                <Text style={styles.expenseLabel}>Fertilizer</Text>
                <Text style={styles.expenseAmount}>Estimated Cost Rs. {budgetPlan.fertilizerCost}</Text>
              </View>
            </View>
    
            <View style={styles.expenseItem}>
              <View style={styles.expenseCircle}>
                <Image source={require('../../assets/images/seed.png')} style={styles.expenseImage} />
              </View>
              <View>
                <Text style={styles.expenseLabel}>Seeds</Text>
                <Text style={styles.expenseAmount}>Estimated Cost Rs. {budgetPlan.seedsCost}</Text>
              </View>
            </View>
    
            <View style={styles.expenseItem}>
              <View style={styles.expenseCircle}>
                <Image source={require('../../assets/images/pesticide.png')} style={styles.expenseImage} />
              </View>
              <View>
                <Text style={styles.expenseLabel}>Pesticides</Text>
                <Text style={styles.expenseAmount}>Estimated Cost Rs. {budgetPlan.pesticidesCost}</Text>
              </View>
            </View>
    
            <View style={styles.expenseItem}>
              <View style={styles.expenseCircle}>
                <Image source={require('../../assets/images/spending.png')} style={styles.expenseImage} />
              </View>
              <View>
                <Text style={styles.expenseLabel}>Other</Text>
                <Text style={styles.expenseAmount}>Estimated Cost Rs. {budgetPlan.otherCost}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
    
        <TouchableOpacity style={styles.addButton} onPress={handleExpensesUpdate}>
        <Text style={styles.filterTexta}>Add Expenses</Text>
        </TouchableOpacity>
      </View>
    );
  };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      scrollViewContent: {
        padding: 20,
        paddingBottom: 100,
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#607F0E', // Accent color
      },
      budgetCard: {
        backgroundColor: '#34A853',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        position: 'relative',
      },
      budgetLabel: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
      },
      budgetAmount: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      budgetStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      statusItem: {
        alignItems: 'center',
      },
      statusText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
      },
      statusAmount: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
      },
      expensesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
      expensesLabel: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      viewAnalysis: {
        color: '#34A853',
        fontWeight: 'bold',
      },
      expensesContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#607F0E', // Accent color
        backgroundColor: '#e7f9e7', // Light background
      },
      expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
      },
      expenseCircle: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      expenseImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      expenseLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      expenseAmount: {
        fontSize: 14,
        color: '#757575',
      },
      addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#34A853',
        borderRadius: 50,
        padding: 20,
        elevation: 5,
      },
      iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
      },
      icon: {
        marginLeft: 10,
      },
    });
    
export default BudgetPlanOverviewScreen;
