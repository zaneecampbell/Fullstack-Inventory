import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import inventory from './inventory';

export default combineReducers({ auth, inventory, alert });
