const BASE_URL = "https://usedauction.shop";
const BASE_URL2 = "http://localhost:3000";

export const API = {
  MAIN: `${BASE_URL2}/main`,
  COOKIECHECK: `${BASE_URL}/AAA`,
  SIGNUP: `${BASE_URL}/api/member/signup`,
  IDCHECK: `${BASE_URL}/api/member/loginid`,
  EMAILCHECK: `${BASE_URL}/api/member/email`,
  EMAILSEND: `${BASE_URL}/api/email`,
  NICKNAMECHECK: `${BASE_URL}/api/member/name`,
  LOGIN: `${BASE_URL}/api/member/login`,
  ISLOGIN: `${BASE_URL}/api/member/is-login`,
  LOGOUT: `${BASE_URL}/api/member/logout`,
  SEARCH: `${BASE_URL}/api/products`,
  ORDERBY:`${BASE_URL}/api/products/order-by`,
  PRODUCT: `${BASE_URL}/api/products`,
  QUESTIONVIEW:`${BASE_URL}/api/questions`
};