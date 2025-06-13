
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    //Initializing States
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This helper function fetches the data.
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // If something goes wrong, we throw an error.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todoData = await response.json();
        setData(todoData); // We save the data
        console.log(todoData)
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err); 
      } finally {
        setLoading(false); 
      }
    }

    fetchData();
  }, [url]); // Whenever the URL changes, it fetches again

  return { data, loading, error };
};

export default useFetch;
