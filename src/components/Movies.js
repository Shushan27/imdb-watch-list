import { useEffect, useState } from 'react';
import { Card, Col, Pagination, Row, Typography } from 'antd';
import {
  CheckCircleOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import MyRate from './MyRate';

const watchedMovies = localStorage.getItem('watchedMovies') || '[]';
const wishListMoves = localStorage.getItem('wishListMoves') || '[]';
const myRates = localStorage.getItem('myRatesMovies') || '{}';

const Movies = ({
  movies,
  error = '',
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [watchedList, setWatchedList] = useState(JSON.parse(watchedMovies));
  const [wishList, setWishList] = useState(JSON.parse(wishListMoves));
  const [myRatesMovies, setMyRateMovies] = useState(JSON.parse(myRates));

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedList));
  }, [watchedList]);

  useEffect(() => {
    localStorage.setItem('wishListMoves', JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem('myRatesMovies', JSON.stringify(myRatesMovies));
  }, [myRatesMovies]);

  const updateWatchedMovie = (id) => {
    let watchedListCopy = [...watchedList];

    if (watchedListCopy.includes(id)) {
      watchedListCopy = watchedList.filter((item) => item !== id);
    } else {
      watchedListCopy.push(id);
    }
    setWatchedList(watchedListCopy);
  };

  const updateWishList = (id) => {
    let wishListCopy = [...wishList];

    if (wishListCopy.includes(id)) {
      wishListCopy = wishList.filter((item) => item !== id);
    } else {
      wishListCopy.push(id);
    }
    setWishList(wishListCopy);
  };

  const getActions = (id) => {
    const actions = [
      <CheckCircleOutlined
        key={id}
        style={{
          color: watchedList.includes(id) ? 'rgba(23,217,0)' : '#c0bbbb',
          fontSize: '22px',
          cursor: 'pointer',
        }}
        onClick={() => updateWatchedMovie(id)}
      />,
    ];

    if (wishList.includes(id)) {
      actions.push([
        <HeartFilled
          key="id"
          style={{ color: '#c41212', fontSize: '22px', cursor: 'pointer' }}
          onClick={() => updateWishList(id)}
        />,
      ]);
    } else {
      actions.push([
        <HeartOutlined
          key="id"
          style={{ fontSize: '22px', cursor: 'pointer' }}
          onClick={() => updateWishList(id)}
        />,
      ]);
    }

    return actions;
  };

  const updateRate = (rate, id) => {
    setMyRateMovies((prev) => ({
      ...prev,
      [id]: rate,
    }));
  };

  return (
    <Card style={{ width: '100%', marginTop: 10, backgroundColor: '#fff' }}>
      {!!error && <Typography.Text type="danger">{error}</Typography.Text>}
      <Row
        style={{
          backgroundColor: '#fff',
        }}
      >
        {movies?.length ? (
          <>
            {movies.map((movie) => (
              <Col key={movie.imdbID} style={{ cursor: 'pointer' }}>
                <Card
                  className="movie-item"
                  cover={
                    <img
                      className="movie-image"
                      style={{
                        width: '100%',
                        height: '370px',
                        objectFit: 'cover',
                      }}
                      alt={movie.Title}
                      src={movie.Poster}
                    />
                  }
                  actions={getActions(movie.imdbID)}
                >
                  <Card.Meta
                    title={movie.Title}
                    description={`Year ${movie.Year}`}
                  />
                  <MyRate
                    rate={myRatesMovies[movie.imdbID] || ''}
                    updateRate={(rate) => updateRate(rate, movie.imdbID)}
                  />
                </Card>
              </Col>
            ))}
          </>
        ) : !error ? (
          <Typography.Text type="secondary">No moves to show</Typography.Text>
        ) : null}
      </Row>
      {!!movies?.length && totalPages > 10 && (
        <Typography style={{ marginTop: 20 }}>
          <Pagination
            size="small"
            showSizeChanger={false}
            current={currentPage}
            total={totalPages}
            onChange={onPageChange}
          />
        </Typography>
      )}
    </Card>
  );
};

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
  error: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
};

export default Movies;
