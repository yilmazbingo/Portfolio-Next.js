export const rejectPromise = (resError) => {
  let error = {};
  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};
