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
  return fetch(`${config.apiUrl}/`, requestOptions).then((response) =>
    response.json()
  );
}
