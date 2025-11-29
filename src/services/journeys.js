export const journeys = [
  {
    id: 1,
    origin: {
      lat: 7.312,
      lng: 5.1355
    },
    destination: {
      lat: 7.2905,
      lng: 5.1356
    },
    distance: 3.8, // km
    duration: 12, // minutes
    startTime: "2025-11-25T08:30:00Z",
    endTime: "2025-11-25T08:42:00Z",
    status: "completed",
    routeType: "fastest",
    vehicleType: "car",
    averageSpeed: 19, // km/h
    maxSpeed: 45, // km/h
    anomaliesEncountered: [
      {
        type: "pothole",
        severity: "medium",
        location: "Obanla Road",
        timestamp: "2025-11-25T08:35:00Z"
      }
    ],
    weatherCondition: "sunny",
    trafficLevel: "light",
    carbonEmission: 0.12, // kg CO2
    rating: 4.5,
    notes: "Smooth journey with minimal traffic. One pothole encountered but easily navigable."
  },
  {
    origin: {
      lat: 7.3122,
      lng: 5.1358
    },
    destination: {
      lat: 7.2944,
      lng: 5.1894
    },
    distance: 8.2, // km
    duration: 28, // minutes
    startTime: "2025-11-24T14:15:00Z",
    endTime: "2025-11-24T14:43:00Z",
    status: "completed",
    routeType: "shortest",
    vehicleType: "motorcycle",
    averageSpeed: 18, // km/h
    maxSpeed: 55, // km/h
    anomaliesEncountered: [
      {
        type: "speed bump",
        severity: "low",
        location: "Ring Road",
        timestamp: "2025-11-24T14:22:00Z"
      },
      {
        type: "crack",
        severity: "high",
        location: "Sango Road",
        timestamp: "2025-11-24T14:35:00Z"
      }
    ],
    weatherCondition: "partly_cloudy",
    trafficLevel: "moderate",
    carbonEmission: 0.08, // kg CO2
    rating: 3.5,
    notes: "Heavy traffic around Sango area. Multiple road anomalies but manageable on motorcycle."
  },
  {
    id: 3,
    origin: {
      lat: 7.2773,
      lng: 5.2210
    },
    destination: {
      lat: 7.2628,
      lng: 5.2094
    },
    distance: 12.5, // km
    duration: 35, // minutes
    startTime: "2025-11-23T16:45:00Z",
    endTime: "2025-11-23T17:20:00Z",
    status: "completed",
    routeType: "scenic",
    vehicleType: "car",
    averageSpeed: 21, // km/h
    maxSpeed: 55, // km/h
    anomaliesEncountered: [
      {
        type: "construction",
        severity: "high",
        location: "Ilesha-Akure Expressway",
        timestamp: "2025-11-23T17:00:00Z"
      },
      {
        type: "flooding",
        severity: "critical",
        location: "Ondo Road",
        timestamp: "2025-11-23T17:10:00Z"
      }
    ],
    weatherCondition: "rainy",
    trafficLevel: "heavy",
    carbonEmission: 0.35, // kg CO2
    rating: 2.5,
    notes: "Rainy season challenges. Construction work and flooding caused delays."
  },
  {
    id: 4,
    origin: {
      lat: 7.3089,
      lng: 5.1401
    },
    destination: {
      lat: 7.2985,
      lng: 5.1298
    },
    distance: 5.2, // km
    duration: 15, // minutes
    startTime: "2025-11-22T06:00:00Z",
    endTime: "2025-11-22T06:15:00Z",
    status: "completed",
    routeType: "fastest",
    vehicleType: "taxi",
    averageSpeed: 35, // km/h
    maxSpeed: 50, // km/h
    anomaliesEncountered: [],
    weatherCondition: "clear",
    trafficLevel: "light",
    carbonEmission: 0.25, // kg CO2
    rating: 5.0,
    notes: "Perfect early morning drive! No traffic, excellent road conditions within Akure."
  },
  {
    id: 5,
    origin: {
      lat: 7.3001,
      lng: 5.1425
    },
    destination: {
      lat: 7.2644,
      lng: 5.2106
    },
    distance: 12.3, // km
    duration: 35, // minutes
    startTime: "2025-11-21T11:20:00Z",
    endTime: "2025-11-21T11:55:00Z",
    status: "interrupted",
    routeType: "shortest",
    vehicleType: "car",
    averageSpeed: 21, // km/h
    maxSpeed: 50, // km/h
    anomaliesEncountered: [
      {
        type: "accident",
        severity: "critical",
        location: "Ilesha-Akure Expressway",
        timestamp: "2025-11-21T11:35:00Z"
      },
      {
        type: "roadblock",
        severity: "high",
        location: "Hospital Junction",
        timestamp: "2025-11-21T11:50:00Z"
      }
    ],
    weatherCondition: "overcast",
    trafficLevel: "standstill",
    carbonEmission: 0.32, // kg CO2
    rating: 1.0,
    notes: "Emergency trip to hospital. Major accident caused massive delays. Police roadblock added more time."
  },
  {
    id: 6,
    origin: {
      lat: 7.3089,
      lng: 5.1401
    },
    destination: {
      lat: 7.2985,
      lng: 5.1298
    },
    distance: 2.1, // km
    duration: 8, // minutes
    startTime: "2025-11-20T13:45:00Z",
    endTime: "2025-11-20T13:53:00Z",
    status: "completed",
    routeType: "walking",
    vehicleType: "foot",
    averageSpeed: 16, // km/h (fast walk)
    maxSpeed: 16, // km/h
    anomaliesEncountered: [
      {
        type: "uneven surface",
        severity: "low",
        location: "Pedestrian walkway",
        timestamp: "2025-11-20T13:48:00Z"
      }
    ],
    weatherCondition: "sunny",
    trafficLevel: "none",
    carbonEmission: 0.00, // kg CO2
    rating: 4.8,
    notes: "Quick walk within FUTA campus. Great weather, minimal obstacles. Eco-friendly! 🌱"
  },
  {
    id: 7,
    origin: {
      lat: 7.2822,
      lng: 5.1919
    },
    destination: {
      lat: 7.3145,
      lng: 5.1375
    },
    distance: 8.7, // km
    duration: 25, // minutes
    startTime: "2025-11-19T09:30:00Z",
    endTime: "2025-11-19T09:55:00Z",
    status: "completed",
    routeType: "balanced",
    vehicleType: "bus",
    averageSpeed: 21, // km/h
    maxSpeed: 40, // km/h
    anomaliesEncountered: [
      {
        type: "dust",
        severity: "medium",
        location: "Oba Ile Road",
        timestamp: "2025-11-19T09:40:00Z"
      },
      {
        type: "speed bump",
        severity: "low",
        location: "Akure Main Market",
        timestamp: "2025-11-19T09:50:00Z"
      }
    ],
    weatherCondition: "dusty",
    trafficLevel: "moderate",
    carbonEmission: 0.18, // kg CO2
    rating: 3.8,
    notes: "Typical Akure market route. Harmattan dust but manageable. Bus service reliable."
  },
  {
    id: 8,
    origin: {
      lat: 7.2456,
      lng: 5.1998
    },
    destination: {
      lat: 7.3089,
      lng: 5.1401
    },
    distance: 9.4, // km
    duration: 28, // minutes
    startTime: "2025-11-18T07:15:00Z",
    endTime: "2025-11-18T07:43:00Z",
    status: "completed",
    routeType: "fastest",
    vehicleType: "car",
    averageSpeed: 20, // km/h
    maxSpeed: 60, // km/h
    anomaliesEncountered: [
      {
        type: "minor crack",
        severity: "low",
        location: "Oba Adesida Road",
        timestamp: "2025-11-18T07:25:00Z"
      },
      {
        type: "smooth road",
        severity: "good",
        location: "FUTA Road",
        timestamp: "2025-11-18T07:35:00Z"
      }
    ],
    weatherCondition: "clear",
    trafficLevel: "light",
    carbonEmission: 0.32, // kg CO2
    rating: 4.2,
    notes: "Morning commute to FUTA. Good road conditions, minimal traffic. FUTA Road well maintained."
  }
];

