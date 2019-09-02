import {
  GET_INVENTORY,
  INVENTORY_ERROR,
  CLEAR_INVENTORY,
  UPDATE_INVENTORY
} from '../actions/types';

const initialState = {
  inventory: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INVENTORY:
    case UPDATE_INVENTORY:
      return {
        ...state,
        inventory: payload,
        loading: false
      };
    case INVENTORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_INVENTORY:
      return {
        ...state,
        inventory: null,
        loading: true
      };
    default:
      return state;
  }
}
