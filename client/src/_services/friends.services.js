import config from "../config";
import { commonFunctions } from "../_utilities";

export const friendServices = {
  getFriendsList,
  getReqList,
  sendFrienReq,
  acceptReq,
  rejectReq,
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
  return fetch(
    `${config.apiUrl}/friend_request/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function getReqList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // Assuming commonFunctions.getRequestOptions is correctly defined
  const requestOptions = commonFunctions.getRequestOptions(
    "get",
    extraHeaders,
    true
  );

  return fetch(`${config.apiUrl}/get-friend-requests/`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the successful response data
      return data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled at the higher level
    });
}

function sendFrienReq(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // Assuming commonFunctions.getRequestOptions is correctly defined
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );

  return fetch(`${config.apiUrl}/send-friend-request`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the successful response data
      return data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled at the higher level
    });
}

function acceptReq(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // Assuming commonFunctions.getRequestOptions is correctly defined
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );

  return fetch(`${config.apiUrl}/handle-friend-request`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the successful response data
      return data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled at the higher level
    });
}

function rejectReq(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // Assuming commonFunctions.getRequestOptions is correctly defined
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );

  return fetch(`${config.apiUrl}/signup`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the successful response data
      return data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled at the higher level
    });
}
