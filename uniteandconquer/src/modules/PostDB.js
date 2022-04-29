/* Post and comment operations */
function addPost(
  itemName,
  itemNumTarget,
  itemNumCurrent,
  pricePerItem,
  itemURL,
  itemDescription,
  ownerId,
  tags,
  callback,
) {
  const response = await axios.post(`${rootURL}/addPost`, {
    itemName: `${itemName}`,
    itemNumTarget: `${itemNumTarget}`,
    itemNumCurrent: `${itemNumCurrent}`,
    pricePerItem: `${pricePerItem}`,
    itemURL: `${itemURL}`,
    itemDescription: `${itemDescription}`,
    ownerId: `${ownerId}`,
    tags: `${tags}`,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function addComment(authorId, postId, content, callback) {
  const response = await axios.post(`${rootURL}/addComment`, {
    authorId: `${authorId}`,
    postId: `${postId}`,
    content: `${content}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

function getPost(id, callback) {
  const response = await axios.get(`${rootURL}/getPost/${id}`, {
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
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

function getSortedPostBySearch(startIdx, endIdx, keywords, tags, callback) {
  const url = `${rootURL}/getSortedPostBySearch/${startIdx}/${endIdx}/?keywords=${keywords}`;
  for (const tag of tags) {
    url = url + `&tags[]=${tag}`;
  }
  const response = await axios.get(url);
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

function getSortedPostsByKeyword(startIdx, endIdx, keyword, callback) {
  return callback(true, [{
    id: '5087901e810c109679e860ea', itemName: 'Ramen', pricePerItem: 0.99, createdAt: '2022-03-15T15:14:17.925Z', tags: ['Food'],
  }], null);
}

function joinGroup(userId, postId, quantity, callback) {
  const response = await axios.get(`${rootURL}/joinGroup`, {
    authorId: `${authorId}`,
    postId: `${postId}`,
    quantity: `${quantity}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

function leaveGroup(userId, postId, callback) {
  const response = await axios.get(`${rootURL}/joinGroup`, {
    userId: `${userId}`,
    postId: `${postId}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

function changePostStatus(userId, postId, newStatus, callback) {
  const response = await axios.get(`${rootURL}/joinGroup`, {
    userId: `${userId}`,
    postId: `${postId}`,
    newStatus: `${newStatus}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

export {
  addPost,
  addComment,
  getPost,
  getSortedPostsInRange,
  getSortedPostsByTags,
  getSortedPostsByKeyword,
  joinGroup,
  leaveGroup,
  changePostStatus,
  getSortedPostBySearch,
};

