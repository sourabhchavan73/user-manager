import users from '../../apis/users';
import history from '../../history'
import { 
    USER_LISTS,
    USER_LIST,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER  } from './actionTypes'

// action to create new user
export const createUser = formValues => async dispatch => {
   const response = await users.post('/users', formValues);

   dispatch({
       type: CREATE_USER,
       payload: response.data
   });
};

//action for fetching the all the users
export const fetchUsers = () => async dispatch => {
    const response = await users.get('/users');
    dispatch({
        type: USER_LISTS,
        payload: response.data
    });
}

//action to fetch only single user 
export const  fetchUser = (id) => async dispatch => {
    const response = await users.get(`./users/${id}`)
    dispatch({
        type: USER_LIST,
        payload: response.data
    });
};

//action to edit the single selected user 
export const editUser = (id, formValues) => async dispatch => {
    const response = await users.put(`./users/${id}`, formValues);

    dispatch({
        type: EDIT_USER,
        payload: response.data
    });

    history.push('/')
};

// action to delete the single selected user
export const deleteUser = (id) => async dispatch => {
     await users.delete(`./users/${id}`);

     dispatch({
         type: DELETE_USER,
         payload: id 
     });
     history.push('/')
}