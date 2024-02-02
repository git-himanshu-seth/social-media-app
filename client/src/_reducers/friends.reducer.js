import { friendConstant, status } from "../_constants";

export function friend(state = {}, action) {
  switch (action.type) {
    case friendConstant.GET_FRIENDS_REQUEST:
      return {
        ...state,
        get_List_status: status.IN_PROGRESS,
        friends: action.data,
      };
    case friendConstant.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        get_List_status: status.SUCCESS,
        friends: action.data,
      };
    case friendConstant.GET_FRIENDS_FAILURE:
      return {
        ...state,
        get_List_status: status.FAILURE,
        friends: null,
      };
    case friendConstant.GET_FRIENDS_REQ_LIST_REQUEST:
      return {
        ...state,
        get_req_List_status: status.IN_PROGRESS,
        friendsReq: action.data,
      };
    case friendConstant.GET_FRIENDS_REQ_LIST_SUCCESS:
      return {
        ...state,
        get_req_List_status: status.SUCCESS,
        friendsReq: action.data,
      };
    case friendConstant.GET_FRIENDS_REQ_LIST_FAILURE:
      return {
        ...state,
        get_req_List_status: status.FAILURE,
        friendsReq: null,
      };
    case friendConstant.SEND_FRIEND_REQ_REQUEST:
      return {
        ...state,
        send_req_status: status.IN_PROGRESS,
        req: action.data,
      };
    case friendConstant.SEND_FRIEND_REQ_SUCCESS:
      return {
        ...state,
        send_req_status: status.SUCCESS,
        req: action.data,
      };
    case friendConstant.SEND_FRIEND_REQ_FAILURE:
      return {
        ...state,
        send_req_status: status.FAILURE,
        req: null,
      };

    case friendConstant.ACCEPT_FRIRND_REQ_REQUEST:
      return {
        ...state,
        accept_req_status: status.IN_PROGRESS,
        acceptRejRes: action.data,
      };
    case friendConstant.ACCEPT_FRIRND_REQ_SUCCESS:
      return {
        ...state,
        accept_req_status: status.SUCCESS,
        acceptRejRes: action.data,
      };
    case friendConstant.ACCEPT_FRIRND_REQ_FAILURE:
      return {
        ...state,
        accept_req_status: status.FAILURE,
        acceptRejRes: null,
      };

    case friendConstant.REJECT_FRIRND_REQ_REQUEST:
      return {
        ...state,
        reject_req_status: status.IN_PROGRESS,
        req: action.data,
      };
    case friendConstant.REJECT_FRIRND_REQ_SUCCESS:
      return {
        ...state,
        reject_req_status: status.SUCCESS,
        req: action.data,
      };
    case friendConstant.REJECT_FRIRND_REQ_FAILURE:
      return {
        ...state,
        reject_req_status: status.FAILURE,
        req: null,
      };
    default:
      return state;
  }
}
