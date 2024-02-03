import { groupConstants } from "../_constants";
import { groupServices } from "../_services";
import { alert } from "../_utilities";

export const groupActions = {
  getGroups,
  createGroup,
  acceptGroupRequest,
  rejectGroupRequest,
};

function getGroups(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.GET_GROUPS_REQUEST,
        data: null,
      })
    );
    groupServices.getGroups(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.GET_GROUPS_SUCCESS,
              data: response.data,
            })
          );
          if (response?.data?.length === 0) {
            alert.error(response.message);
          }
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.GET_GROUPS_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.GET_GROUPS_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function createGroup(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.CREATE_GROUP_REQUEST,
        data: null,
      })
    );
    groupServices.createGroup(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.CREATE_GROUP_SUCCESS,
              data: response,
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.CREATE_GROUP_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.CREATE_GROUP_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function acceptGroupRequest(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.ACCEPT_GROUP_REQUEST,
        data: null,
      })
    );
    groupServices.acceptGroupRequest(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.ACCEPT_GROUP_SUCCESS,
              data: response,
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.ACCEPT_GROUP_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.ACCEPT_GROUP_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function rejectGroupRequest(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.REJECT_GROUP_REQUEST_REQUEST,
        data: null,
      })
    );
    groupServices.rejectGroupRequest(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.REJECT_GROUP_REQUEST_SUCCESS,
              data: response.data,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.REJECT_GROUP_REQUEST_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.REJECT_GROUP_REQUEST_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function dispatchFunction(data) {
  return {
    type: data.type,
    data: data.data,
  };
}
