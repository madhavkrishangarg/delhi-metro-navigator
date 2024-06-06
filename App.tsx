import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Button, StyleSheet, Alert, Text, TouchableOpacity, Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import stops_df from './stops_df';
import routes from './routes';
import shapes from './shapes_df';
import { getDistance } from 'geolib';
import route_color from './route_color';
import debounce from 'lodash.debounce';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Custom component for current location marker
const CurrentLocationMarker = () => (
  <View style={styles.currentLocationMarker}>
    <View style={styles.currentLocationOuterCircle}>
      <View style={styles.currentLocationInnerCircle} />
    </View>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [shapesToPlot, setShapesToPlot] = useState([]);
  const [region, setRegion] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [startingStop, setStartingStop] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => {
        Alert.alert('Error', 'Unable to get current location');
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (navigationStarted) {
          debouncedUpdateRoute();
        }
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, distanceFilter: 10, interval: 10000 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, [currentLocation, destination, navigationStarted]);

  const findNearestShapePoint = (stopCoords, shapePoints) => {
    let minDistance = Infinity;
    let nearestPoint = null;

    shapePoints.forEach(point => {
      const distance = getDistance(
        { latitude: stopCoords[0], longitude: stopCoords[1] },
        { latitude: point.shape_pt_lat, longitude: point.shape_pt_lon }
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point.shape_pt_sequence;
      }
    });

    return nearestPoint;
  };

  const findNearestStop = (coords) => {
    let minDistance = Infinity;
    let nearestStop = null;

    stops_df.forEach(stop => {
      const distance = getDistance(
        { latitude: coords[0], longitude: coords[1] },
        { latitude: stop.stop_lat, longitude: stop.stop_lon }
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestStop = stop;
      }
    });

    return nearestStop;
  };

  const updateRoute = async () => {
    if (!startingPoint || !destination) return;

    try {
      const [startLat, startLon] = startingPoint.split(',').map(coord => parseFloat(coord));
      const [destLat, destLon] = destination.split(',').map(coord => parseFloat(coord));
      const response = await axios.post('http://192.168.1.40:5500/calculate_route_distance', {
        start_coords: [startLat, startLon],
        end_coords: [destLat, destLon]
      });

      const routeData = response.data;
      if (!routeData || routeData.length === 0 || !Array.isArray(routeData)) {
        Alert.alert('Error', 'No route found');
        return;
      }

      const startingStopData = stops_df.find(stop => stop.stop_id === routeData[0].from_stop);
      setStartingStop(startingStopData);

      const shapesData = routeData.map(segment => {
        const routeObj = routes.find(route => route.route_id === String(segment.route_id));
        if (!routeObj) return [];

        const shapeId = routeObj.shape_id;
        const shapePoints = shapes.filter(shape => shape.shape_id === shapeId);

        const fromStopCoords = stops_df.find(stop => stop.stop_id === segment.from_stop);
        const toStopCoords = stops_df.find(stop => stop.stop_id === segment.to_stop);

        if (!fromStopCoords || !toStopCoords) return [];

        const fromShapePtSeq = findNearestShapePoint(
          [fromStopCoords.stop_lat, fromStopCoords.stop_lon],
          shapePoints
        );
        const toShapePtSeq = findNearestShapePoint(
          [toStopCoords.stop_lat, toStopCoords.stop_lon],
          shapePoints
        );

        return shapePoints.filter(point =>
          point.shape_pt_sequence >= fromShapePtSeq &&
          point.shape_pt_sequence <= toShapePtSeq
        );
      }).flat();

      setShapesToPlot(shapesData);

      if (shapesData.length > 0) {
        const latitudes = shapesData.map(point => point.shape_pt_lat);
        const longitudes = shapesData.map(point => point.shape_pt_lon);

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);

        setRegion({
          latitude: (minLat + maxLat) / 2,
          longitude: (minLon + maxLon) / 2,
          latitudeDelta: (maxLat - minLat) * 1.25,
          longitudeDelta: (maxLon - minLon) * 1.25,
        });
      }

      setRoute(routeData);
      setInstructions(getTurnByTurnInstructions(routeData));

    } catch (error) {
      Alert.alert('Error', 'Unable to update route');
      console.error(error);
    }
  };

  const debouncedUpdateRoute = useCallback(debounce(updateRoute, 1000), [startingPoint, destination]);

  useEffect(() => {
    if (startingPoint && destination) {
      updateRoute();
    }
  }, [startingPoint, destination]);

  const startNavigation = async () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please provide both current location and destination');
      return;
    }
    const [startLat, startLon] = startingPoint.split(',').map(coord => parseFloat(coord));
    if (currentLocation.latitude !== startLat || currentLocation.longitude !== startLon) {
      Alert.alert('Error', 'Current location does not match the starting point');
      return;
    }
    setNavigationStarted(true);
    navigation.navigate('Directions');
    await updateRoute();
  };

  const getTurnByTurnInstructions = (route) => {
    return route.map((segment, index) => {
      const nextSegment = route[index + 1];
      if (!nextSegment) return `Arrive at destination ${segment.stop_name}`;
      return `Go to ${nextSegment.stop_name}`;
    });
  };

  const groupShapesByShapeId = (shapes) => {
    return shapes.reduce((acc, shape) => {
      if (!acc[shape.shape_id]) {
        acc[shape.shape_id] = [];
      }
      acc[shape.shape_id].push(shape);
      return acc;
    }, {});
  };

  const groupedShapes = useMemo(() => groupShapesByShapeId(shapesToPlot), [shapesToPlot]);

  const centerMapOnCurrentLocation = () => {
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={region}
        >
          {route.length > 0 && shapesToPlot.length > 0 && (
            <Marker
              coordinate={{
                latitude: shapesToPlot[0].shape_pt_lat,
                longitude: shapesToPlot[0].shape_pt_lon,
              }}
              title={startingStop.stop_name}
              pinColor="red"
            />
          )}

          <Marker coordinate={currentLocation}>
            <CurrentLocationMarker />
          </Marker>

          {Object.keys(groupedShapes).map(shapeId => {
            const shapePoints = groupedShapes[shapeId];
            const start = shapePoints[0];
            const end = shapePoints[shapePoints.length - 1];
            const nearestStopEnd = findNearestStop([end.shape_pt_lat, end.shape_pt_lon]);
            return (
              <React.Fragment key={shapeId}>
                <Polyline
                  coordinates={shapePoints.map(shape => ({
                    latitude: shape.shape_pt_lat,
                    longitude: shape.shape_pt_lon
                  }))}
                  strokeColor={route_color[shapeId] || '#000'}
                  strokeWidth={6}
                />
                <Marker
                  coordinate={{
                    latitude: end.shape_pt_lat,
                    longitude: end.shape_pt_lon,
                  }}
                  title={nearestStopEnd.stop_name}
                  pinColor={route_color[shapeId] || '#000'}
                />
              </React.Fragment>
            );
          })}
        </MapView>
      )}

      <View style={styles.banner}>
        {currentLocation && (<GooglePlacesAutocomplete
          placeholder="Enter Starting Point"
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location;
            setStartingPoint(`${lat},${lng}`);
          }}
          query={{
            key: 'AIzaSyD3GEeam3dsxAwWfZxmDsQTkTvkcSpZ6eg',
            language: 'en',
            location: `${currentLocation.latitude},${currentLocation.longitude}`,
            radius: 10000,
          }}
          debounce={100}
          // keyboardShouldPersistTaps='never'
          listViewDisplayed='auto'
          fetchDetails={true}
          predefinedPlaces={[{
            description: 'Current Location',
            geometry: { location: { lat: currentLocation.latitude, lng: currentLocation.longitude } }
          }]}
          styles={{
            container: styles.placesAutocompleteContainer,
            textInputContainer: styles.placesAutocompleteTextInputContainer,
            textInput: styles.placesAutocompleteTextInput,
          }}
        />)}

        {currentLocation && (<GooglePlacesAutocomplete
          placeholder='Enter Destination'
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location;
            setDestination(`${lat},${lng}`);
          }}
          query={{
            key: 'AIzaSyD3GEeam3dsxAwWfZxmDsQTkTvkcSpZ6eg',
            language: 'en',
            location: `${currentLocation.latitude},${currentLocation.longitude}`,
            radius: 10000,
          }}
          debounce={100}
          // keyboardShouldPersistTaps='never'
          listViewDisplayed='auto'
          fetchDetails={true}
          styles={{
            container: styles.placeAutocompleteContainerDestination,
            textInputContainer: styles.placesAutocompleteTextInputContainer,
            textInput: styles.placesAutocompleteTextInput,
          }}
        />)}
      </View>

      <View style={styles.bottomContainer}>
        {currentLocation && (
          <TouchableOpacity
            style={styles.locationButton}
            onPress={centerMapOnCurrentLocation}
          >
            <Icon name="location-arrow" size={30} color="#007bff" />
          </TouchableOpacity>
        )}

        {instructions.length > 0 && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsHeader}>Turn-by-Turn Instructions:</Text>
            {instructions.map((instruction, index) => (
              <Text key={index} style={styles.instructionText}>{instruction}</Text>
            ))}
          </View>
        )}

        <View style={styles.bottomBanner}>
          <TouchableOpacity
            style={styles.startNavigationButton}
            onPress={startNavigation}
          >
            <Text style={styles.startNavigationButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

  );
};

