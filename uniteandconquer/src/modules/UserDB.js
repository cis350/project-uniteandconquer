/* User-related operations */
function createUser(
  countryCode,
  phoneNumber,
  email,
  password,
  firstName,
  lastName,
  interests,
  callback,
) {
  return callback(true, '507f1f77bcf86cd799439011', null);
}

function loginUserWithPhone(countryCode, phoneNumber, password, callback) {
  return callback(true, '507f1f77bcf86cd799439011', null);
}

function loginUserWithEmail(email, password, callback) {
  return callback(true, '507f1f77bcf86cd799439011', null);
}

function modifyUser(id, fieldToChange, newValue, oldPassword, callback) {
  return callback(true, null);
}

function getPassword(id, callback) {
  return callback(true, null);
}

function getUserDetails(id, callback) {
  return callback(true, {
    phone: { countryCode: '1', phoneNumber: '9783999395' },
    email: 'yuyingf@seas.upenn.edu',
    firstName: 'Yuying',
    lastName: 'Fan',
    interests: ['Food', 'Home'],
    posts: [{
      id: '5087901e810c19729de860ea', itemName: 'AA Batteries', itemNumTarget: 20, itemNumCurrent: 5, pricePerItem: 0.46, ownerName: 'Yuying Fan', status: 0, tags: ['Home'],
    }],
    wishList: [{
      id: '507f191e810c19729de860ea', itemName: 'Trash Can', itemNumTarget: 5, itemCurrent: 3, pricePerItem: 2.0, ownerName: 'Yuxi Dai', status: 0, tags: ['Home'],
    },
    {
      id: '507f191e810c19729dccba45', itemName: 'Laundry Bags', itemNumTarget: 2, itemCurrent: 3, pricePerItem: 14.99, ownerName: 'Roy Bae', status: 1, tags: ['Home'],
    }],
  }, null);
}

function getChats(id, callback) {
  return callback(
    true,
    [{
      id: '5087901e810c109679e860ea',
      groupName: 'chat1',
      hasUpdates: true,
    },
    {
      id: '5087901e810c109679e860eb',
      groupName: 'chat2',
      hasUpdates: true,
    }],
    null,
  );
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
