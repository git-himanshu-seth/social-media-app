import { friendServices } from "../_services";
import { friendConstant } from "../_constants";
import { alert, commonFunctions } from "../_utilities";

export const friendActions = {
  getFriendsList,
  sendFrienReq,
  acceptReq,
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
          if (response.status === 200) {
            dispatch(
              dispatchFunction({
                type: friendConstant.ACCEPT_FRIRND_REQ_SUCCESS,
                data: response,
              })
            );
            alert.success(response.message);
          } else {
            dispatch(
              dispatchFunction({
                type: friendConstant.ACCEPT_FRIRND_REQ_FAILURE,
                data: response,
              })
            );
            alert.error(response.message);
          }
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

function dispatchFunction(data) {
  return {
    type: data.type,
    data: data.data,
  };
}
