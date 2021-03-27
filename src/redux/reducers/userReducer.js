import {
    USER_LISTS,
    USER_LIST,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER 

} from '../actions/actionTypes'
import _ from 'lodash';


export default (state = {}, action) => {
    switch(action.type) {

        case CREATE_USER:
            return { ...state, [action.payload.id]: action.payload };

        case USER_LISTS:
        return { ...state, ..._.mapKeys(action.payload, 'id') };

        case USER_LIST:
        return { ...state, [action.payload.id]: action.payload };

        case EDIT_USER: 
            return { ...state,  [action.payload.id]: action.payload };

        case DELETE_USER:
            return _.omit(state, action.payload)

        default: 
            return state;
    }
}