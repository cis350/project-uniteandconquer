// User and notification operations

function createUser(phone, email, password, firstName, lastName, interests, callback) {
  return callback(true, 0, null);
}

function loginUserWithPhone(phone, password, callback) {
  return callback(true, 0, null);
}

function loginUserWithEmail(email, password, callback) {
  return callback(true, 0, null);
}

function modifyUser(id, fieldToChange, newValue, callback) {
  return callback(true, null);
}

function getUserDetails(id, callback) {
  return callback(true, {
    phone: { countryCode: '1', phoneNumber: '9783999395' },
    email: 'yuyingf@seas.upenn.edu',
    firstName: 'Yuying',
    lastName: 'Fan',
    interests: ['Food', 'Home'],
    wishList: [0, 1],
  }, null);
}

export {
  createUser,
  loginUserWithPhone,
  loginUserWithEmail,
  modifyUser,
  getUserDetails,
};
