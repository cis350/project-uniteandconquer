/* Post and comment operations */
function addPost(
  itemName,
  itemNumTarget,
  itemNumCurrent,
  pricePerItem,
  itemURL,
  itemDescription,
  // dubiously needed
  ownerId,
  tags,
  callback,
) {
  return callback(true, '507f191e810c19729de860ea', null);
}

function addComment(authorId, postId, content, callback) {
  return callback(true, '507f191e8786gkbd9de860ea', null);
}

function getPost(id, callback) {
  return callback(true, {
    itemName: 'AA Batteries',
    itemNumTarget: 20,
    itemNumCurrent: 5,
    pricePerItem: 0.46,
    itemURL: 'https://www.amazon.com/AmazonBasics-Performance-Alkaline-Batteries-20-Pack/dp/B00NTCH52W/ref=sr_1_5?keywords=20+aa+batteries&qid=1647322286&sprefix=20+aa+ba%2Caps%2C208&sr=8-5',
    itemDescription: 'AA batteries for anything',
    owner: {
      firstName: 'Yuying',
      lastName: 'Fan',
      phone: { countryCode: '1', phoneNumber: '9783999395' },
      email: 'yuyingf@seas.upenn.edu',
    },
    group: [{ firstName: 'Yuying', lastName: 'Fan', quantity: 2 },
      { firstName: 'Zhihang', lastName: 'Yuan', quantity: 3 }],
    comments: [{
      content: 'Are you on campus',
      author: { firstName: 'Dee', lastname: 'Xie' },
      createdAt: '2022-03-15T12:53:14.924Z',
    }, {
      content: 'Yes I am',
      author: { firstName: 'Yuying', lastname: 'Fan' },
      createdAt: '2022-03-15T14:53:17.926Z',
    }],
    createdAt: '2022-03-14T13:14:14.925Z',
    status: 0,
    tags: ['Home'],
  }, null);
}

function getAllPosts(callback) {
  return callback(true, [{
    id: '5087901e810c109679e860ea', itemName: 'Ramen', pricePerItem: 0.99, createdAt: '2022-03-15T15:14:17.925Z', tags: ['Food'],
  }, {
    id: '5087901e810c19729de860ea', itemName: 'AA Batteries', pricePerItem: 0.46, createdAt: '2022-03-14T13:14:14.925Z', tags: ['Home'],
  }], null);
}

function getSortedPostsInRange(startIdx, endIdx, callback) {
  return getAllPosts(callback);
}

function getSortedPostsByTags(startIdx, endIdx, tags, callback) {
  return callback(true, [{
    id: '5087901e810c19729de860ea', itemName: 'AA Batteries', pricePerItem: 0.46, createdAt: '2022-03-14T13:14:14.925Z', tags: ['Home'],
  }], null);
}

function getSortedPostsBySearch(startIdx, endIdx, tags, keywords, callback) {
  return callback(true, [{
    id: '5087901e810c19729de860ea', itemName: 'AA Batteries', pricePerItem: 0.46, createdAt: '2022-03-14T13:14:14.925Z', tags: ['Home'],
  }], null);
}

function getSortedPostsByKeyword(startIdx, endIdx, keyword, callback) {
  return callback(true, [{
    id: '5087901e810c109679e860ea', itemName: 'Ramen', pricePerItem: 0.99, createdAt: '2022-03-15T15:14:17.925Z', tags: ['Food'],
  }], null);
}

function joinGroup(userId, postId, quantity, callback) {
  return callback(true, null);
}

function leaveGroup(userId, postId, callback) {
  return callback(true, null);
}

function changePostStatus(userId, postId, newStatus, callback) {
  return callback(true, null);
}

export {
  addPost,
  addComment,
  getPost,
  getSortedPostsInRange,
  getSortedPostsBySearch,
  getSortedPostsByTags,
  getSortedPostsByKeyword,
  joinGroup,
  leaveGroup,
  changePostStatus,
};
