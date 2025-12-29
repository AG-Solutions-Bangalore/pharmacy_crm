export const LOGOUT = {
  logout: "/panel-logout",
};
export const FORGOTPASSWORD = {
  sendPasswordReset: "/panel-send-password",
};
export const LOGIN = {
  postLogin: "/panel-login",
};
export const PANEL_CHECK = {
  getPanelStatus: "/panel-check-status",
  getEnvStatus: "/panel-fetch-dotenv",
};
export const PROFILE = {
  getlist: "/panel-fetch-profile",
  chnagepassword: "/change-password",
  updateById: `/panel-update-profile`,
};
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

export const BUYER_LIST = {
  getlist: "/buyer",
  create: "/buyer",
  getById: (id) => `/buyer/${id}`,
  updateById: (id) => `/buyer/${id}`,
  getEnvStatus: "/panel-fetch-dotenv",
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
  active: "/activeCountrys",
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
export const MARKING_API = {
  getlist: "/marking",
  create: "/marking",
  getById: (id) => `/marking/${id}`,
  updateById: (id) => `/marking/${id}`,
  updateStatus: (id) => `/markings/${id}/status`,
};
export const ORDERTYPE_API = {
  getlist: "/orderType",
  create: "/orderType",
  getById: (id) => `/orderType/${id}`,
  updateById: (id) => `/orderType/${id}`,
  updateStatus: (id) => `/orderTypes/${id}/status`,
};
export const PAYMENTTERM_API = {
  getlist: "/paymentTerms",
  create: "/paymentTerms",
  getById: (id) => `/paymentTerms/${id}`,
  updateById: (id) => `/paymentTerms/${id}`,
  updateStatus: (id) => `/paymentTermss/${id}/status`,
};
export const PORT_API = {
  getlist: "/portofloading",
  create: "/portofloading",
  active: "activePortofLoadings",
  getById: (id) => `/portofloading/${id}`,
  updateById: (id) => `/portofloading/${id}`,
  updateStatus: (id) => `/portofloadings/${id}/status`,
};
export const PRERECEIPTS_API = {
  getlist: "/prereceipts",
  create: "/prereceipts",
  active: "activePrereceiptss",
  getById: (id) => `/prereceipts/${id}`,
  updateById: (id) => `/prereceipts/${id}`,
  updateStatus: (id) => `/prereceiptss/${id}/status`,
};
