import Cookies from "js-cookie";
import { getCookieFromReq } from "../../helpers/utils";

export const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");

  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` },
    };
  }
  return undefined;
};
