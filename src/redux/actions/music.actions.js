import {client} from '../../config/client';
const {GET_ARTIST} = require('../constants');

exports.getArtist = (id) => (dispatch) => {
  dispatch({
    type: GET_ARTIST,
  });
  client
    .get(`artist/${id}`)
    .then((response) => {
      dispatch({
        type: `${GET_ARTIST}_SUCCESS`,
        payload: {
          data: response.data,
          message: 'success get artist',
        },
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_ARTIST}_FILLED`,
        payload: {
          message: 'failed to get artist',
        },
      });
    });
};
