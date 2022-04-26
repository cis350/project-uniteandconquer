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
         },
      },
      { upsert: true },
    );
  } catch (e) {
    throw new Error('fail to add a new user');
  }
};

const loginUserWithPhone = async (
  db,
  countryCode,
  phoneNumber,
  password,
) => {
  let result;
  try {
    result = await db.collection('userDB').findOne({phone: {countryCode, phoneNumber}});
  } catch (e) {
    throw new Error('failed to login with phone');
  }

  if (password == getPassword(db, ObjectId(result.userId))) {
    return true;
  }
  return false;
}
const loginUserWithEmail = async (
  db,
  emailAddress,
  password,
) => {
  let result;
  try {
    result = await db.collection('userDB').findOne({email: emailAddress});
  } catch (e) {
    throw new Error('failed to login with email');
  }

  if (password == getPassword(db, ObjectId(result.userId))) {
    return true;
  }
  return false;
}

const modifyUser = async (
  db,
  userId,
  fieldToChange,
  newValue,
  oldPassword,
) => {
  try {
    const field = fieldToChange;
    await db.collection('userDB').updateOne(
      {
        _id: ObjectId(userId),
      },
      { $set: { field: newValue } },
    );
  } catch (e) {
    throw new Error('fail to modify user');
  }
};

const getPassword = async (
  db,
  id,
) => {
  try {
    const result = await db.collection('userDB').findOne({ _id: ObjectId(userId) });
    return result.password;
  } catch (e) {
    throw new Error('fail to get password');
  }
}

const getUserDetails = async (
  db,
  userId,
) => {
  try {
    const result = await db.collection('userDB').findOne({ _id: ObjectId(userId) });
    const phone = result.phone;
    const email = result.email;
    const firstName = result.firstName;
    const lastName = result.lastName;
    const interests = result.interests;
    const posts = result.posts;
    const wishList = result.wishList;
    return { phone, email, firstName, lastName, interests, posts, wishList };
  } catch (e) {
    throw new Error('fail to get user details');
  }
}

const getChats = async () => {

}

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
