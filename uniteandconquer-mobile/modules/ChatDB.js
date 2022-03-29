/* Chat and messaging operations */
function createChat(postId, members, callback) {
  return callback(true, '507f1f7789076cd799435811', null);
}

function joinChat(userId, chatId, callback) {
  return callback(true, null);
}

function leaveChat(userId, chatId, callback) {
  return callback(true, null);
}

function getChatMessages(chatId, callback) {
  return callback(true, [{ author: 'Yuying Fan', content: 'Hello guys', createdAt: '2022-03-15T12:59:14.924Z' },
    { author: 'Dee Xie', content: 'Yo sup', createdAt: '2022-03-15T13:00:34.924Z' },
    { author: 'Yuxi Dai', content: 'Hi', createdAt: '2022-03-15T13:19:25.924Z' }], null);
}

function getChatMessagesInRange(chatId, startIdx, endIdx, callback) {
  return getChatMessages(chatId, callback);
}

function createMessage(userId, chatId, content, callback) {
  return callback(true, '507f1f7789076cd799439013', null);
}

export {
  createChat,
  joinChat,
  leaveChat,
  getChatMessagesInRange,
  createMessage,
};
