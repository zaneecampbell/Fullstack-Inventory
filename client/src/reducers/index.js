import { combineReducers } from 'redux';
import auth from './auth';
import inventory from './inventory';

export default combineReducers({ auth, inventory });
