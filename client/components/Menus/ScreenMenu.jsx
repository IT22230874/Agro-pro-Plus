import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import FertilizerSchedule from "../../screens/FertilzerSchedule/FertilizerSchedule";
import ScheduleDetails from "../../screens/FertilzerSchedule/ScheduleDetails";
import FertilizerFormScreen from "../../screens/FertilzerSchedule/FertilzerFormScreen";
import { useFonts } from "expo-font";

// import CameraComponet from "../../components/CameraComponent";

import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import DistributeScreen from "../../screens/DistributeScreen";

import AddBudgetPlan from "../../components/finance/AddBudgetPlan";
import BudgetPlansScreen from "../../components/finance/BudgetPlansScreen";
import BudgetPlansScreen2 from "../../components/finance/BudgetPlansScreen2";
import BudgetPlanOverviewScreen from "../../components/finance/BudgetPlanOverviewScreen";
import BudgetPlanOverviewScreen2 from "../../components/finance/BudgetPlanOverviewScreen2";
import EditBudgetPlanScreen from "../../components/finance/EditBudgetPlanScreen";
import MarketPriceTable from "../../components/finance/MarketPriceTable";
import updateExpenses from "../../components/finance/updateExpenses";
import AnalysisScreen from "../../components/finance/AnalysisScreen";
import MapDisplay from "../DistributorsMap/MapDisplay";
import LoadingOverlay from "../LoadingOverlay";
import CropSelectionScreen from "../../components/finance/CropSelectionScreen";
import Community from "../../screens/Community";
import SpecialNotices from "../../screens/SpecialNotices";
import ShareExperience from "../../screens/ShareExperience";
import ChatApp from "../../screens/ChatApp";
const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    "roboto": require("../../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "roboto-black": require("../../assets/fonts/Roboto-Black.ttf"),

    "poppins": require("../../assets/fonts/Poppins-Regular.ttf"),
    "poppins-semibold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraLight": require("../../assets/fonts/Nunito-ExtraLight.ttf"),
    "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-ExtraBold": require("../../assets/fonts/Nunito-ExtraBold.ttf"),


  });

  if (!fontsLoaded) {
    return (
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      //   <Text>Loading...</Text>
      // </View>
      <LoadingOverlay/>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      {authenticatedUser ? (
      <>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            title: "Full Stack App",
            headerRight: () => <HeaderMenu />,
          }}
        />
        
        <Stack.Screen
          name="FertilizerSchedule"
          component={FertilizerSchedule}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScheduleDetails"
          component={ScheduleDetails}
          options={{
            headerShown: false,
            headerTitle: "Schedule Details", // Set your header title
            headerTitleAlign: "center", // Center the header title
          }}
        />
        <Stack.Screen
          name="DistributeScreen"
          component={DistributeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Community"
          component={Community}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SpecialNotices"
          component={SpecialNotices}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ShareExperience"
          component={ShareExperience}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ChatApp"
          component={ChatApp}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="MapDisplay"
          component={MapDisplay}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="CameraComponent"
          component={CameraComponet}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="FertilizerFormScreen"
          component={FertilizerFormScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen name="AddBudgetPlan" component={AddBudgetPlan} options={{headerShown:true,headerTitle: 'Create Budget Plan' }}/>
        <Stack.Screen name="BudgetPlansScreen" component={BudgetPlansScreen} options={{headerShown:true,headerTitle: 'Finance' }}/>
        <Stack.Screen name="BudgetPlansScreen2" component={BudgetPlansScreen2} options={{headerShown:true,headerTitle: 'Finance' }}/>
        <Stack.Screen name="Budget Plan Overview" component={BudgetPlanOverviewScreen} options={{headerShown:true,headerTitle: 'Overview' }}/>
        <Stack.Screen name="Budget Plan Overview2" component={BudgetPlanOverviewScreen2} options={{headerShown:true,headerTitle: 'Overview' }}/>
        <Stack.Screen name="EditBudgetPlanScreen" component={EditBudgetPlanScreen} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="MarketPriceTable" component={MarketPriceTable} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="updateExpenses" component={updateExpenses} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="CropSelectionScreen" component={CropSelectionScreen} options={{headerShown:true,headerTitle: 'Create Budget Plan' }}/>
        <Stack.Screen name="AnalysisScreen" component={AnalysisScreen} options={{headerShown:true,headerTitle: '' }}/>
      </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;