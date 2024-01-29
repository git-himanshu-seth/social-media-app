import { authConstants } from "../_constants";
import { authServices } from "../_services";
import { alert, commonFunctions } from "../_utilities";

export const authActions = {
  createUser,
  logout,
  getUsers,
  login,
};

function createUser(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.CREATE_USER_REQUEST,
        data: null,
      })
    );
    authServices.createUser(data).then(
      (response) => {
        console.log("response", response, data);

        if (response.email && response?.uid) {
          authServices
            .createUserDB({
              name: data?.firstName + " " + data?.lastName,
              email: data?.email,
              googleId: `${response?.uid}`,
            })
            .then((res) => {
              console.log(res.data);
              if (res) {
                dispatch(
                  dispatchFunction({
                    type: authConstants.CREATE_USER_SUCCESS,
                    data: { ...response, ...res.data },
                  })
                );
              }
            });

          console.log("response", response.uid);
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.CREATE_USER_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.CREATE_USER_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function login(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.LOGIN_REQUEST,
        data: null,
      })
    );
    authServices.logIn(data).then(
      (response) => {
        console.log("response", response, data);

        if (response) {
          console.log("response", response);
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGIN_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.LOGIN_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getUsers() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.GET_USERS_REQUEST,
        data: null,
      })
    );
    authServices.getUsers().then(
      (response) => {
        console.log("response", response);
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: authConstants.GET_USERS_SUCCESS,
              data: response,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.GET_USERS_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.GET_USERS_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function logout() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.LOGOUT_REQUEST,
        data: null,
      })
    );
    authServices.logOut().then(
      (response) => {
        console.log("response", response);
        if (response) {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGOUT_SUCCESS,
              data: response,
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGOUT_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.LOGOUT_FAILURE,
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