// Helper functions for journey data analysis
export const getJourneyStats = () => {
  const totalJourneys = journeys.length;
  const completedJourneys = journeys.filter(j => j.status === 'completed').length;
  const totalDistance = journeys.reduce((sum, j) => sum + j.distance, 0);
  const totalDuration = journeys.reduce((sum, j) => sum + j.duration, 0);
  const totalCost = journeys.reduce((sum, j) => sum + j.cost, 0);
  const totalEmissions = journeys.reduce((sum, j) => sum + j.carbonEmission, 0);
  const averageRating = journeys.reduce((sum, j) => sum + j.rating, 0) / totalJourneys;

  return {
    totalJourneys,
    completedJourneys,
    completionRate: ((completedJourneys / totalJourneys) * 100).toFixed(1),
    totalDistance: totalDistance.toFixed(1),
    totalDuration: Math.round(totalDuration),
    averageSpeed: (totalDistance / (totalDuration / 60)).toFixed(1),
    totalEmissions: totalEmissions.toFixed(2),
    averageRating: averageRating.toFixed(1)
  };
};

export const getJourneysByVehicleType = () => {
  const vehicleStats = {};
  journeys.forEach(journey => {
    if (!vehicleStats[journey.vehicleType]) {
      vehicleStats[journey.vehicleType] = {
        count: 0,
        totalDistance: 0,
        totalEmissions: 0
      };
    }
    vehicleStats[journey.vehicleType].count++;
    vehicleStats[journey.vehicleType].totalDistance += journey.distance;
    vehicleStats[journey.vehicleType].totalCost += journey.cost;
    vehicleStats[journey.vehicleType].totalEmissions += journey.carbonEmission;
  });
  return vehicleStats;
};

export const getRecentJourneys = (limit = 5) => {
  return journeys
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, limit);
};

export const getJourneysByStatus = (status) => {
  return journeys.filter(journey => journey.status === status);
};

export const getMostCommonAnomalies = () => {
  const anomalyCount = {};
  journeys.forEach(journey => {
    journey.anomaliesEncountered.forEach(anomaly => {
      anomalyCount[anomaly.type] = (anomalyCount[anomaly.type] || 0) + 1;
    });
  });
  
  return Object.entries(anomalyCount)
    .sort(([,a], [,b]) => b - a)
    .map(([type, count]) => ({ type, count }));
};