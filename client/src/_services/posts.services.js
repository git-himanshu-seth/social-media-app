import config from "../config";
import { commonFunctions } from "../_utilities";

export const postServices = {
  getPosts,
  createPost,
  updatePost,
};

function getPosts(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null,
    true
  );
  return fetch(`${config.apiUrl}posts/${data.id}`, requestOptions).then((response) =>
    response.json()
  );
}

function createPost(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(`${config.apiUrl}/`, requestOptions).then((response) =>
    response.json()
  );
}

function updatePost(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null,
    true
  );
  return fetch(`${config.apiUrl}/`, requestOptions).then((response) =>
    response.json()
  );
}
