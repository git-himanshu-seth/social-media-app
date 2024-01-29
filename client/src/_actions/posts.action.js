import { postConstants } from "../_constants";
import { postServices } from "../_services";
import { alert } from "../_utilities";

export const postActions = {
  getPosts,
  createPost,
  updatePost,
};

function getPosts(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: postConstants.GET_POSTS_REQUEST,
        data: null,
      })
    );
    postServices.getPosts(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: postConstants.GET_POSTS_SUCCESS,
              data: response.data,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: postConstants.GET_POSTS_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: postConstants.GET_POSTS_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function createPost(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: postConstants.CREATE_POST_REQUEST,
        data: null,
      })
    );
    postServices.createPost(data).then(
      (response) => {
        if (response.email && response?.uid) {
          dispatch(
            dispatchFunction({
              type: postConstants.CREATE_POST_SUCCESS,
              data: response,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: postConstants.CREATE_POST_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: postConstants.CREATE_POST_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function updatePost(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: postConstants.UPDATE_POST_REQUEST,
        data: null,
      })
    );
    postServices.updatePost(data).then(
      (response) => {
        console.log("response", response);
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: postConstants.UPDATE_POST_SUCCESS,
              data: response,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: postConstants.UPDATE_POST_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: postConstants.UPDATE_POST_FAILURE,
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
