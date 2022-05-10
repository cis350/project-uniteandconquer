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
  try {
    const result = await db.collection('notifDB').find({ userId: ObjectId(userId) }).toArray();
    return result;
  } catch (e) {
    return ('fail to get notif for user');
  }
};

const deletNotifForUser = async (
  db,
    userId,
) => {
  try {
    await db.collection('notifDB').deleteMany({ userId: ObjectId(userId) });
  } catch (e) {
    return ('fail to delete notif for user');
  }
};

module.exports = {
  addNotif,
  getNotifForUser,
  deletNotifForUser,
};
