import { AUTH_SUCCESS, AUTH_FAIL } from "../actions/types";
const namespace = "http://localhost:3000";

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoadingAuthState: false,
        user: action.user,
        isSiteOwner:
          action.user && action.user[namespace + "/roles"] === "siteOwner",
      };
    case AUTH_FAIL:
      return { ...state, isAuth: false, isLoadingAuthState: false, user: null };
    default:
      return state;
  }
};
