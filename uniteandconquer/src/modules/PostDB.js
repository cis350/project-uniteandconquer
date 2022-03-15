// Post and comment operations

function addPost(
  itemName,
  itemNumTarget,
  itemNumCurrent,
  pricePerItem,
  itemURL,
  itemDescription,
  tags,
  callback,
) {
  return callback(true, 0, null);
}

function addComment(authorId, postId, content, callback) {
  return callback(true, null);
}

function getPost(id, callback) {
  return callback(
    true,
    'AA Batteries',
    20,
    5,
    0.46,
    'https://www.amazon.com/AmazonBasics-Performance-Alkaline-Batteries-20-Pack/dp/B00NTCH52W/ref=sr_1_5?keywords=20+aa+batteries&qid=1647322286&sprefix=20+aa+ba%2Caps%2C208&sr=8-5',
    'AA batteries for anything',
    {
      firstName: 'Yuying',
      lastName: 'Fan',
      phone: { countryCode: '1', phoneNumber: '9783999395' },
      email: 'yuyingf@seas.upenn.edu',
    },
    [{ firstName: 'Yuying', lastName: 'Fan', quantity: 2 },
      { firstName: 'Zhihang', lastName: 'Yuan', quantity: 3 }],
    [{
      content: 'Are you on campus',
      author: { firstName: 'Dee', lastname: 'Xie' },
      createdAt: '3/15/2022, 1:21:34 PM',
    }, {
      content: 'Yes I am',
      author: { firstName: 'Yuying', lastname: 'Fan' },
      createdAt: '3/15/2022, 1:25:58 PM',
    }],
    '3/14/2022, 1:21:34 PM',
    0,
    ['Home'],
    null,
  );
}

function getAllPosts(callback) {
  return callback(true, [{
    id: 1, itemName: 'Ramen', pricePerItem: 0.99, createdAt: '3/15/2022, 3:20:45 PM', tags: ['Food'],
  }, {
    id: 0, itemName: 'AA Batteries', pricePerItem: 0.46, createdAt: '3/14/2022, 1:21:34 PM', tags: ['Home'],
  }], null);
}

function joinGroup(userId, postId, quantity, callback) {
  return callback(true, null);
}

function leaveGroup(userId, postId, callback) {
  return callback(true, null);
}

export {
  addPost,
  addComment,
  getPost,
  getAllPosts,
  joinGroup,
  leaveGroup,
};
