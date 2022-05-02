/* User-related operations */
import axios from 'axios';
const rootURL = 'http://localhost:8080';
async function createUser(
  countryCode,
  phoneNumber,
  email,
  password,
  firstName,
  lastName,
  posts,
  interests,
  createdAt,
  lastCheckNotification,
  callback,
) {
  const response = await axios.post(`${rootURL}/createUser`, {
    phone: { countryCode: Number(countryCode), phoneNumber: Number(phoneNumber) },
    email: `${email}`,
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    posts: posts,
    wishList: wishList,
    interests: interests,
    password: `${password}`,
    createdAt: `${createdAt}`,
    lastCheckNotification: `${lastCheckNotification}`,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function loginUserWithPhone(
  countryCode,
  phoneNumber,
  password,
  callback,
) {
  const response = await axios.post(`${rootURL}/loginUserWithPhone`, {
    phone: { countryCode: Number(countryCode), phoneNumber: Number(phoneNumber) },
    password: `${password}`,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function loginUserWithEmail(
  email,
  password,
  callback,
) {
  const response = await axios.post(`${rootURL}/loginUserWithEmail`, {
    email: `${email}`,
    password: `${password}`,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function modifyUser(id, fieldToChange, newValue, oldPassword, callback) {
  return callback(true, null);
}

function getPassword(
  id,
  callback,
) {
  const response = await axios.get(`${rootURL}/getPassword`, {
    userId: id,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function getUserDetails(
  id,
  callback,
) {
  const response = await axios.get(`${rootURL}/getUserDetails`, {
    userId: id,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function getChats(
  id,
  callback,
) {
  const response = await axios.get(`${rootURL}/getChats`, {
    userId: id,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

export {
  createUser,
  loginUserWithPhone,
  loginUserWithEmail,
  modifyUser,
  getUserDetails,
  getPassword,
  getChats,
};
