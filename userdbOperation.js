const { MongoClient, ObjectId } = require('mongodb');
// Connect to the DB and return the connection object

const connect = async (url) => {
  try {
    const conn = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    console.log(`Connected to the database: ${conn.databaseName}`);
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error('could not connect to the db');
  }
};

const createUser = async (db, newUser) => {
  console.log('db: add user');
  console.log(newUser);
  try {
    await db.collection('userDB').updateOne(
      {
        _id: ObjectId(newUser.userId),
      },
      {
        $setOnInsert: {
          phone: newUser.phone,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          posts: newUser.posts,
          wishList: newUser.wishList,
          interests: newUser.interests,
          password: newUser.password,
          createdAt: newUser.createdAt,
          lastCheckNotification: newUser.lastCheckNotification,
        },
      },
      { upsert: true },
    );
  } catch (e) {
    throw new Error('fail to add a new user');
  }
};

// not needed
const getPassword = async (
  db,
  user,
) => {
  const { userId } = user;
  try {
    const result = await db.collection('userDB').findOne({ _id: ObjectId(userId) });
    return result.password;
  } catch (e) {
    throw new Error('fail to add new post');
  }
};

const loginUserWithPhone = async (
  db,
  user,
) => {
  const { phone, password } = user;
  console.log(phone, password);
  let result;
  try {
    result = await db.collection('userDB').findOne({ phone });
    console.log('user', result);
  } catch (e) {
    throw new Error('failed to login with phone');
  }

  if (password === result.password) {
    console.log('correct password');
    return result._id;
  }
  console.log('incorrect password');

  return false;
};

const loginUserWithEmail = async (
  db,
  user,
) => {
  const { email, password } = user;
  let result;
  try {
    result = await db.collection('userDB').findOne({ email });
  } catch (e) {
    throw new Error('failed to login with email');
  }

  console.log(result);

  if (password === result.password) {
    return result._id;
  }
  return false;
};

const modifyUser = async (
  db,
  user,
) => {
  const {
    userId,
    fieldToChange,
    newValue,
    oldPassword,
  } = user;
  try {
    if (fieldToChange === 'password') {
      const result = await db.collection('userDB').findOne({ _id: ObjectId(userId) })
      const pswd = String(result.password);
      if (pswd === oldPassword) {

        await db.collection('userDB').updateOne(
          {
            _id: ObjectId(userId),
          },
          {
            $set: {
              password: newValue
            },
          },
        );
      }
    }
    if (fieldToChange === 'email') {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(userId),
        },
        { $set: { email: newValue } },
      );
    }
    if (fieldToChange === 'phone') {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(userId),
        },
        { $set: { phone: newValue } },
      );
    }
    if (fieldToChange === 'posts') {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(userId),
        },
        { $push: { posts: newValue } },
      );
    }
  } catch (e) {
    throw new Error('fail to modify user');
  }
};

const getUserDetails = async (
  db,
  user,
) => {
  try {
    const result = await db.collection('userDB').findOne({ _id: ObjectId(user) });
    console.log(result, user,'from userdboperation get user details');
    return result;
  } catch (e) {
    throw new Error('fail to get user details');
  }
};

const getChats = async (
  db,
  user,
) => {
  const { userId } = user;
  try {
    return (await db.collection('userDB').findOne({ _id: ObjectId(userId) })).chats;
  } catch (e) {
    throw new Error('fail to get chats');
  }
};

module.exports = {
  connect,
  createUser,
  loginUserWithPhone,
  loginUserWithEmail,
  modifyUser,
  getUserDetails,
  getPassword,
  getChats,
};
