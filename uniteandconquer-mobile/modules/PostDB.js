/* Post and comment operations */
import axios from 'axios';

const rootURL = 'http://localhost:8080';
async function addPost(
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
    itemNumTarget: Number(itemNumTarget),
    itemNumCurrent: Number(itemNumCurrent),
    pricePerItem: Number(pricePerItem),
    itemURL: `${itemURL}`,
    itemDescription: `${itemDescription}`,
    ownerId: `${ownerId}`,
    tags,
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

async function addComment(authorId, postId, content, callback) {
  const response = await axios.post(`${rootURL}/addComment`, {
    authorId: `${authorId}`,
    postId: `${postId}`,
    content: `${content}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

async function getPost(id, callback) {
  const response = await axios.get(`${rootURL}/getPost/${id}`, {
  });
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

async function getAllPosts(callback) {
  return callback(true, [{
    id: '5087901e810c109679e860ea', itemName: 'Ramen', pricePerItem: 0.99, createdAt: '2022-03-15T15:14:17.925Z', tags: ['Food'],
  }, {
    id: '5087901e810c19729de860ea', itemName: 'AA Batteries', pricePerItem: 0.46, createdAt: '2022-03-14T13:14:14.925Z', tags: ['Home'],
  }], null);
}

async function getSortedPostsInRange(startIdx, endIdx, callback) {
  return getAllPosts(callback);
}

async function getSortedPostsByTags(startIdx, endIdx, tags, callback) {
  return callback(true, [{
    id: '5087901e810c19729de860ea', itemName: 'AA Batteries', pricePerItem: 0.46, createdAt: '2022-03-14T13:14:14.925Z', tags: ['Home'],
  }], null);
}

async function getSortedPostBySearch(startIdx, endIdx, keywords, tags, callback) {
  let url = `${rootURL}/getSortedPostBySearch/${startIdx}/${endIdx}/?keywords=${keywords}`;
  console.log(tags);
  tags.forEach((tag) => { url += `&tags[]=${tag}`; });
  console.log(url);
  const response = await axios.get(url);
  const result = response.data;
  return callback(result.success, result.data, result.error);
}

async function getSortedPostsByKeyword(startIdx, endIdx, keyword, callback) {
  return callback(true, [{
    id: '5087901e810c109679e860ea', itemName: 'Ramen', pricePerItem: 0.99, createdAt: '2022-03-15T15:14:17.925Z', tags: ['Food'],
  }], null);
}

async function joinGroup(userId, postId, quantity, callback) {
  const response = await axios.post(`${rootURL}/joinGroup`, {
    userId: `${userId}`,
    postId: `${postId}`,
    quantity: Number(quantity),
  });
  const result = response.data;
  return callback(result.success, result.error);
}

async function leaveGroup(userId, postId, callback) {
  const response = await axios.post(`${rootURL}/leaveGroup`, {
    userId: `${userId}`,
    postId: `${postId}`,
  });
  const result = response.data;
  return callback(result.success, result.error);
}

async function changePostStatus(userId, postId, newStatus, callback) {
  const response = await axios.post(`${rootURL}/changePostStatus`, {
    userId: `${userId}`,
    postId: `${postId}`,
    newStatus: Number(newStatus),
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
