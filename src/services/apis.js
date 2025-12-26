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