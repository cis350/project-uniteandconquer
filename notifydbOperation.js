const { MongoClient, ObjectId } = require('mongodb');

const addNotif = async (
  db,
    userList,
  content,
) => {
  const notifList = [];
  const mydate = new Date();
  userList.forEach((user) =>
  { notifList.push({ userId: ObjectId(user), content: content, creatAt: mydate }) })
  try {
    await db.collection('notifDB').insertMany(notifList);
  } catch (e) {
    return ('fail to add new notif');
  }
};

const getNotifForUser = async (
  db,
    userId,
) => {
  const notifList = [];
  const mydate = new Date();
  userList.forEach((user) =>
  { notifList.push({ userId: ObjectId(user), content: content, creatAt: mydate }) })
  try {
    await db.collection('notifDB').insertMany(notifList);
  } catch (e) {
    return ('fail to add new notif');
  }
};

module.exports = {
  addNotif,

};
