//creating auth reducer responsible for whether the user is logged in or not
import  { FETCH_USER } from '../actions/types';

//assigning state to null indicates nothing is known as of now
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}