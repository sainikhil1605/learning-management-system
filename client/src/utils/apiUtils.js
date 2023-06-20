import axiosInstance from './axiosInstance';

const apiGetCall = async (url) => {
  try {
    return await axiosInstance.get(url);
  } catch (err) {
    console.log(err);
    return err;
  }
};
const apiPostCall = async (url, payload) => {
  return await axiosInstance.post(url, payload);
};
const apiDeleteCall = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const apiPatchCall = async (url, payload) => {
  try {
    const response = await axiosInstance.patch(url, payload);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export { apiGetCall, apiDeleteCall, apiPostCall, apiPatchCall };
