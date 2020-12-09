import {
  GET_TRENDING,
  GET_MOVIE_DETAIL,
  GET_MOVIE_VIDEO,
  GET_SIMILAR_MOVIE,
  GET_MOVIE_TOP_RATED,
  GET_MOVIE_NOW_PLAYING,
} from '../constants';

const initialData = {
  data: [],
  movie_data: [],
  movie_video: [],
  similar_movie: [],
  top_rated_movie: [],
  now_playing_movie: [],
  isLoading: false,
  isLoadingDetail: false,
  isLoadingMovie: false,
  isLoadingMovieSimilar: false,
  isLoadingMovieTopRated: false,
  isLoadingNowPlaying: false,
  message: '',
};

const movieReducers = (state = initialData, action) => {
  switch (action.type) {
    case `${GET_TRENDING}`:
      return {
        ...state,
        isLoading: true,
        message: '',
      };
    case `${GET_TRENDING}_SUCCESS`:
      return {
        ...state,
        data: [...state.data, action.payload.data],
        message: action.payload.message,
        isLoading: false,
      };
    case `${GET_TRENDING}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
      };
    case `${GET_MOVIE_DETAIL}`:
      return {
        ...state,
        isLoadingDetail: true,
        message: '',
      };
    case `${GET_MOVIE_DETAIL}_SUCCESS`:
      return {
        ...state,
        movie_data: action.payload.data,
        message: action.payload.message,
        isLoadingDetail: false,
      };
    case `${GET_MOVIE_DETAIL}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoadingDetail: false,
      };
    case `${GET_MOVIE_VIDEO}`:
      return {
        ...state,
        isLoadingMovie: true,
        message: '',
      };
    case `${GET_MOVIE_VIDEO}_SUCCESS`:
      return {
        ...state,
        movie_video: action.payload.data,
        message: action.payload.message,
        isLoadingMovie: false,
      };
    case `${GET_MOVIE_VIDEO}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoadingMovie: false,
      };
    case `${GET_SIMILAR_MOVIE}`:
      return {
        ...state,
        isLoadingMovieSimilar: true,
        message: '',
      };
    case `${GET_SIMILAR_MOVIE}_SUCCESS`:
      return {
        ...state,
        similar_movie: action.payload.data,
        message: action.payload.message,
        isLoadingMovieSimilar: false,
      };
    case `${GET_SIMILAR_MOVIE}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoadingMovieSimilar: false,
      };
    case `${GET_MOVIE_TOP_RATED}`:
      return {
        ...state,
        isLoadingMovieTopRated: true,
        message: '',
      };
    case `${GET_MOVIE_TOP_RATED}_SUCCESS`:
      return {
        ...state,
        top_rated_movie: action.payload.data,
        message: action.payload.message,
        isLoadingMovieTopRated: false,
      };
    case `${GET_MOVIE_TOP_RATED}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoadingMovieTopRated: false,
      };
    case `${GET_MOVIE_NOW_PLAYING}`:
      return {
        ...state,
        isLoadingNowPlaying: true,
        message: '',
      };
    case `${GET_MOVIE_NOW_PLAYING}_SUCCESS`:
      return {
        ...state,
        now_playing_movie: [
          ...state.now_playing_movie,
          ...action.payload.data.results,
        ],
        message: action.payload.message,
        isLoadingNowPlaying: false,
      };
    case `${GET_MOVIE_NOW_PLAYING}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoadingNowPlaying: false,
      };
    default:
      return state;
  }
};

export default movieReducers;
