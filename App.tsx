import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import stops_df from './stops_df';
import routes from './routes';
import shapes from './shapes_df';
import { getDistance } from 'geolib';
import route_color from './route_color';

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [shapesToPlot, setShapesToPlot] = useState([]);
  const [region, setRegion] = useState(null);

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

  const findRoute = async () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please provide both current location and destination');
      return;
    }
  
    try {
      const [destLat, destLon] = destination.split(',').map(coord => parseFloat(coord));
      const response = await axios.post('http://192.168.1.40:5500/calculate_route_distance', {
        start_coords: [currentLocation.latitude, currentLocation.longitude],
        end_coords: [destLat, destLon]
      });
      const routeData = response.data;

      if (routeData.length === 0) {
        Alert.alert('Error', 'No route found');
        return;
      }

      console.log("API call successful!")
  
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
        return shapePoints.filter(point =>
          point.shape_pt_sequence >= fromShapePtSeq &&
          point.shape_pt_sequence <= toShapePtSeq
        );
      }).flat();

      setShapesToPlot(shapesData);

      // Set map region to show the full plot
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
          latitudeDelta: (maxLat - minLat) * 1.5,
          longitudeDelta: (maxLon - minLon) * 1.5,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to calculate route');
      console.error(error);
    }
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

  const groupedShapes = groupShapesByShapeId(shapesToPlot);

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
          <Marker coordinate={currentLocation} title="Start" pinColor='#000' />
          {Object.keys(groupedShapes).map(shapeId => {
            const shapePoints = groupedShapes[shapeId];
            const start = shapePoints[0];
            const end = shapePoints[shapePoints.length - 1];
            return (
              <React.Fragment key={shapeId}>
                <Polyline
                  coordinates={shapePoints.map(shape => ({
                    latitude: shape.shape_pt_lat,
                    longitude: shape.shape_pt_lon
                  }))}
                  strokeColor={route_color[shapeId] || '#000'} // default to black if no color is found
                  strokeWidth={5}
                />
                <Marker
                  coordinate={{ latitude: end.shape_pt_lat, longitude: end.shape_pt_lon }}
                  title="End"
                  pinColor={route_color[shapeId]}
                />
              </React.Fragment>
            );
          })}
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
