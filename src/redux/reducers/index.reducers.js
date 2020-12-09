import {combineReducers} from 'redux';
import movieReducers from './movie.reducers';
import musicReducers from './music.reducers';

export default combineReducers({
  music: musicReducers,
  movie: movieReducers,
});
