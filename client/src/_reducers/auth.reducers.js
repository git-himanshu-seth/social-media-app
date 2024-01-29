import { authConstants, status } from "../_constants";

export function auth(state = {}, action) {
  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        user_login_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user_login_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.USER_LOGIN_FAILURE:
      return {
        ...state,
        user_login_status: status.FAILURE,
        user: null,
      };
    case authConstants.GET_POSTS_REQUEST:
      return {
        ...state,
        get_post_status: status.IN_PROGRESS,
        posts: action.data,
      };
    case authConstants.GET_POSTS_SUCCESS:
      return {
        ...state,
        get_post_status: status.SUCCESS,
        posts: action.data,
      };
    case authConstants.GET_POSTS_FAILURE:
      return {
        ...state,
        get_post_status: status.FAILURE,
        posts: null,
      };

    case authConstants.CREATE_USER_REQUEST:
      return {
        ...state,
        register_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.CREATE_USER_SUCCESS:
      return {
        ...state,
        register_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.CREATE_USER_FAILURE:
      return {
        ...state,
        register_status: status.FAILURE,
        user: null,
      };

    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        logout_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        logout_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        logout_status: status.FAILURE,
        user: null,
      };

    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        login_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        login_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        login_status: status.FAILURE,
        user: null,
      };
    default:
      return state;
  }
}
