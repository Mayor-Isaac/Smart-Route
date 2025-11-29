export const journeys = [
  {
    id: 1,
    origin: {
      name: "FUTA North Gate",
      lat: 7.312,
      lng: 5.1355,
      address: "North Gate, Federal University of Technology Akure"
    },
    destination: {
      name: "Akure Mall",
      lat: 7.2905,
      lng: 5.1356,
      address: "Akure Mall, Oba Ile Road, Akure"
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
    cost: 85.50, // Naira
    carbonEmission: 0.12, // kg CO2
    rating: 4.5,
    notes: "Smooth journey with minimal traffic. One pothole encountered but easily navigable."
  },
  {
    id: 2,
    origin: {
      name: "University of Ibadan Main Gate",
      lat: 7.3775,
      lng: 3.9470,
      address: "Main Gate, University of Ibadan, Ibadan"
    },
    destination: {
      name: "Bodija Market",
      lat: 7.4040,
      lng: 3.9094,
      address: "Bodija Market, Ibadan, Oyo State"
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
    cost: 180.00, // Naira
    carbonEmission: 0.08, // kg CO2
    rating: 3.5,
    notes: "Heavy traffic around Sango area. Multiple road anomalies but manageable on motorcycle."
  },
  {
    id: 3,
    origin: {
      name: "Lagos International Airport",
      lat: 6.5773,
      lng: 3.3210,
      address: "Murtala Muhammed International Airport, Lagos"
    },
    destination: {
      name: "Victoria Island",
      lat: 6.4281,
      lng: 3.4219,
      address: "Victoria Island, Lagos State"
    },
    distance: 28.5, // km
    duration: 65, // minutes
    startTime: "2025-11-23T16:45:00Z",
    endTime: "2025-11-23T17:50:00Z",
    status: "completed",
    routeType: "scenic",
    vehicleType: "car",
    averageSpeed: 26, // km/h
    maxSpeed: 80, // km/h
    anomaliesEncountered: [
      {
        type: "construction",
        severity: "high",
        location: "Third Mainland Bridge",
        timestamp: "2025-11-23T17:15:00Z"
      },
      {
        type: "flooding",
        severity: "critical",
        location: "Oworonshoki",
        timestamp: "2025-11-23T17:25:00Z"
      }
    ],
    weatherCondition: "rainy",
    trafficLevel: "heavy",
    cost: 450.75, // Naira
    carbonEmission: 0.95, // kg CO2
    rating: 2.0,
    notes: "Terrible journey! Heavy rain caused flooding. Construction delays on bridge. Took forever."
  },
  {
    id: 4,
    origin: {
      name: "Abuja City Gate",
      lat: 9.0579,
      lng: 7.4951,
      address: "City Gate, Abuja FCT"
    },
    destination: {
      name: "Nnamdi Azikiwe International Airport",
      lat: 9.0067,
      lng: 7.2634,
      address: "Nnamdi Azikiwe International Airport, Abuja"
    },
    distance: 45.2, // km
    duration: 42, // minutes
    startTime: "2025-11-22T06:00:00Z",
    endTime: "2025-11-22T06:42:00Z",
    status: "completed",
    routeType: "fastest",
    vehicleType: "taxi",
    averageSpeed: 65, // km/h
    maxSpeed: 110, // km/h
    anomaliesEncountered: [],
    weatherCondition: "clear",
    trafficLevel: "light",
    cost: 2500.00, // Naira
    carbonEmission: 1.25, // kg CO2
    rating: 5.0,
    notes: "Perfect morning drive! No traffic, excellent road conditions. Airport express way is a dream."
  },
  {
    id: 5,
    origin: {
      name: "FUTA South Gate",
      lat: 7.3001,
      lng: 5.1425,
      address: "South Gate, Federal University of Technology Akure"
    },
    destination: {
      name: "Ondo State Specialist Hospital",
      lat: 7.2644,
      lng: 5.2106,
      address: "State Specialist Hospital, Akure, Ondo State"
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
    cost: 200.00, // Naira
    carbonEmission: 0.32, // kg CO2
    rating: 1.0,
    notes: "Emergency trip to hospital. Major accident caused massive delays. Police roadblock added more time."
  },
  {
    id: 6,
    origin: {
      name: "Computer Science Building, FUTA",
      lat: 7.3089,
      lng: 5.1401,
      address: "School of Computing, FUTA, Akure"
    },
    destination: {
      name: "FUTA Teaching Hospital",
      lat: 7.2985,
      lng: 5.1298,
      address: "Federal University of Technology Teaching Hospital, Akure"
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
    cost: 0.00, // Naira
    carbonEmission: 0.00, // kg CO2
    rating: 4.8,
    notes: "Quick walk to hospital for medical check-up. Great weather, minimal obstacles. Eco-friendly! 🌱"
  },
  {
    id: 7,
    origin: {
      name: "Kano Central Market",
      lat: 12.0022,
      lng: 8.5919,
      address: "Kurmi Market, Kano State"
    },
    destination: {
      name: "Mallam Aminu Kano International Airport",
      lat: 12.0476,
      lng: 8.5246,
      address: "Mallam Aminu Kano International Airport, Kano"
    },
    distance: 15.7, // km
    duration: 55, // minutes
    startTime: "2025-11-19T09:30:00Z",
    endTime: "2025-11-19T10:25:00Z",
    status: "completed",
    routeType: "balanced",
    vehicleType: "bus",
    averageSpeed: 17, // km/h
    maxSpeed: 45, // km/h
    anomaliesEncountered: [
      {
        type: "dust storm",
        severity: "medium",
        location: "Zaria Road",
        timestamp: "2025-11-19T09:45:00Z"
      },
      {
        type: "livestock crossing",
        severity: "low",
        location: "Airport Road",
        timestamp: "2025-11-19T10:10:00Z"
      }
    ],
    weatherCondition: "dusty",
    trafficLevel: "moderate",
    cost: 350.00, // Naira
    carbonEmission: 0.45, // kg CO2
    rating: 3.8,
    notes: "Typical Kano journey. Harmattan dust reduced visibility. Cattle delayed us briefly but driver handled well."
  },
  {
    id: 8,
    origin: {
      name: "Port Harcourt Refinery",
      lat: 4.8156,
      lng: 7.0498,
      address: "Port Harcourt Refinery, Rivers State"
    },
    destination: {
      name: "University of Port Harcourt",
      lat: 4.8975,
      lng: 6.9098,
      address: "University of Port Harcourt, Choba, Rivers State"
    },
    distance: 22.4, // km
    duration: 48, // minutes
    startTime: "2025-11-18T07:15:00Z",
    endTime: "2025-11-18T08:03:00Z",
    status: "completed",
    routeType: "fastest",
    vehicleType: "car",
    averageSpeed: 28, // km/h
    maxSpeed: 70, // km/h
    anomaliesEncountered: [
      {
        type: "oil spill",
        severity: "medium",
        location: "Refinery Junction",
        timestamp: "2025-11-18T07:22:00Z"
      },
      {
        type: "smooth road",
        severity: "good",
        location: "East-West Road",
        timestamp: "2025-11-18T07:35:00Z"
      }
    ],
    weatherCondition: "humid",
    trafficLevel: "light",
    cost: 380.00, // Naira
    carbonEmission: 0.78, // kg CO2
    rating: 4.2,
    notes: "Early morning commute. Minor oil spill near refinery but road cleared quickly. East-West Road in excellent condition."
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
    totalCost: totalCost.toFixed(2),
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
        totalCost: 0,
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