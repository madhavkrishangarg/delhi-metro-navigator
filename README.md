# Delhi Metro Navigator

Delhi Metro Navigator is a mobile application designed to provide efficient and user-friendly navigation through the Delhi Metro system. The app offers real-time, accurate directions, an interactive map interface, and optimized routing to enhance the commuting experience for both first-time users and frequent travelers.

## Features

- **Route Planning**
  - Input starting points and destinations using Google Places API autocomplete.
  - Find the nearest metro stations to the source and destination.
  - Utilize a heuristic-based (geodesic distance) A* algorithm to determine the optimal route, which is 20-30% faster than Dijkstra's algorithm.

- **Interactive Map Interface**
  - Display the planned route using Google Maps SDK.
  - Show metro stations, lines, and the user's current location.
  - Support map panning and zooming for better navigation.

- **Turn-by-Turn Navigation**
  - Provide step-by-step instructions for the entire journey.
  - Include information on which metro lines to take and where to change.
  - Update instructions in real-time based on the user's current location.

- **Real-Time Location Tracking**
  - Use device GPS to track the user's current location.
  - Update the map view to center on the user's location when requested.
  - Call the backend every 1000 milliseconds or on location change to update the route based on the user's current location.

- **Offline Data Processing**
  - Backend sends the calculated route, including route-ids (metro lines) and transit stations, to the frontend.
  - Frontend retrieves corresponding shape points and stops for the route and plots them on the map interface.
  - Optimize data retrieval using efficient data structures, improving performance by 680% and 36450% in respective operations.

- **User-Friendly Interface**
  - Clean and intuitive design for easy navigation.
  - Responsive layout adapting to different screen sizes.
  - Clear visual distinction between different metro lines using color coding.

- **Backend Integration**
  - Flask-based backend for handling routing requests.
  - Efficient data structures and algorithms for quick route calculations.
  - RESTful API for communication between frontend and backend.
  - Implements Cross-Origin Resource Sharing (CORS) for frontend-backend communication.
  - Backend caching for faster calculation of routes based on the shortest path.

- **Performance Optimizations**
  - Debounced API calls to reduce unnecessary backend requests.
  - Efficient state management in React Native for smooth UI updates.
  - Optimized rendering of map elements for better performance.

## Technologies Used

- **Frontend**: React Native, Google Maps SDK, Google Places API
- **Backend**: Python, Flask, Pandas
- **Data Processing**: Custom algorithms for route optimization and data structure efficiency

## Data Source

- Raw data obtained from [Delhi Government Transport Department](https://otd.delhi.gov.in/)
- Extensive preprocessing to extract and structure relevant transit system information

## Backend - https://github.com/madhavkrishangarg/delhi-metro-navigator-backend
