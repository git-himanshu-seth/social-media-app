import { store } from '../_store';
export const commonFunctions = {
    getRequestOptions,
    validateEmail,
    validateNumeric,
    onLogout,
    getAccessToken,
}

function getRequestOptions(type, extraHeaders, body, bNoToken) {
    let authHeader = {};
    if (!bNoToken) {
        const currentState = store.getState();
        const userInfo = currentState.auth.user;
        const accessToken = userInfo ? userInfo.token : null;
        authHeader = {
            Authorization: `Bearer ${accessToken}`
        }
    }
    let requestOptions = {
        method: type,
        headers: {
            ...extraHeaders,
            ...authHeader
        }
    };
    if (body) {
        requestOptions['body'] = body;
    }
    return requestOptions;
}

function getAccessToken() {
    const currentState = store.getState();
    const userInfo = currentState.auth.user;
    const accessToken = userInfo ? userInfo.token : null;
    return accessToken;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateNumeric(number) {
    return /^\d+$/.test(number);
}

function onLogout() {
    let language = localStorage.getItem("language");
    localStorage.clear();
    if (!language) {
        language = "en";
    }
    localStorage.setItem("language", language);
}
