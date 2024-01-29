import { authConstants, status } from "../_constants";

export function friend(state = {}, action) {
  switch (action.type) {
    case authConstants.GET_FRIENDS_REQUEST:
      return {
        ...state,
        get_List_status: status.IN_PROGRESS,
        friends: action.data,
      };
    case authConstants.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        get_List_status: status.SUCCESS,
        friends: action.data,
      };
    case authConstants.GET_FRIENDS_FAILURE:
      return {
        ...state,
        get_List_status: status.FAILURE,
        friends: null,
      };
    case authConstants.GET_FRIENDS_REQ_LIST_REQUEST:
      return {
        ...state,
        get_req_List_status: status.IN_PROGRESS,
        friendsReq: action.data,
      };
    case authConstants.GET_FRIENDS_REQ_LIST_SUCCESS:
      return {
        ...state,
        get_req_List_status: status.SUCCESS,
        friendsReq: action.data,
      };
    case authConstants.GET_FRIENDS_REQ_LIST_FAILURE:
      return {
        ...state,
        get_req_List_status: status.FAILURE,
        friendsReq: null,
      };
    case authConstants.SEND_FRIEND_REQ_REQUEST:
      return {
        ...state,
        send_req_status: status.IN_PROGRESS,
        req: action.data,
      };
    case authConstants.SEND_FRIEND_REQ_SUCCESS:
      return {
        ...state,
        send_req_status: status.SUCCESS,
        req: action.data,
      };
    case authConstants.SEND_FRIEND_REQ_FAILURE:
      return {
        ...state,
        send_req_status: status.FAILURE,
        req: null,
      };

    case authConstants.ACCEPT_FRIRND_REQ_REQUEST:
      return {
        ...state,
        accept_req_status: status.IN_PROGRESS,
        req: action.data,
      };
    case authConstants.ACCEPT_FRIRND_REQ_SUCCESS:
      return {
        ...state,
        accept_req_status: status.SUCCESS,
        req: action.data,
      };
    case authConstants.ACCEPT_FRIRND_REQ_FAILURE:
      return {
        ...state,
        accept_req_status: status.FAILURE,
        req: null,
      };

    case authConstants.REJECT_FRIRND_REQ_REQUEST:
      return {
        ...state,
        reject_req_status: status.IN_PROGRESS,
        req: action.data,
      };
    case authConstants.REJECT_FRIRND_REQ_SUCCESS:
      return {
        ...state,
        reject_req_status: status.SUCCESS,
        req: action.data,
      };
    case authConstants.REJECT_FRIRND_REQ_FAILURE:
      return {
        ...state,
        reject_req_status: status.FAILURE,
        req: null,
      };
    default:
      return state;
  }
}
