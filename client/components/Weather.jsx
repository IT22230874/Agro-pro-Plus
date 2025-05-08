import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Install this package if not already
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";

const Weather_API = "087a8dbb53db441581aa5854de3eb8b4";
const WeatherDailyURL = `https://api.weatherbit.io/v2.0/forecast/daily`;
const WeatherHourlyURL = `https://api.weatherbit.io/v2.0/forecast/hourly`;

const WeatherApp = ({ onToggle, onWeatherDataUpdate }) => {
  const [dailyWeather, setDailyWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch weather data
  const fetchWeatherData = async () => {
    if (!location) return;

    const { latitude, longitude } = location.coords;
    try {
      const dailyResults = await fetch(
        `${WeatherDailyURL}?lat=${latitude}&lon=${longitude}&key=${Weather_API}`
      );
      const dailyData = await dailyResults.json();
      setDailyWeather(dailyData);

      const hourlyResults = await fetch(
        `${WeatherHourlyURL}?lat=${latitude}&lon=${longitude}&key=${Weather_API}`
      );
      const hourlyData = await hourlyResults.json();
      setHourlyWeather(hourlyData);

      // Pass the weather data to the parent component
      if (onWeatherDataUpdate && typeof onWeatherDataUpdate === "function") {
        onWeatherDataUpdate(dailyData);
      }
    } catch (error) {
      setErrorMsg("Error fetching weather data. Please try again later.");
      console.error("Error fetching weather data:", error);
    }
  };

  // Request location and fetch weather
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg("Error fetching location. Please try again.");
      }
    })();
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  const todayWeather =
    dailyWeather && dailyWeather.data.length > 0 ? dailyWeather.data[0] : null;

  if (!todayWeather) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Weather data is unavailable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top section showing today's weather */}
      <View style={styles.weatherTop}>
        <View style={styles.leftColumn}>
          <View style={styles.weatherContainer}>
            <View style={styles.cityContainer}>
              <MaterialIcons name="location-pin" size={20} color="white" />
              <Text style={styles.cityName}>{dailyWeather.city_name}</Text>
            </View>
            <View style={styles.tempContainer}>
              <Image
                source={{
                  uri: `https://cdn-icons-png.flaticon.com/128/4814/4814489.png`,
                }}
                style={styles.topweatherIcon}
              />
              <Text style={styles.temp}>{Math.round(todayWeather.temp)}°C</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.details}>
            {Math.round(todayWeather.min_temp)}° /{" "}
            {Math.round(todayWeather.max_temp)}°
          </Text>
          <Text style={styles.details}>{todayWeather.wind_spd} km/h</Text>
          <Text style={styles.details}>Humidity: {todayWeather.rh}%</Text>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        {/* Toggle Button for Hourly and Daily Forecast */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {todayWeather.weather.description}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newExpansionState = !isExpanded;
              setIsExpanded(newExpansionState);
              onToggle(newExpansionState); // Notify parent of the toggle state change
            }}
            style={styles.toggleButton}
          >
            <Icon
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#fff"
              fontWeight="bold"
            />
          </TouchableOpacity>
        </View>

        {/* Expanded Sections */}
        {isExpanded && (
          <>
            {/* Hourly forecast section */}
            <ScrollView
              horizontal
              style={styles.hourlyScroll}
              showsHorizontalScrollIndicator={false}
            >
              {hourlyWeather?.data?.slice(0, 12).map((hour, index) => (
                <View style={styles.hourBlock} key={index}>
                  <Text style={styles.hour}>
                    {new Date(hour.timestamp_utc).getHours()}:00
                  </Text>
                  {hour.weather && hour.weather.icon ? (
                    <Image
                      source={{
                        uri: `https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`,
                      }}
                      style={styles.weatherIcon}
                    />
                  ) : (
                    <Text style={styles.noIcon}>No Icon</Text>
                  )}
                  <Text style={styles.hourTemp}>
                    {Math.round(hour.temp)}°C
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Weekly forecast section */}
            <ScrollView
              style={styles.weeklyScroll}
              showsVerticalScrollIndicator={false}
            >
              {dailyWeather?.data?.slice(1, 7).map((day, idx) => (
                <View style={styles.dailyForecast} key={idx}>
                  <Text style={styles.day}>
                    {new Date(day.datetime).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Text style={styles.rainChance}>{day.pop}% Rain</Text>
                  {day.weather && day.weather.icon ? (
                    <Image
                      source={{
                        uri: `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`,
                      }}
                      style={styles.weatherIcon}
                    />
                  ) : (
                    <Text style={styles.noIcon}>No Icon</Text>
                  )}
                  <Text style={styles.dayTemp}>
                    {Math.round(day.min_temp)}° / {Math.round(day.max_temp)}°
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#D6EAF8',
    padding: 0,
  },
  weatherTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
    // backgroundColor: "#D6EAF8", // Light blue background
    borderRadius: 10,
    // elevation: 0.5, // Adds a subtle shadow
    marginBottom: 5,
  },
  weatherContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topweatherIcon: {
    width: 65, // Adjust size as needed
    height: 65, // Adjust size as needed
    resizeMode: "contain", // Ensures the image fits within the bounds without stretching
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column", // Stacks items vertically
    justifyContent: "space-between",
    gap: 10,
  },
  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  hourlyScroll: {
    flexDirection: "row",
    marginVertical: 20,
    paddingVertical: 10,
  },
  hourBlock: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
    borderRadius: 8,
    width: 70,
    // Applying glassmorphism
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent border
    shadowColor: "rgba(0, 0, 0, 0.2)", // Slight shadow to enhance effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    backdropFilter: "blur(10px)", // Blurring the background (Note: React Native does not support this directly; use libraries or platform-specific solutions for actual effect)
  },

  hour: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
  },
  hourTemp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  weatherIcon: {
    width: 45,
    height: 45,
  },

  weeklyScroll: {
    marginVertical: 0,
  },
  dailyForecast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 3,
    paddingHorizontal: 10,
  },
  day: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  rainChance: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  dayTemp: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  toggleContainer: {
    borderRadius: 28,
    elevation: 0.5, // Adds a subtle shadow
    padding: 10,
  },

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#C9E9FF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent border
    shadowColor: "rgba(0, 0, 0, 0.5)", // Slight shadow to enhance effect
    // shadowOffset: { width: 0, height: 2 },
  },

  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default WeatherApp;