const NavigationScreen = () => {
  return (
    <View>
      <Text>Navigation Screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Metro Navigation">
        <Stack.Screen name="Metro Navigation" component={HomeScreen} />
        <Stack.Screen name="Directions" component={NavigationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const { width } = Dimensions.get('window');



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationMarker: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocationOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocationInnerCircle: {
    width: 16,
    height: 16,
    borderRadius: 18,
    backgroundColor: 'blue',
  },
  banner: {
    position: 'absolute',
    top: -5,
    width: width * 1,
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    zIndex: 1,
    overflow: 'visible',
  },
  bottomBanner: {
    // position: 'absolute',
    bottom: -15,
    left: 0,
    width: width,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 0,
    padding: 0,
    alignItems: 'center',
    // zIndex: 1,
  },
  placesAutocompleteContainer: {
    width: width * 0.8,
    // paddingHorizontal: 10,
    marginVertical: 5,
    zIndex: 3,
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeAutocompleteContainerDestination: {
    width: width * 0.8,
    // paddingHorizontal: 10,
    marginVertical: 5,
    zIndex: 2,
    position: 'absolute',
    top: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placesAutocompleteTextInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#ced4da',
    borderWidth: 2,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  placesAutocompleteTextInput: {
    height: 35,
    color: '#495057',
    fontSize: 16,
    // paddingHorizontal: 10,
  },
  startNavigationButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 10,
    position: 'absolute',
    bottom: 15,
    left: width / 15,
    zIndex: 1,
  },
  startNavigationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    // position: 'relative',
    // bottom: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#ced4da',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    zIndex: 1,
  },
  instructionsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  locationButton: {
    // position: 'absolute',
    bottom: 10,
    left: width / 2.6,
    height: 60,
    width: 60,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 0,
    elevation: 5,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    // position: 'absolute',
    bottom: 0,
    width: width,
    // height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    zIndex: 1,
  },
});

export default App;
