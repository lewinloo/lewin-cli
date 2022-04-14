// 通过 axios 处理请求
const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

async function getRepoList() {
  return axios.get(`https://api.github.com/users/lewinloo/repos`);
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/lewinloo/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList,
};
