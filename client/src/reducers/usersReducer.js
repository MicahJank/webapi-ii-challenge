export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';


const initialState = {
    users: [],
    pending: false,
    error: ''
};

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS_PENDING:
            return {
                ...state,
                pending: true
            };
            break;

        case GET_USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                error: '',
                users: action.payload
            };
            break;

        case GET_USERS_FAIL:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
            break;
        
        default:
            return state;
            break;
    };
};