const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://cis350:cis350@cluster0.ivirc.mongodb.net/uniteconquer?retryWrites=true&w=majority';

// Connect to our db on the cloud
const connect = async () => {
  try {
    const tmp = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // Connected to db
    console.log(`Connected to database: ${tmp.databaseName}`);
    return tmp;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

beforeAll(async () => {
  db = await connect();
});

