import React, { useEffect } from 'react';

import User from './User.js';
import { GET_USERS_PENDING, GET_USERS_FAIL, GET_USERS_SUCCESS } from '../reducers/usersReducer.js';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Users = () => {
    const users = useSelector(state => state.usersReducer.users);
    const usersPending = useSelector(state => state.usersReducer.pending);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_USERS_PENDING });
        axios.get('http://localhost:4000/api/posts')
            .then(res => {
                dispatch({
                    type: GET_USERS_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_USERS_FAIL,
                    payload: err
                });
            });
    }, []);

    if (usersPending) {
        return (
            <div>
                Loading the users...
            </div>
        );
    } else {
        return (
            <div>
                { users.map(user => {
                    return <User key={user.id} user={user} />
                })}
            </div>
        );
    };
    
};

export default Users;