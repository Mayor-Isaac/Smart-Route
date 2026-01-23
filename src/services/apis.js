const API_BASE_URL = import.meta.env.VITE_SMART_ROUTE_API_BASE_URL;

export const getAnomalies = async () => {
  try {
    const url = `${API_BASE_URL}/anomalies`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.message || 'Failed to fetch anomalies';
      throw new Error(message);
    }
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createJourney = async (journeyData) => {
  console.log('Journey Data ===>', journeyData);
  try {
    const response = await fetch(`${API_BASE_URL}/journey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(journeyData),
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create journey');
    }

    return data;
  } catch (error) {
    console.error('Failed to create journey:', error);
    throw error;
  }
};

export const createAnomaly = async (anomalyData) => {
  console.log('Anomaly Data ===>', anomalyData);
  try {
    const response = await fetch(`${API_BASE_URL}/anomaly`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(anomalyData),
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create anomaly');
    }

    return data;
  } catch (error) {
    console.error('Failed to create anomaly:', error);
    throw error;
  }
};