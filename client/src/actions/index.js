//axios library used to make ajax requests
import axios from 'axios';
import { FETCH_USER } from './types';

//action creator making an async request "network request to express server"
export const fetchUser = () => async dispatch  => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};