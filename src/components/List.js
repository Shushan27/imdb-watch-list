import { useEffect, useState } from 'react';
import Filter from './Filter';
import Movies from './Movies';
import useFetchData from '../hooks/useFetchData';

const INITIAL_QUERY = 's=2023&page=1';

const List = () => {
  const [url, setUrl] = useState();
  const { movies, isLoading, error } = useFetchData(url);
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState('');

  const onSearch = () => {
    setUrl(`s=${title}&page=1`);
    setCurrentPage(1);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setUrl(`s=${title}&page=${pageNumber}`);
  };

  useEffect(() => {
    setUrl(INITIAL_QUERY);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Filter
        isLoading={isLoading}
        title={title}
        setTitle={setTitle}
        onSearch={onSearch}
      />
      <Movies
        movies={movies?.Search || []}
        error={error}
        currentPage={currentPage}
        totalPages={movies?.totalResults || '0'}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default List;
