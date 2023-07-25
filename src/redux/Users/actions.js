import {
    ADD_USER,
    DELETE_USER,
    GET_USERS,
    UPDATE_USER,
} from "./constants";

export function getUsers() {
    return {
        type: GET_USERS,
    }
}

export function addUser(payload) {
    return {
        type: ADD_USER,
        payload: payload,
    }
}
export function updateUser(payload) {
    return {
        type: UPDATE_USER,
        payload: payload,
    }
}
export function deleteUser(payload) {
    return {
        type: DELETE_USER,
        payload: payload,
    }
}