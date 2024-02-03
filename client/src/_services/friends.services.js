import config from "../config";
import { commonFunctions } from "../_utilities";

export const friendServices = {
  getFriendsList,
  sendFrienReq,
  acceptReq,
};

function getFriendsList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null,
    true
  );
  return fetch(`${config.apiUrl}/friends/${data.id}`, requestOptions).then(
    (response) => response.json()
  );
}

function sendFrienReq(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );
  return fetch(`${config.apiUrl}/send-friend-request`, requestOptions).then(
    (response) => response.json()
  );
}

function acceptReq(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "PUT",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );
  return fetch(`${config.apiUrl}/handle-friend-request`, requestOptions).then(
    (response) => response.json()
  );
}
