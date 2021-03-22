import axios from "axios";

export const post = async (method, url, data) => {
  return await axios({
    method,
    url: "http://192.168.14.239:9999" + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const get = async (method, url) => {
  return await axios({
    method,
    url: "http://192.168.14.239:9999" + url,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
