import { useState, useEffect } from 'react';

const useFetch = (baseUrl, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        
        // Safely handle number parameters
        if (params.limit !== undefined && !isNaN(params.limit)) {
          queryParams.append('limit', Math.floor(params.limit));
        }
        if (params.skip !== undefined && !isNaN(params.skip)) {
          queryParams.append('skip', Math.floor(params.skip));
        }
        if (params.q) {
          queryParams.append('q', params.q);
        }

        let url = baseUrl;
        if ([...queryParams].length > 0) {
          url += `?${queryParams.toString()}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;