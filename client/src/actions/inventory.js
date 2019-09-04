import axios from 'axios';
// import { setAlert } from './alert';

import { GET_INVENTORY, INVENTORY_ERROR } from './types';

// Get current users inventory
export const getCurrentInventory = () => async dispatch => {
  try {
    const res = await axios.get('/api/inventory');

    dispatch({
      type: GET_INVENTORY,
      payload: res.data
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update inventory
export const createInventory = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = formData;

    const res = await axios.post('/api/inventory', body, config);

    dispatch(getCurrentInventory());

    // dispatch(setAlert(edit ? 'Inventory Updated' : 'Inventory Created', 'success'));
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   console.log(errors);
    // }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
