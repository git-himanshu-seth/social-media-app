import { groupConstants, status } from "../_constants";

export function auth(state = {}, action) {
  switch (action.type) {
    case groupConstants.GET_GROUPS_REQUEST:
      return {
        ...state,
        get_group_status: status.IN_PROGRESS,
        groupList: action.data,
      };
    case groupConstants.GET_GROUPS_SUCCESS:
      return {
        ...state,
        get_group_status: status.SUCCESS,
        groupList: action.data,
      };
    case groupConstants.GET_GROUPS_FAILURE:
      return {
        ...state,
        get_group_status: status.FAILURE,
        groupList: null,
      };
    case groupConstants.CREATE_GROUP_REQUEST:
      return {
        ...state,
        create_group_status: status.IN_PROGRESS,
        createGroup: action.data,
      };
    case groupConstants.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        create_group_status: status.SUCCESS,
        createGroup: action.data,
      };
    case groupConstants.CREATE_GROUP_FAILURE:
      return {
        ...state,
        create_group_status: status.FAILURE,
        createGroup: null,
      };
    case groupConstants.ADD_GROUP_MEMBER_REQUEST:
      return {
        ...state,
        add_member_status: status.IN_PROGRESS,
        addMember: action.data,
      };
    case groupConstants.ADD_GROUP_MEMBER_SUCCESS:
      return {
        ...state,
        add_member_status: status.SUCCESS,
        addMember: action.data,
      };
    case groupConstants.ADD_GROUP_MEMBER_FAILURE:
      return {
        ...state,
        add_member_status: status.FAILURE,
        addMember: null,
      };
    case groupConstants.ACCEPT_GROUP_REQUEST:
      return {
        ...state,
        accept_Group_status: status.IN_PROGRESS,
        acceptGroup: action.data,
      };
    case groupConstants.ACCEPT_GROUP_SUCCESS:
      return {
        ...state,
        accept_Group_status: status.SUCCESS,
        acceptGroup: action.data,
      };
    case groupConstants.ACCEPT_GROUP_FAILURE:
      return {
        ...state,
        accept_Group_status: status.FAILURE,
        acceptGroup: null,
      };
    case groupConstants.REJECT_GROUP_REQUEST:
      return {
        ...state,
        reject_group_status: status.IN_PROGRESS,
        rejectRes: action.data,
      };
    case groupConstants.REJECT_GROUP_SUCCESS:
      return {
        ...state,
        reject_group_status: status.SUCCESS,
        rejectRes: action.data,
      };
    case groupConstants.REJECT_GROUP_FAILURE:
      return {
        ...state,
        reject_group_status: status.FAILURE,
        rejectRes: action.data,
      };
    default:
      return state;
  }
}
