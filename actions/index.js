import { setAuthHeader } from "./utils/setAuthHeader";
import { rejectPromise } from "./utils/rejectPromise";
import { axiosInstance } from "./utils/axiosInstance";

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
