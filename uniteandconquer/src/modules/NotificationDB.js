/* Notification operations */
function createNotification(userIds, content, callback) {
  return callback(true, '507f1f7789076cd799439011', null);
}

function getNotificationsForUser(userId, callback) {
  return callback(true, [{
    _id: '123',
    content: 'Your group for [AA Batteries] has a new member!',
    createdAt: '2022-03-14T13:14:14.925Z',
  },
  {
    _id: '345',
    content: 'Your group for [AA Batteries] has reached its goal!',
    createdAt: '2022-03-15T14:53:17.926Z',
  }], null);
}
function deleteNotifications(userId, notifList, callback) {
  return callback(true, null);
}

function getNotificationsForUserInRange(userId, startIdx, endIdx, callback) {
  return getNotificationsForUser(userId, callback);
}

export {
  createNotification,
  getNotificationsForUserInRange,
  getNotificationsForUser,
  deleteNotifications,
};
