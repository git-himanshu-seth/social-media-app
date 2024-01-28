import config from "../config";
import { commonFunctions } from "../_utilities";

export const authServices = {
  getPosts,
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
  return fetch(
    `${config.apiUrl}/friend_request/65b631826d68ee5e66817cd7`,
    requestOptions
  ).then((response) => response.json());
}
