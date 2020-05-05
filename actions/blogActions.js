import { setAuthHeader } from "./utils/setAuthHeader";
import { rejectPromise } from "./utils/rejectPromise";
import { axiosInstance } from "./utils/axiosInstance";

export const createBlog = (blogData, lockId) => {
  return axiosInstance
    .post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
    .then((response) => response.data.blog)
    .catch((error) => rejectPromise(error));
};

export const getBlogById = (id) => {
  return axiosInstance
    .get(`/blogs/${id}`)
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

export const updateBlogAction = (blogData, id) => {
  return axiosInstance
    .patch(`/blogs/${id}`, blogData, setAuthHeader())
    .then((res) => res.data)
    .catch((e) => rejectPromise(e));
};

//-----WE NEED TO
// export const getUserBlogs = async (req) => {
//   return await axiosInstance
//     .get("/blogs/me", setAuthHeader(req))
//     .then((response) => response.data);
// };

export const getUserBlogs = async (req) => {
  return await axiosInstance
    .get("/blogs/me", setAuthHeader(req))
    .then((response) => response.data);
};
