import axios from 'axios';
import { setAlert } from './alert';

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

// Create or add to inventory
export const createInventory = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = formData;

    // const res = await axios.post('/api/inventory', body, config);
    await axios.post('/api/inventory', body, config);

    dispatch(getCurrentInventory());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove item from inventory
export const deleteItem = index => async dispatch => {
  try {
    // const res = await axios.delete(`/api/inventory/${index}`);
    await axios.delete(`/api/inventory/${index}`);

    dispatch(getCurrentInventory());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update current inventory amounts
export const inventoryUpdate = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = formData;

    console.log(body);

    // const res = await axios.patch('/api/inventory', body, config);
    await axios.patch('/api/inventory', body, config);

    dispatch(setAlert('Inventory Updated!'));
    dispatch(getCurrentInventory());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
