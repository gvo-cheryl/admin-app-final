import {
  JOIN_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  MEMBER_LIST,
  MEMBER_LIST_UPDATE,
  MENU_OPEN,
  PW_CHANGE,
} from "./action";

export const logout = () => ({ type: LOGOUT_USER });

const initialState = {
  loginSuccess: false,
  response: {},
  memberList: [],
  memberOne: {},
  menuOpen: true,
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case JOIN_USER:
      return {
        ...state,
        loginSuccess: false,
        response: action.payload,
      };
    case LOGIN_USER:
      if (action.payload.rCode === "FAIL")
        return { ...state, loginSuccess: false };
      return {
        ...state,
        loginSuccess: true,
        response: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loginSuccess: false,
        response: action.payload,
        menuOpen: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        loginSuccess: true,
        response: action.payload,
      };
    case MEMBER_LIST:
      return {
        ...state,
        loginSuccess: true,
        memberList: action.payload.rData.memberList,
      };
    case MEMBER_LIST_UPDATE:
      return { ...state, loginSuccess: true, response: action.payload };
    case MENU_OPEN:
      return { ...state, menuOpen: action.payload };
    case PW_CHANGE:
      return { ...state, response: action.payload };
    default:
      return state;
  }
}
