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
    default:
      return state;
  }
}
