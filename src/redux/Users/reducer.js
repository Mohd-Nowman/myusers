import { ADD_USER, UPDATE_USER, DELETE_USER } from "./constants";

const initialState = {
    isLoading: false,
    users: [],
    error: '',
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            };
        case UPDATE_USER:
            const index = state.users.findIndex(obj => obj.id === action.payload.id);
            const _users = state.users;
            _users[index] = action.payload;
            return {
                ...state,
                users: _users,
            };
        case DELETE_USER:
            console.log('action.payload: ', action.payload);
            const updatedUsers = state.users.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                users: updatedUsers,
            };

        default: return state;
    }
}