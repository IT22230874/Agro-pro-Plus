import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons"; // For call icon
import { useNavigation } from "@react-navigation/native";

const NearLocation = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      fetchNearbyDistributors(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
    };

    getCurrentLocation();
  }, []);

  const fetchNearbyDistributors = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get("/distribute/nearby", {
        params: {
          latitude,
          longitude,
        },
      });
      // console.log("API Response:", response.data); // Log the API response
      setDistributors(response.data); // Set the distributors' data directly
    } catch (error) {
      console.error("Error fetching nearby distributors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading distributors...</Text>
      ) : (
        <FlatList
          data={distributors}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.distributorItem}
              onPress={() => {
                navigation.navigate("DistributeScreen", {
                  lat: item.location?.lat,
                  lng: item.location?.lng,
                  businessName: item.business_name,
                });
              }}
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: item.imgUrl }}
                  style={styles.shopImage}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.businessName}>{item.business_name}</Text>
                  <Text style={styles.situatedPlace}>
                    {item.situated_place}
                  </Text>
                  <Text style={styles.distanceText}>
                    {/* Display the distance received from the backend */}
                    {item.distance ? `${item.distance.toFixed(2)} km away` : "Distance not available"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCall(item.phone_no)}
                >
                  <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          ListEmptyComponent={
            <Text style={styles.loadingText}>No distributors found.</Text>
          }
          contentContainerStyle={styles.listContainer}
          horizontal={true} // Set the FlatList to horizontal
          showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  refreshButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
    // marginLeft: 15, // Adjust margin for horizontal layout
    // elevation: 3,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,

  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  situatedPlace: {
    fontSize: 14,
    color: "#555",
  },
  distanceText: {
    fontSize: 14,
    color: "#888",
  },
  callButton: {
    backgroundColor: "#607F0E",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-c",
    marginLeft: 10,
    marginRight: 10,

  },
});

export default NearLocation;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },

//   refreshButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   loadingText: {
//     fontSize: 16,
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 15,
//     marginLeft: 15, // Adjust margin for horizontal layout
//     // elevation: 3,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   shopImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 15,
//   },
//   detailsContainer: {
//     flex: 1,
//   },
//   businessName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   situatedPlace: {
//     fontSize: 14,
//     color: "#555",
//   },
//   distanceText: {
//     fontSize: 14,
//     color: "#888",
//   },
//   callButton: {
//     backgroundColor: "#28A745",
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: "flex-c",
//     marginLeft: 10,
//   },
// });

// export default NearLocation;
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Linking,
// } from "react-native";
// import axios from "axios";
// import { MaterialIcons } from "@expo/vector-icons"; // For call icon
// import { useNavigation } from "@react-navigation/native";

// const NearLocation = () => {
//   const [distributors, setDistributors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const navigation = useNavigation();

//   // Hardcoded latitude and longitude
//   const hardcodedLocation = {
//     latitude: 6.8588258, // Example latitude (Bangalore, India)
//     longitude: 80.0246893, // Example longitude (Bangalore, India)
//   };

//   useEffect(() => {
//     // No need for location permissions or current location
//     fetchNearbyDistributors(hardcodedLocation.latitude, hardcodedLocation.longitude);
//   }, []);

//   const fetchNearbyDistributors = async (latitude, longitude) => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/distribute/nearby", {
//         params: {
//           latitude,
//           longitude,
//         },
//       });
//       // console.log("API Response:", response.data); // Log the API response
//       setDistributors(response.data); // Set the distributors' data directly
//     } catch (error) {
//       console.error("Error fetching nearby distributors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCall = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Text style={styles.loadingText}>Loading distributors...</Text>
//       ) : (
//         <FlatList
//           data={distributors}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.distributorItem}
//               onPress={() => {
//                 navigation.navigate("DistributeScreen", {
//                   lat: item.location?.lat,
//                   lng: item.location?.lng,
//                   businessName: item.business_name,
//                 });
//               }}
//             >
//               <View style={styles.card}>
//                 <Image
//                   source={{ uri: item.imgUrl }}
//                   style={styles.shopImage}
//                 />
//                 <View style={styles.detailsContainer}>
//                   <Text style={styles.businessName}>{item.business_name}</Text>
//                   <Text style={styles.situatedPlace}>
//                     {item.situated_place}
//                   </Text>
//                   <Text style={styles.distanceText}>
//                     {item.distance ? `${item.distance.toFixed(2)} km away` : "Distance not available"}
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   style={styles.callButton}
//                   onPress={() => handleCall(item.phone_no)}
//                 >
//                   <MaterialIcons name="call" size={24} color="white" />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) =>
//             item.id ? item.id.toString() : Math.random().toString()
//           }
//           ListEmptyComponent={
//             <Text style={styles.loadingText}>No distributors found.</Text>
//           }
//           contentContainerStyle={styles.listContainer}
//           horizontal={true} // Set the FlatList to horizontal
//           showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },

//   refreshButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//   },
//   loadingText: {
//     fontSize: 16,
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 5,
//     // marginLeft: 15, // Adjust margin for horizontal layout
//     // elevation: 3,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   shopImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 15,
//   },
//   detailsContainer: {
//     flex: 1,

//   },
//   businessName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   situatedPlace: {
//     fontSize: 14,
//     color: "#555",
//   },
//   distanceText: {
//     fontSize: 14,
//     color: "#888",
//   },
//   callButton: {
//     backgroundColor: "#607F0E",
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: "flex-c",
//     marginLeft: 10,
//     marginRight: 10,

//   },
// });

// export default NearLocation;
