// export const host = "http://localhost:9070";
export const host = process.env.REACT_APP_API_HOST;
export const loginRoute = `${host}/api/auth/login`;
export const getAllUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/sendMessage`;
export const getAllMessagesRoute = `${host}/api/messages/getAllMessages`;
// export const getSearchContactRoute = `${host}/api/auth/getSearchContact`;
