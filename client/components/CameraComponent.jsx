// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

// // const CameraComponent = () => {
// //   const { hasPermission, requestPermission } = useCameraPermission()
// //   const [cameraVisible, setCameraVisible] = useState(false);
// //   const [capturedImage, setCapturedImage] = useState(null);
// //   const cameraRef = useRef(null);
// //   const device = useCameraDevice('back')

// //   useEffect(() => {
// //     (async () => {
// //       const cameraPermission = await Camera.requestCameraPermission();
// //       requestPermission(cameraPermission === 'authorized');
// //     })();
// //   }, []);

// //   const handleCapture = async () => {
// //     if (cameraRef.current) {
// //       const photo = await cameraRef.current.takeSnapshot({
// //         quality: 85,
// //         skipMetadata: true,
// //       });
// //       setCapturedImage(photo.path);
// //       Alert.alert('Image Captured', 'Image has been captured successfully!');
// //     }
// //   };

// //   if (!device) {
// //     return <Text>Loading camera...</Text>;
// //   }

// //   if (!hasPermission) {
// //     return <Text>No access to camera</Text>;
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {cameraVisible ? (
// //         <View style={styles.cameraContainer}>
// //           <Camera
// //             ref={cameraRef}
// //             style={styles.preview}
// //             device={device}
// //             isActive={cameraVisible}
// //             photo={true}
// //           />
// //           <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
// //             <Text style={styles.captureText}>Capture</Text>
// //           </TouchableOpacity>
// //           {capturedImage && (
// //             <Image
// //               source={{ uri: 'file://' + capturedImage }}
// //               style={styles.capturedImage}
// //             />
// //           )}
// //           <TouchableOpacity style={styles.closeButton} onPress={() => setCameraVisible(false)}>
// //             <Text style={styles.closeText}>Close Camera</Text>
// //           </TouchableOpacity>
// //         </View>
// //       ) : (
// //         <TouchableOpacity style={styles.cropButton} onPress={() => setCameraVisible(true)}>
// //           <Text style={styles.cropButtonText}>Camera</Text>
// //         </TouchableOpacity>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   cameraContainer: {
// //     flex: 1,
// //     justifyContent: 'flex-end',
// //     alignItems: 'center',
// //   },
// //   preview: {
// //     flex: 1,
// //     width: '100%',
// //   },
// //   capturedImage: {
// //     width: 100,
// //     height: 100,
// //     marginTop: 10,
// //   },
// //   cropButton: {
// //     backgroundColor: '#333333',
// //     padding: 10,
// //     borderRadius: 50,
// //     alignItems: 'center',
// //   },
// //   cropButtonText: {
// //     marginTop: 5,
// //     color: '#FFFFFF',
// //     fontSize: 14,
// //   },
// //   captureButton: {
// //     backgroundColor: '#fff',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginBottom: 20,
// //   },
// //   captureText: {
// //     color: '#000',
// //     fontSize: 16,
// //   },
// //   closeButton: {
// //     backgroundColor: '#ff0000',
// //     padding: 10,
// //     borderRadius: 5,
// //     marginBottom: 20,
// //   },
// //   closeText: {
// //     color: '#fff',
// //     fontSize: 16,
// //   },
// // });

// // export default CameraComponent;



// const CameraComponent = () => {
//   const { hasPermission, requestPermission } = useCameraPermission()
 
//   const device = useCameraDevice('back')

//   useEffect(() => {
//     (async () => {
//       const cameraPermission = await Camera.requestCameraPermission();
//       requestPermission(cameraPermission === 'authorized');
//     })();
//   }, []);

//   if (!device) {
//     return <Text>Loading camera...</Text>;
//   }

//   if (!hasPermission) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//          <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//     />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   preview: {
//     flex: 1,
//     width: '100%',
//   },
//   capturedImage: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
//   cropButton: {
//     backgroundColor: '#333333',
//     padding: 10,
//     borderRadius: 50,
//     alignItems: 'center',
//   },
//   cropButtonText: {
//     marginTop: 5,
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   captureButton: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   captureText: {
//     color: '#000',
//     fontSize: 16,
//   },
//   closeButton: {
//     backgroundColor: '#ff0000',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   closeText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default CameraComponent;
