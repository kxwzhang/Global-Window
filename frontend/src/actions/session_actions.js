import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
import { closeModal } from './modal_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

const receiveUserLogOut = () => ({
  type: RECEIVE_USER_LOGOUT,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const signup = user => dispatch => {
    return APIUtil.signup(user)
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        })
        .then(() => dispatch(receiveUserSignIn()))
        .then(() => dispatch(closeModal()))
        .catch(err => dispatch(receiveErrors(err.response.data)))
};

export const login = (user) => (dispatch) => (
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .then(() => dispatch(closeModal()))
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    })
);

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(receiveUserLogOut());
};
