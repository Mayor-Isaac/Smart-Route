const API_BASE_URL = import.meta.env.VITE_SMART_ROUTE_API_BASE_URL;
export const getAnomalies = async () => {
    try {
      const url = `${API_BASE_URL}/anomalies`;

      const response = await fetch(url, {
        method: 'GET',
        // headers: getAuthHeaders(),
        // body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = await parseErrorResponse(response);
        throw new Error(message);
      }
      return data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }

}

export const createJourney = async (journeyData) => {
  console.log('Journey Data ===>', journeyData);
  try {
    const response = await fetch(
      `${API_BASE_URL}/journey`,
      {
        method: 'POST',
        body: JSON.stringify(journeyData),
      }
    );
    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Failed to create journey:', error);
  }
};

export const createAnomaly = async ( anomalyData ) => {
  console.log('Anomaly Data ===>', anomalyData);
  try {
    const response = await fetch(`${API_BASE_URL}/anomaly`, {
      method: 'POST',
      body: JSON.stringify(anomalyData),
    });
    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Failed to create anomaly:', error);
  }
};