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



const transactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
};

const addPost = async (
  db,
  post,
) => {
  try {
    const result = await db.collection('postDB').insertOne(post);
    console.log(`Created player with id: ${result.insertedId}`);
    return result;
  } catch (e) {
    throw new Error('fail to add new post');
  }
};

const addComment = async (
  db,
  comment,
) => {
  try {
    await db.collection('postDB').updateOne(
      {
        _id: ObjectId(comment.postId),
      },
      {
        $push: { comments: { authorId: comment.authorId, content: comment.content } },
      },

    );
  } catch (e) {
    throw new Error('fail to add new comment');
  }
};

const getPost = async (
  db,
  postId,
) => {
  try {
    const result = await db.collection('postDB').findOne({ _id: ObjectId(postId) });
    return result;
  } catch (e) {
    throw new Error('fail to add new post');
  }
};

const getSortedPostBySearch = async (
  db,
  startIdx,
  endIdx,
  keywords,
  tags,

) => {
  try {
    const start = parseInt(startIdx, 10);
    const end = parseInt(endIdx, 10);
    let result;
    if (keywords === '' && tags.length === 0) {
      result = await db.collection('postDB').find({}).sort({ createdAt: -1 })
        .skip(start)
        .limit(end)
        .toArray();
    } else if (keywords === '' && tags.length !== 0) {
      result = await db.collection('postDB').find({ tags: { $in: tags } }).sort({ createdAt: -1 }).skip(start)
        .limit(end)
        .toArray();
    } else if (keywords !== '' && tags.length === 0) {
      result = await db.collection('postDB').find({ itemName: { $regex: keywords, $options: 'i' } }).sort({ createdAt: -1 }).skip(start)
        .limit(end)
        .toArray();
    } else {
      result = await db.collection('postDB').find({
        $and: [
          { tags: { $in: tags } },
          { itemName: { $regex: keywords, $options: 'i' } },
        ],
      }).sort({ createdAt: -1 }).skip(start)
        .limit(end)
        .toArray();
    }

    return result;
  } catch (e) {
    throw new Error('fail to add new post');
  }
};

const joinGroup = async (
  db,
  userInfo,
) => {
  try {
    await db.collection('postDB').updateOne(
      {
        _id: ObjectId(userInfo.postId),
      },
      {
        $push: { group: { userId: userInfo.userId, quantity: userInfo.quantity } },
        $inc: { itemNumCurrent: userInfo.quantity },
      },

    );
  } catch (e) {
    throw new Error('fail to add new comment');
  }
};

const leaveGroup = async (
  sessiondb,
  userInfo,
) => {
  const session = sessiondb.startSession();
  try {
    await session.withTransaction(async () => {
      const coll1 = sessiondb.db('uniteconquer').collection('postDB');
      
      // Important:: You must pass the session to the operations
      const memberList = await coll1.findOne({ _id: ObjectId(userInfo.postId) }, { session });
      console.log(memberList);
      
      const userIndx = memberList.group.findIndex(p => p.userId == userInfo.userId);
      console.log(userIndx);
      if (userIndx !== -1) {
        const num = memberList.group[userIndx].quantity;
        console.log(num);
        await coll1.updateOne({ _id: ObjectId(userInfo.postId) },
          {
            $inc: { itemNumCurrent: -1 * (num) },
            $pull:{ group: { userId: userInfo.userId } }  },
          { session });
      }else{throw new Error('fail to add new comment');}
    }, transactionOptions);
  } 
  catch (e) {
    console.log(e);
    throw new Error('fail to leave group');
  }
  finally {
    await session.endSession();
    // await client.close();
  }
};

const changePostStatus = async (
  db,
  statusInfo,
) => {
  try {
    await db.collection('postDB').updateOne(
      {
        _id: ObjectId(statusInfo.postId),
      },
      { $set: { status: statusInfo.newStatus } },

    );
  } catch (e) {
    throw new Error('fail to add new comment');
  }
};
module.exports = {
  connect,
  addPost,
  addComment,
  getPost,
  getSortedPostBySearch,
  joinGroup,
  leaveGroup,
  changePostStatus,
};
