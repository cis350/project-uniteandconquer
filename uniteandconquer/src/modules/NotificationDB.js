// Notification operations

function createNotification(userIds, content, callback) {
  return callback(true, '507f1f7789076cd799439011', null);
}

function getNotificationsForUser(userId, callback) {
  return callback(true, [{
    content: 'Your group for [AA Batteries] has a new member!',
    createdAt: '2022-03-14T13:14:14.925Z',
  },
  {
    content: 'Your group for [AA Batteries] has reached its goal!',
    createdAt: '2022-03-15T14:53:17.926Z',
  }], null);
}

function getNotificationsForUserInRange(userId, startIdx, endIdx, callback) {
  return callback(true, [{
    content: 'Your group for [AA Batteries] has a new member!',
    createdAt: '2022-03-14T13:14:14.925Z',
  },
  {
    content: 'Your group for [AA Batteries] has reached its goal!',
    createdAt: '2022-03-15T14:53:17.926Z',
  }], null);
}

export {
  createNotification,
  getNotificationsForUser,
  getNotificationsForUserInRange,
};
