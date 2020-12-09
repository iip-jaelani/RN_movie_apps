import {GET_ARTIST} from '../constants';

const initialData = {
  data: [],
  isLoading: false,
  message: '',
};

const musicReducers = (state = initialData, action) => {
  switch (action.type) {
    case `${GET_ARTIST}`:
      return {
        ...state,
        isLoading: true,
        message: '',
      };
    case `${GET_ARTIST}_SUCCESS`:
      return {
        ...state,
        data: [...state.data, action.payload.data],
        message: action.payload.message,
        isLoading: false,
      };
    case `${GET_ARTIST}_FAILED`:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default musicReducers;
