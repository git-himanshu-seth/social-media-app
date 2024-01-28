import { authConstants } from '../_constants';
import { authServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const authActions = {
    getPosts
};

function getPosts() {
    return dispatch => {
        dispatch(dispatchFunction({
            type: authConstants.GET_POSTS_REQUEST,
            data: null
        }));
        authServices.getPosts()
            .then(
                response => {
                    if (response.status) {
                        dispatch(dispatchFunction({
                            type: authConstants.GET_POSTS_SUCCESS,
                            data: response.data
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: authConstants.GET_POSTS_FAILURE,
                            data: response
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: authConstants.GET_POSTS_FAILURE,
                        data: error.message
                    }));
                    alert.error(error.message);
                }
            );
    };
}

// function logOut() {
//     commonFunctions.onLogout();
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: authConstants.USER_LOGOUT,
//             data: null
//         }));
//     };
// }

function dispatchFunction(data) {
    return {
        type: data.type,
        data: data.data
    };
}