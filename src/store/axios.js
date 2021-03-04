import axios from "axios";

export const post = async (method, url, data) => {
  return await axios({
    method,
    url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const get = async (method, url) => {
  return await axios({
    method,
    url,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
