import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StatusBar,
} from "react-native";
import Weather from "../components/Weather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import NearLocation from "../components/Home/NearLocation";
import CropCard from "../components/Home/CropCards";
import HeaderMenu from "../components/Menus/HeaderMenu";
import UserInfo from "../components/Home/UserInfo";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation(); // Get the navigation object

  const pan = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0 && isExpanded && scrollY._value === 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > SCREEN_HEIGHT / 4) {
          // Collapse the content section
          setIsExpanded(false);
          Animated.timing(pan, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // Snap back to expanded position
          Animated.spring(pan, {
            toValue: SCREEN_HEIGHT - 50,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const weatherSectionHeight = pan.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 50],
    outputRange: [SCREEN_HEIGHT / 2.5, 0],
    extrapolate: "clamp",
  });

  const contentSectionHeight = pan.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 50],
    outputRange: [SCREEN_HEIGHT / 3.7, SCREEN_HEIGHT],
    extrapolate: "clamp",
  });

  const handleScroll = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;

    // Expand on downward scroll at the bottom
    if (yOffset > 0 && !isExpanded) {
      setIsExpanded(true);
      Animated.timing(pan, {
        toValue: SCREEN_HEIGHT - 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    // Collapse on upward scroll at the top
    scrollY.setValue(yOffset);
    if (yOffset <= 0 && e.nativeEvent.velocity.y < 0) {
      setIsExpanded(false);
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleScrollEndDrag = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;

    // Collapse at the top
    if (yOffset <= 0 && e.nativeEvent.velocity.y < 0) {
      setIsExpanded(false);
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    // Expand at the bottom
    if (
      yOffset + scrollViewHeight >= contentHeight &&
      e.nativeEvent.velocity.y > 0
    ) {
      setIsExpanded(true);
      Animated.timing(pan, {
        toValue: SCREEN_HEIGHT - 50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleToggle = (expanded) => {
    setIsExpanded(expanded);
    Animated.timing(pan, {
      toValue: expanded ? 0 : SCREEN_HEIGHT / 1.65, // Toggle between full screen and partial screen
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const backgroundImageUri =
    "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg"; // Use your own image URL

  const cropButtonsData = [
    {
      id: "1",
      icon: "calendar",
      text: "Fertilizer Schedule",
      navigateTo: "FertilizerSchedule",
    },
    // { id: "2", icon: "camera", text: "Camera", navigateTo: "" },
    {
      id: "3",
      icon: "chart",
      text: "Finance",
      navigateTo: "BudgetPlansScreen",
    },
    {
      id: "4",
      icon: "location",
      text: "Distributors",
      navigateTo: "DistributeScreen",
    },
    { id: "5", icon: "user", text: "Community", navigateTo: "Community" },
  ];
  const renderCropButton = ({ item }) => (
    <View style={styles.cropButtonContainer}>
      <TouchableOpacity
        style={styles.cropButton}
        onPress={() => {
          if (item.navigateTo) {
            navigation.navigate(item.navigateTo);
          }
        }}
      >
        <EvilIcons name={item.icon} size={50} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.cropButtonText}>{item.text}</Text>
    </View>
  );
  return (
    <ImageBackground
      source={require("../assets/images/default-weather.jpg")}
      style={styles.container}
    >
      <LinearGradient
        colors={["rgba(255, 165, 0, 0.8)", "rgba(0, 128, 128, 0.8)"]} // Orange and Teal with 80% opacity
        // colors={['rgba(34, 139, 34, 0.8)', 'rgba(255, 215, 0, 0.8)']} // Green to Yellow gradient with opacity

        style={styles.gradient}
      />
      <View style={styles.container}>
        <Animated.View
          style={[styles.weatherSection, { height: weatherSectionHeight }]}
        >
          <Weather onToggle={handleToggle} />
        </Animated.View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.draggableSection, { height: contentSectionHeight }]}
        >
          <View style={styles.dragIndicator} />
          <View style={styles.topView}>
            <View>
              <Text style={styles.welcome}>Welcome</Text>
              <UserInfo/>
            </View>
          </View>

          {/* Container for the navigation buttons */}
          <View>
            <FlatList
              data={cropButtonsData}
              renderItem={renderCropButton}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cropButtons}
            />
          </View>

          {/* Content section */}

          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              onScroll={handleScroll}
              onScrollEndDrag={handleScrollEndDrag}
              scrollEventThrottle={16}
            >
              <Text style={styles.sectionTitle}>Next Fertilization Phase</Text>
              <CropCard />

              <Text style={styles.sectionTitle}>Nearby Distributors</Text>
              <NearLocation />


              {/* <Text style={styles.sectionTitle}>Finance</Text>

              <TouchableOpacity onPress={() => navigation.navigate('Community')}>
                <Text style={styles.sectionTitle}>Latest Post By Farmers</Text>
              </TouchableOpacity> */}
              {/* <HeaderMenu/> */}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // This ensures the gradient covers the entire background
  },
  weatherSection: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  draggableSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 8,
    paddingHorizontal: 20,
    overflow: "hidden", // Prevent the text from being clipped
    flex: 1, // Ensure that the section can grow
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  // The container for the crop buttons
  cropButtons: {
    paddingVertical: 20,
  },
  cropButtonContainer: {
    alignItems: "center",
    marginHorizontal: 10, // Add space between buttons horizontally
  },
  cropButton: {
    width: 75,
    height: 75,
    backgroundColor: "#607F0E", // Custom button color
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cropButtonText: {
    marginTop: 8, // Adjust margin to ensure text is spaced well
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContent: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 19,
    // fontStyle: "italic",
    fontFamily: "Nunito-ExtraBold",
    // fontWeight: "bold",
    marginBottom: 10,
    color: "#1e441f", // Fixed the color to have a valid hex value
  },
  cropImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  alertText: {
    fontSize: 16,
    color: "#FF9800",
    marginBottom: 10,
  },
});

export default Home;
