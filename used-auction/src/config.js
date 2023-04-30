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
  LOGOUT: `${BASE_URL2}/logout`,
  SEARCH: `${BASE_URL}/api/products`,
  USERINFO: `${BASE_URL}/api/mypage`,
  PRODUCT: `${BASE_URL}/api/products`,
  PRODUCTMANAGMENT: `${BASE_URL}/api/mypage/products`,
  SALEHISTORY: `${BASE_URL}/api/mypage/sales-history`,
  BUYHISTORY: `${BASE_URL}/api/mypage/buy-history`,
  AUCTIONHISTORY: `${BASE_URL}/api/mypage/auction-history`,
  LOGOUT: `${BASE_URL}/api/member/logout`,
  SEARCH: `${BASE_URL}/api/products`,
  ORDERBY:`${BASE_URL}/api/products/order-by`,
  PRODUCT: `${BASE_URL}/api/products`,
  QUESTIONVIEW:`${BASE_URL}/api/questions`,
  CHATROOMLIST: `${BASE_URL}/api/chat-room`,
  CHATLIST: `${BASE_URL}/api/chat-message/chats`,
  REISSUE:`${BASE_URL}/api/member/reissue`,
  QUESTION:`${BASE_URL}/api/questions`,
  QUESTIONDELETE:`${BASE_URL}/api/questions`,
  AUCTION:`${BASE_URL}/api/auctions`,
  SSECONNECTIONOFPRODUCT :`${BASE_URL}/api/sse/bid-connect`
};
