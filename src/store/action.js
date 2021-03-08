import { post, get } from "./axios";

export const JOIN_USER = "JOIN_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";

export const ASSET_LIST = "ASSET_LIST";
export const ASSET_ONE_UPDATE = "ASSET_ONE_UPDATE";
export const MEMBER_LIST = "MEMBER_LIST";
export const MEMBER_LIST_UPDATE = "MEMBER_LIST_UPDATE";
export const MENU_OPEN = "MENU_OPEN";

export async function joinUser(dataToSubmit) {
  const data = await post("post", "/join", dataToSubmit);
  return {
    type: JOIN_USER,
    payload: data,
  };
}

export async function loginUser(dataToSubmit) {
  const data = await post("post", "/login", dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function updateUser(dataToSubmit) {
  const data = post("post", "/infoupdate", dataToSubmit);
  return {
    type: UPDATE_USER,
    payload: data,
  };
}

export function getMemberList() {
  const data = get("get", "/admin/memberlist");
  return {
    type: MEMBER_LIST,
    payload: data,
  };
}

export function menuHandler(action) {
  return {
    type: MENU_OPEN,
    payload: action,
  };
}
