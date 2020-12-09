import {client_movie} from '../../config/client';
const {
  GET_TRENDING,
  GET_MOVIE_DETAIL,
  GET_MOVIE_VIDEO,
  GET_SIMILAR_MOVIE,
  GET_MOVIE_TOP_RATED,
  GET_MOVIE_NOW_PLAYING,
} = require('../constants');
import {API_KEY_THE_MOVIE_DB} from '@env';

exports.getMovieTrending = () => (dispatch) => {
  dispatch({
    type: GET_TRENDING,
  });
  client_movie
    .get(`/trending/movie/day?api_key=${API_KEY_THE_MOVIE_DB}`)
    .then((response) => {
      dispatch({
        type: `${GET_TRENDING}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get trending',
        },
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_TRENDING}_FILLED`,
        payload: {
          message: 'failed to get trending',
        },
      });
    });
};

exports.getMovieDetail = (id) => (dispatch) => {
  dispatch({
    type: GET_MOVIE_DETAIL,
  });
  client_movie
    .get(`/movie/${id}?api_key=${API_KEY_THE_MOVIE_DB}&language=en-US`)
    .then((response) => {
      dispatch({
        type: `${GET_MOVIE_DETAIL}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get trending',
        },
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: `${GET_MOVIE_DETAIL}_FILLED`,
        payload: {
          message: 'failed to get trending',
        },
      });
    });
};

exports.getMovieVideos = (id) => (dispatch) => {
  dispatch({
    type: GET_MOVIE_VIDEO,
  });
  client_movie
    .get(`/movie/${id}/videos?api_key=${API_KEY_THE_MOVIE_DB}&language=en-US`)
    .then((response) => {
      dispatch({
        type: `${GET_MOVIE_VIDEO}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get trending',
        },
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: `${GET_MOVIE_VIDEO}_FILLED`,
        payload: {
          message: 'failed to get trending',
        },
      });
    });
};

exports.getMovieSimilar = (id) => (dispatch) => {
  dispatch({
    type: GET_SIMILAR_MOVIE,
  });
  client_movie
    .get(
      `/movie/${id}/similar?api_key=${API_KEY_THE_MOVIE_DB}&language=en-US&page=1`,
    )
    .then((response) => {
      dispatch({
        type: `${GET_SIMILAR_MOVIE}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get trending',
        },
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: `${GET_SIMILAR_MOVIE}_FILLED`,
        payload: {
          message: 'failed to get trending',
        },
      });
    });
};

exports.getMovieTopRated = () => (dispatch) => {
  dispatch({
    type: GET_MOVIE_TOP_RATED,
  });
  client_movie
    .get(
      `movie/top_rated?api_key=${API_KEY_THE_MOVIE_DB}&language=en-US&page=1`,
    )
    .then((response) => {
      dispatch({
        type: `${GET_MOVIE_TOP_RATED}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get trending',
        },
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: `${GET_MOVIE_TOP_RATED}_FILLED`,
        payload: {
          message: 'failed to get trending',
        },
      });
    });
};

exports.getMovieNowPlaying = (page) => (dispatch) => {
  dispatch({
    type: GET_MOVIE_NOW_PLAYING,
  });
  client_movie
    .get(
      `movie/now_playing?api_key=${API_KEY_THE_MOVIE_DB}&language=en-US&page=${page}`,
    )
    .then((response) => {
      dispatch({
        type: `${GET_MOVIE_NOW_PLAYING}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get trending',
        },
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: `${GET_MOVIE_NOW_PLAYING}_FILLED`,
        payload: {
          message: 'failed to get trending',
        },
      });
    });
};
