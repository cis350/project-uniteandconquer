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

const forgetPassword = async (
  db,
  phone,
  email,
  newPassword,
) => {
  try {
    const result1 = await db.collection('userDB').findOne({ phone });
    const result2 = await db.collection('userDB').findOne({ email });
    if (String(result1._id) === String(result2._id)) {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(result1._id),
        },
        {
          $set: {
            password: newPassword
          },
        },
      );
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

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
  let result;
  try {
    result = await db.collection('userDB').findOne({ phone });
  } catch (e) {
    throw new Error('failed to login with phone');
  }

  if (result === null) {
    return false;
  }

  if (password === result.password) {
    return result._id;
  }
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

  if (result === null) {
    return false;
  }

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
        return true;
      }
    }
    if (fieldToChange === 'email') {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(userId),
        },
        { $set: { email: newValue } },
      );
      return true;
    }
    if (fieldToChange === 'phone') {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(userId),
        },
        { $set: { phone: newValue } },
      );
      return true;
    }
    if (fieldToChange === 'posts') {
      await db.collection('userDB').updateOne(
        {
          _id: ObjectId(userId),
        },
        { $push: { posts: newValue } },
      );
      return true;
    }
    return false;
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
    return result;
  } catch (e) {
    throw new Error('fail to get user details');
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
  forgetPassword,
};
