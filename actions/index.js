import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromReq } from "../helpers/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000,
});
const rejectPromise = (resError) => {
  let error = {};
  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");

  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` },
    };
  }
  return undefined;
};

export const getSecretData = async () => {
  return await axiosInstance
    .get("/secret", setAuthHeader(req))
    .then((res) => res.data);
};

export const getPortfolios = async () => {
  return await axiosInstance.get("/portfolios").then((res) => res.data);
};

//we do not need to authorize so no need to use req
export const getPortfolioById = async (id) => {
  return await axiosInstance
    .get(`/portfolios/${id}`)
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

//since we are on the client we do not need to get our token from the server.
export const createPortfolio = async (portfolioData) => {
  return await axiosInstance
    .post("/portfolios", portfolioData, setAuthHeader())
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

export const updatePortfolio = async (portfolioData) => {
  return await axiosInstance
    .patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

export const deletePortfolio = async (portfolioId) => {
  return await axiosInstance
    .delete(`/portfolios/${portfolioId}`, setAuthHeader())
    .then((response) => response.data);
};
