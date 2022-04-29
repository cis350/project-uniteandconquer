// Create express app
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const webapp = express();
const cors = require('cors');
const userlib = require('./userdbOperation');
const postlib = require('./postdbOperations');

let db;
let sessiondb;

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(cors({ credentials: true, origin: true }));

const url = 'mongodb+srv://cis350:cis350@cluster0.ivirc.mongodb.net/uniteconquer?retryWrites=true&w=majority';
const uri = 'mongodb+srv://cis350:cis350@cluster0.ivirc.mongodb.net/?retryWrites=true&w=majority';

// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to unite and conquer' });
});

// TODO: define all endpoints as specified in REST API
// addPlayer endpoint

webapp.post('/addPost', async (req, resp) => {
  // check the name was provided
  if (!req.body.itemName || req.body.itemName.length === 0) {
    resp.status(404).json({ error: 'itemName not provided' });
  }
  if (!req.body.itemNumTarget) {
    resp.status(404).json({ error: 'itemNumTarget not provided' });
  }
  if (!req.body.itemNumCurrent) {
    resp.status(404).json({ error: 'itemNumCurrent  not provided' });
  }
  if (!req.body.pricePerItem) {
    resp.status(404).json({ error: 'pricePerItem  not provided' });
  }
  if (!req.body.itemURL || req.body.itemURL.length === 0) {
    resp.status(404).json({ error: 'itemURL not provided' });
  }
  if (!req.body.itemDescription || req.body.itemDescription.length === 0) {
    resp.status(404).json({ error: 'itemDescription not provided' });
  }
  if (!req.body.ownerId || req.body.ownerId.length === 0) {
    resp.status(404).json({ error: 'ownerId  not provided' });
  }
  if (!req.body.tags || req.body.tags.length === 0) {
    resp.status(404).json({ error: 'itemURL not provided' });
  }
  try {
    const myDate = new Date();
    const member = { userId: req.body.ownerId, quantity: req.body.itemNumCurrent };
    const post = {
      ...req.body,
      comments: [],
      createdAt: myDate,
      status: 0,
      group: [member],
    };
    console.log(post);
    const result = await postlib.addPost(db, post);
    // send the response
    resp.status(201).json({ data: result });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.post('/addComment', async (req, resp) => {
  // check the name was provided
  if (!req.body.authorId || req.body.authorId.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
  }
  if (!req.body.postId || req.body.postId.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
  }
  if (!req.body.content || req.body.content.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
  }
  try {
    console.log(req.body);
    await postlib.addComment(db, req.body);
    // send the response
    resp.status(201).json({ message: 'comment added' });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.get('/getPost/:postId', async (req, resp) => {
  // check the name was provided
  const { postId } = req.params;
  try {
    const result = await postlib.getPost(db, postId);
    // send the response
    resp.status(201).json({ data: result });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.get('/getSortedPostBySearch/:startIdx/:endIdx', async (req, resp) => {
  // check the name was provided
  const {
    startIdx, endIdx,
  } = req.params;
  const keywords = req.query.keywords ? req.query.keywords : '';
  const tags = req.query.tags ? req.query.tags : [];
  console.log(keywords);
  console.log(tags);
  console.log(startIdx);
  console.log(endIdx);
  try {
    const result = await postlib.getSortedPostBySearch(db, startIdx, endIdx, keywords, tags);
    // send the response
    resp.status(201).json({ data: result });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.post('/joinGroup', async (req, resp) => {
  // check the name was provided
  if (!req.body.userId || req.body.userId.length === 0) {
    resp.status(404).json({ error: 'userId not provided' });
  }
  if (!req.body.postId || req.body.postId.length === 0) {
    resp.status(404).json({ error: 'postId not provided' });
  }
  if (!req.body.quantity) {
    resp.status(404).json({ error: 'quantity not provided' });
  }
  try {
    await postlib.joinGroup(db, req.body);
    // send the response
    resp.status(201).json({ message: 'user join' });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.post('/leaveGroup', async (req, resp) => {
  // check the name was provided
  if (!req.body.userId || req.body.userId.length === 0) {
    resp.status(404).json({ error: 'userId not provided' });
  }
  if (!req.body.postId || req.body.postId.length === 0) {
    resp.status(404).json({ error: 'postId not provided' });
  }
  try {
    await postlib.leaveGroup(sessiondb, req.body);
    // send the response
    resp.status(201).json({ message: 'user join' });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.post('/changePostStatus', async (req, resp) => {
  // check the name was provided
  if (!req.body.userId || req.body.userId.length === 0) {
    resp.status(404).json({ error: 'userId not provided' });
  }
  if (!req.body.postId || req.body.postId.length === 0) {
    resp.status(404).json({ error: 'postId not provided' });
  }
  if (!req.body.newStatus) {
    resp.status(404).json({ error: 'quantity not provided' });
  }
  try {
    await postlib.changePostStatus(db, req.body);
    // send the response
    resp.status(201).json({ message: 'user join' });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 8080;
webapp.listen(port, async () => {
  db = await userlib.connect(url);
  sessiondb = new MongoClient(uri);
  await sessiondb.connect();
  console.log(`Server running on port:${port}`);
});