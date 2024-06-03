import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Alert, Text } from 'react-native';
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
  const [nearestStop, setNearestStop] = useState(null);
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [shapesToPlot, setShapesToPlot] = useState([]);
  const [region, setRegion] = useState(null);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        const nearest = findNearestStop([latitude, longitude]);
        setNearestStop(nearest);
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
        updateRoute();
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, distanceFilter: 10, interval: 10000 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, [currentLocation, destination]);

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
    if (!currentLocation || !destination) return;

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
          latitudeDelta: (maxLat - minLat) * 1.5,
          longitudeDelta: (maxLon - minLon) * 1.5,
        });
      }

      setRoute(routeData);
      setInstructions(getTurnByTurnInstructions(routeData));

    } catch (error) {
      Alert.alert('Error', 'Unable to update route');
      console.error(error);
    }
  };

  const findRoute = async () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please provide both current location and destination');
      return;
    }
    updateRoute();
  };

  const getTurnByTurnInstructions = (route) => {
    // Simplified example of generating instructions from route data
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
          {nearestStop && (
            <Marker coordinate={{ latitude: nearestStop.stop_lat, longitude: nearestStop.stop_lon }} title={nearestStop.stop_name} pinColor='#000' />
          )}
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
                  strokeColor={route_color[shapeId] || '#000'} // default to black if no color is found
                  strokeWidth={5}
                />
                <Marker
                  coordinate={{ latitude: end.shape_pt_lat, longitude: end.shape_pt_lon }}
                  title={nearestStopEnd.stop_name}
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
      <View style={styles.instructionsContainer}>
        {instructions.map((instruction, index) => (
          <Text key={index} style={styles.instruction}>{instruction}</Text>
        ))}
      </View>
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
  instructionsContainer: {
    marginTop: 10,
    width: '80%',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
