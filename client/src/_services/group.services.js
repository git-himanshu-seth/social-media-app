import config from "../config";
import { commonFunctions } from "../_utilities";

export const groupServices = {
  getGroups,
  createGroup,
  addGroupMembers,
  acceptGroupRequest,
  rejectGroupRequest,
};

function getGroups(data) {
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
    `${config.apiUrl}/chat_group?userId=${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function createGroup(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(
    `${config.apiUrl}/chat_group`,
    requestOptions
  ).then((response) => response.json());
}

function addGroupMembers(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(
    `${config.apiUrl}/friend_request/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function acceptGroupRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(
    `${config.apiUrl}/friend_request/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function rejectGroupRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(
    `${config.apiUrl}/friend_request/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}