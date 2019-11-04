import React from 'react';

import User from './User.js';

import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
    const users = useSelector(state => state.usersReducer.users);
    const usersPending = useSelector(state => state.usersReducer.pending);
    const dispatch = useDispatch();

    return (
        <div>
            <User />
        </div>
    );
};

export default Users;