import { RECEIEVE_ALL_PHOTOS, RECEIVE_PHOTO } from '../actions/photo_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case RECEIEVE_ALL_PHOTOS:
            return action.photos;
        case RECEIVE_PHOTO:
            newState[action.photo.id] = action.photo;
            return newState;
        default:
            return state;
    }
};