const { MongoClient, ObjectId } = require('mongodb');
// Connect to the DB and return the connection object

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

const createUser = (db, newUser) => {
  bcrypt.hash(newUser.password, saltRounds, async function(err, hash) {
    if (err) {
      throw new Error('Failed to create a user');
    } else {
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
              password: hash,
              createdAt: newUser.createdAt,
              lastCheckNotification: newUser.lastCheckNotification,
              lock: []
            },
          },
          { upsert: true },
        );
      } catch (e) {
        throw new Error('fail to add a new user');
      }
    }
  });
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
      bcrypt.hash(newPassword, saltRounds, async function(err, hash) {
        if (err) {
          return false;
        } else {
          await db.collection('userDB').updateOne(
            {
              _id: ObjectId(result1._id),
            },
            {
              $set: {
                password: hash
              },
            },
          );
        }
      });
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

const loginUserWithPhone = async (db, user) => {
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
  const now = new Date();
  const previous = now - (1000 * 60 * 60);
  const sortLock = result.lock.sort((a, b) => a.date - b.date)
  //in one hour range and length>=3,lock return false
  if (sortLock.length >= 3 && sortLock[0] >= previous) {
    return false;
  }

  const match = await bcrypt.compare(password, result.password);
  if (match) {
    return result._id;
  } else {
    // in one hour time range but number of try not reach 3
    if (sortLock.length === 0 || sortLock[0] >= previous) {
      await db.collection('userDB').updateOne({ email }, { $push: { lock: now } });
    //out of one hour time range, reset lock
    } else if (sortLock[0] < previous) {
      await db.collection('userDB').updateOne({ email },{$set: { lock: [now] }});
    }
    return false;
  }
};

const loginUserWithEmail = async (db, user) => {
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
  const now = new Date();
  const previous = now - (1000 * 60 * 60);
  const sortLock = result.lock.sort((a, b) => a.date - b.date)
  //in one hour range and length>=3,lock return false
  if (sortLock.length >= 3 && sortLock[0] >= previous) {
    return false;
  }

  const match = await bcrypt.compare(password, result.password);
  if (match) {
    return result._id;
  } else {
    // in one hour time range but number of try not reach 3
    if (sortLock.length === 0 || sortLock[0] >= previous) {
      await db.collection('userDB').updateOne({ email }, { $push: { lock: now } });
    //out of one hour time range, reset lock
    } else if (sortLock[0] < previous) {
      await db.collection('userDB').updateOne({ email },{$set: { lock: [now] }});
    }
    return false;
  }
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
      const match = await bcrypt.compare(oldPassword, pswd);
      if (match) {
        const hash = await bcrypt.hash(newValue, saltRounds);
        if (hash) {
          await db.collection('userDB').updateOne(
            {
              _id: ObjectId(userId),
            },
            {
              $set: {
                password: hash
              },
            },
          );
          return true;
        } else {
          return false;
        }
      } else {
        return false;
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
