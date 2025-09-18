import { useState, useEffect } from 'react';
import type { ApiTodosResponse } from '@/types/todo';

interface UseFetchParams {
  limit?: number;
  skip?: number;
  q?: string;
}

interface UseFetchReturn {
  data: ApiTodosResponse | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = (
  baseUrl: string, 
  params: UseFetchParams = {}, 
  shouldFetch: boolean = true
): UseFetchReturn => {
  const [data, setData] = useState<ApiTodosResponse | null>(null);
  const [loading, setLoading] = useState(shouldFetch);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const queryParams = new URLSearchParams();
        
        // Safely handle number parameters
        if (params.limit !== undefined && !isNaN(params.limit)) {
          queryParams.append('limit', Math.floor(params.limit).toString());
        }
        if (params.skip !== undefined && !isNaN(params.skip)) {
          queryParams.append('skip', Math.floor(params.skip).toString());
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
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, params.limit, params.skip, params.q, shouldFetch]);

  return { data, loading, error };
};

export default useFetch;