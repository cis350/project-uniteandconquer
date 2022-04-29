const { MongoClient } = require('mongodb');
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

const addUser = async (db, newPlayer) => {
  console.log('db: add user');
  console.log(newPlayer);
  try {
    await db.collection('userDB').updateOne(
      {
        name: newPlayer.name,
      },
      {
        $setOnInsert: { name: newPlayer.name, score: 0 },
      },
      { upsert: true },
    );
  } catch (e) {
    throw new Error('fail to add a new user');
  }
};

module.exports = {
  connect, addUser,
};
