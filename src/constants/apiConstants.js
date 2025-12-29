export const USERTYPE = {
  getlist: "/panel-fetch-usertype",
  getById: (id) => `/panel-fetch-usertype-by-id/${id}`,
  updateById: (id) => `/panel-update-usertype/${id}`,
};
export const USERMANAGEMENT = {
  pageControl: "/panel-fetch-usercontrol-new",
  buttonControl: "/panel-fetch-usercontrol",
};
export const TEAM_API = {
  list: "/panel-fetch-team-list",
  create: "/panel-create-usercontrol-new",
  createbutton: "/panel-create-usercontrol",
  getById: (id) => `/panel-fetch-usercontrol/${id}`,
  updateButtonById: (id) => `/panel-update-usercontrol/${id}`,
  updatePageById: (id) => `/panel-update-usercontrol-new/${id}`,
  updateStatus: (id) => `/panel-update-team-status/${id}`,
};
export const LOGIN = {
  postLogin: "/panel-login",
};
export const PANEL_CHECK = {
  getPanelStatus: "/panel-check-status",
  getEnvStatus: "/panel-fetch-dotenv",
};
export const BUYER_LIST = {
  getlist: "/buyer",
  create: "/buyer",
  getById: (id) => `/buyer/${id}`,
  updateById: (id) => `/buyer/${id}`,
  getEnvStatus: "/panel-fetch-dotenv",
};
export const PORT = {
  getlist: "/activePort",
};
export const COUNTRY = {
  getlist: "/activeCountrys",
};
export const BAG_API = {
  getlist: "/bagType",
  create: "/bagType",
  getById: (id) => `/bagType/${id}`,
  updateById: (id) => `/bagType/${id}`,
  updateStatus: (id) => `/bagTypes/${id}/status`,
};
export const BANK_API = {
  getlist: "/bank",
  create: "/bank",
  getById: (id) => `/bank/${id}`,
  updateById: (id) => `/bank/${id}`,
  updateStatus: (id) => `/banks/${id}/status`,
};
export const CONTAINERSIZE_API = {
  getlist: "/containerSize",
  create: "/containerSize",
  getById: (id) => `/containerSize/${id}`,
  updateById: (id) => `/containerSize/${id}`,
  updateStatus: (id) => `/containerSizes/${id}/status`,
};
export const COUNTRY_API = {
  getlist: "/country",
  create: "/country",
  getById: (id) => `/country/${id}`,
  updateById: (id) => `/country/${id}`,
  updateStatus: (id) => `/countrys/${id}/status`,
};
export const GRCODE_API = {
  getlist: "/grcode",
  create: "/grcode",
  getById: (id) => `/grcode/${id}`,
  updateById: (id) => `/grcode/${id}`,
  updateStatus: (id) => `/grcodes/${id}/status`,
};
