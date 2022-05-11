/* Notification operations */
import axios from 'axios';

const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

async function createNotification(userIds, content, callback) {
  const response = await axios.post(`${rootURL}/addNotification`, {
    userIds,
    content: `${content}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

async function getNotificationsForUser(userId, callback) {
  const response = await axios.get(`${rootURL}/getNotificationForUser/${userId}`, {
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}
async function deleteNotifications(userId, callback) {
  const response = await axios.delete(`${rootURL}/deletNotifForUser/${userId}`, {
  });
  const result = response.data;
  return callback(result.success, result.error);
}

export {
  createNotification,
  getNotificationsForUser,
  deleteNotifications,
};
