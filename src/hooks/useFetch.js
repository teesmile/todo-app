import { useState, useEffect } from 'react';

const useFetch = (baseUrl, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      return responseData;
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // For initial data fetching
  const get = async () => {
    try {
      const queryParams = new URLSearchParams();
      
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

      const responseData = await fetchData(url);
      setData(responseData);
    } catch (err) {
      setError(err);
    }
  };

  // CRUD operations
  const create = async (todoData) => {
    try {
      const response = await fetchData(`${baseUrl}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
      });
      return response;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const update = async (id, updateData) => {
    try {
      const response = await fetchData(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      return response;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      const response = await fetchData(`${baseUrl}/${id}`, {
        method: 'DELETE'
      });
      return response;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  useEffect(() => {
    get();
  }, [baseUrl, JSON.stringify(params)]);

  return { 
    data, 
    loading, 
    error, 
    create, 
    update, 
    remove,
    refetch: get
  };
};

export default useFetch;