import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import stops_df from './stops_df';
import routes from './routes';
import shapes from './shapes_df';
import { getDistance } from 'geolib';

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [shapesToPlot, setShapesToPlot] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => { Alert.alert('Error', 'Unable to get current location'), console.error(error) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

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

  // const findRoute = async () => {
  //   if (!currentLocation || !destination) {
  //     Alert.alert('Error', 'Please provide both current location and destination');
  //     return;
  //   }

  //   try {
  //     const [destLat, destLon] = destination.split(',').map(coord => parseFloat(coord));
  //     const response = await axios.post('http://192.168.1.40:5500/calculate_route', {
  //       start_coords: [currentLocation.latitude, currentLocation.longitude],
  //       end_coords: [destLat, destLon]
  //     });
  //     const routeData = response.data;
  //     console.log(routeData);

  //     const shapeIds = routeData.map(segment => {
  //       const routeObj = routes.find(route => route.route_id === String(segment.route_id));
  //       return routeObj ? routeObj.shape_id : null;
  //     }).filter(shapeId => shapeId !== null);

  //     const shapesData = shapeIds.map(shapeId => {
  //       const shapePoints = shapes.filter(shape => shape.shape_id === shapeId);
  //       const fromStop = routeData.find(segment => segment.route_id === shapeId).from_stop;
  //       const toStop = routeData.find(segment => segment.route_id === shapeId).to_stop;

  //       const fromStopCoords = stops.find(stop => stop.stop_id === fromStop);
  //       const toStopCoords = stops.find(stop => stop.stop_id === toStop);

  //       const fromShapePtSeq = findNearestShapePoint(
  //         [fromStopCoords.stop_lat, fromStopCoords.stop_lon],
  //         shapePoints
  //       );
  //       const toShapePtSeq = findNearestShapePoint(
  //         [toStopCoords.stop_lat, toStopCoords.stop_lon],
  //         shapePoints
  //       );

  //       return shapePoints.filter(point =>
  //         point.shape_pt_sequence >= fromShapePtSeq &&
  //         point.shape_pt_sequence <= toShapePtSeq
  //       );
  //     }).flat();

  //     setShapesToPlot(shapesData);

  //     // setRoute(routeData);


  //     // const shapeIds = routeData.map(segment => {
  //     //   const routeObj = routes.find(route => route.route_id === String(segment.route_id));
  //     //   return routeObj ? routeObj.shape_id : null;
  //     // }).filter(shapeId => shapeId !== null);


  //     // const shapesData = shapeIds.map(shapeId => {
  //     //   return shapes.filter(shape => shape.shape_id === shapeId);
  //     // }).flat();


  //     // setShapesToPlot(shapesData);
  //   } catch (error) {
  //     Alert.alert('Error', 'Unable to calculate route');
  //     console.error(error);
  //   }
  // };

  const findRoute = async () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please provide both current location and destination');
      return;
    }
  
    try {
      const [destLat, destLon] = destination.split(',').map(coord => parseFloat(coord));
      const response = await axios.post('http://192.168.1.40:5500/calculate_route', {
        start_coords: [currentLocation.latitude, currentLocation.longitude],
        end_coords: [destLat, destLon]
      });
      const routeData = response.data;
      console.log(routeData);
  
      const shapesData = routeData.map(segment => {
        const routeObj = routes.find(route => route.route_id === String(segment.route_id));
        if (!routeObj) return []; // Return an empty array if routeObj is not found
  
        const shapeId = routeObj.shape_id;
        const shapePoints = shapes.filter(shape => shape.shape_id === shapeId);
  
        const fromStopCoords = stops_df.find(stop => stop.stop_id === segment.from_stop);
        const toStopCoords = stops_df.find(stop => stop.stop_id === segment.to_stop);
  
        if (!fromStopCoords || !toStopCoords) return []; // Return an empty array if stops are not found
  
        const fromShapePtSeq = findNearestShapePoint(
          [fromStopCoords.stop_lat, fromStopCoords.stop_lon],
          shapePoints
        );
        const toShapePtSeq = findNearestShapePoint(
          [toStopCoords.stop_lat, toStopCoords.stop_lon],
          shapePoints
        );
        console.log(fromShapePtSeq, toShapePtSeq, shapeId);
        return shapePoints.filter(point =>
          point.shape_pt_sequence >= fromShapePtSeq &&
          point.shape_pt_sequence <= toShapePtSeq
        );
      }).flat();
      console.log(shapesData);
      setShapesToPlot(shapesData);
    } catch (error) {
      Alert.alert('Error', 'Unable to calculate route');
      console.error(error);
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
        >
          <Marker coordinate={currentLocation} title="Your Location" />
          {shapesToPlot.length > 0 && (
            <Polyline
              coordinates={shapesToPlot.map(shape => ({
                latitude: shape.shape_pt_lat,
                longitude: shape.shape_pt_lon
              }))}
              strokeColor="#000"
              strokeWidth={5}
            />
          )}
        </MapView>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter destination (lat,lon)"
        onChangeText={setDestination}
        value={destination}
      />
      <Button title="Find Route" onPress={findRoute} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '80%',
  },
});

export default App;
