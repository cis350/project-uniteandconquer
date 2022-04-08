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

/** when user click a specified group, get all message of it from db */

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

/** get user's joined groups when first get into chat page */
function getChatGroup(userID, callback) {
  return callback(
    true,
    [{
      id: '5087901e810c109679e860ea',
      groupName: 'chat1',
    },
    {
      id: '5087901e810c109679e860eb',
      groupName: 'chat2',
    }],
    null,
  );
}
/** get unread message of a group which user currently look at.
 * change message status in this method
 */
function getChatMessagesAfterTime(groupId, timeStamp, callback) {
  return callback(true, [{ author: 'Yuying Fan', content: 'new message', createdAt: '2022-03-15T12:59:14.924Z' },
    { author: 'Dee Xie', content: 'new message', createdAt: '2022-03-15T13:00:34.924Z' }], null);
}
// /** get all groups which has unread message.
//  * note that this method will not change read status: message status is still unread */
// function getUnreadChatGroup(userID, callback) {
//   return callback(
//     true,
//     [{
//       id: '5087901e810c109679e860ea',
//       groupName: 'chat1',

//     },
//     {
//       id: '5087901e810c109679e860eb',
//       groupName: 'chat2',

//     }],
//     null,
//   );
// }

export {
  createChat,
  joinChat,
  leaveChat,
  getChatMessages,
  getChatMessagesInRange,
  createMessage,
  getChatGroup,
  getChatMessagesAfterTime,
};
