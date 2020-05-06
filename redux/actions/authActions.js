import { AUTH_SUCCESS, AUTH_FAIL } from "./types";

export const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user,
  };
};

export const authFail = () => {
  return {
    type: AUTH_FAIL,
  };
};
