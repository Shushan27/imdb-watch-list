import { useEffect, useState } from 'react';

const API_URL = `${process.env.REACT_APP_OMDB_API_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const useFetchData = (url) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    try {
      setIsLoading(true);
      setError('');
      fetch(`${API_URL}&${url}`)
        .then((r) => r.json())
        .then((result) => {
          if (result.Error) {
            setError(result.Error);
            setMovies([]);
          } else {
            setMovies(result);
          }
        });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return {
    movies,
    isLoading,
    error,
    fetchData,
  };
};

export default useFetchData;
