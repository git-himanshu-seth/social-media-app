import { friendServices } from "../_services";
import { friendConstant } from "../_constants";
import { alert, commonFunctions } from "../_utilities";

export const friendActions = {
  getFriendsList,
  getReqList,
  sendFrienReq,
  acceptReq,
  rejectReq,
};

function getFriendsList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.GET_FRIENDS_REQUEST,
        data: null,
      })
    );
    friendServices.getFriendsList(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_FRIENDS_SUCCESS,
              data: response.data,
            })
          );
          if (response.data.length === 0) {
            alert.error(response.message);
          }
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_FRIENDS_FAILURE,
              data: null,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.GET_FRIENDS_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getReqList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.GET_FRIENDS_REQ_LIST_REQUEST,
        data: null,
      })
    );
    friendServices.getReqList(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_FRIENDS_REQ_LIST_SUCCESS,
              data: response.data,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_FRIENDS_REQ_LIST_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.GET_FRIENDS_REQ_LIST_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function sendFrienReq(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.SEND_FRIEND_REQ_REQUEST,
        data: null,
      })
    );
    friendServices.sendFrienReq(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: friendConstant.SEND_FRIEND_REQ_SUCCESS,
              data: response,
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.SEND_FRIEND_REQ_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.SEND_FRIEND_REQ_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function acceptReq(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.ACCEPT_FRIRND_REQ_REQUEST,
        data: null,
      })
    );
    friendServices.acceptReq(data).then(
      (response) => {
        if (response) {
          dispatch(
            dispatchFunction({
              type: friendConstant.ACCEPT_FRIRND_REQ_SUCCESS,
              data: response,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.ACCEPT_FRIRND_REQ_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.ACCEPT_FRIRND_REQ_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function rejectReq(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.REJECT_FRIRND_REQ_REQUEST,
        data: null,
      })
    );
    friendServices.rejectReq(data).then(
      (response) => {
        if (response) {
          dispatch(
            dispatchFunction({
              type: friendConstant.REJECT_FRIRND_REQ_SUCCESS,
              data: response,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.REJECT_FRIRND_REQ_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.REJECT_FRIRND_REQ_FAILURE,
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
