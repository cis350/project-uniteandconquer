/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('../modules/PostDB');

const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

test('addPost could add a new post', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/addPost`).reply(201, { success: true, data: 'PostID', error: null });
  await api.addPost(
    'apple',
    25,
    500,
    20,
    'apple.com',
    'juicy',
    'ObjectID',
    ['food'],
    (success, data, error) => {
      expect(success).toBe(true);
      expect(data).toBe('PostID');
      expect(error).toBe(null);
    },
  );
});

test('addComment could add a new comment', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/addComment`).reply(201, { success: true, error: null });
  await api.addComment(
    'ObjectID',
    'PostID',
    'content',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});

test('getPost could fetch a post', async () => {
  // mock the axios response- new user 201
  mock.onGet(`${rootURL}/getPost/id`).reply(201, { success: true, data: 'post', error: null });
  await api.getPost(
    'id',
    (success, data, error) => {
      expect(success).toBe(true);
      expect(data).toBe('post');
      expect(error).toBe(null);
    },
  );
});

test('getSortedPostBySearch could fetch posts based on search conditions', async () => {
  // mock the axios response- new user 201
  mock.onGet(`${rootURL}/getSortedPostBySearch/startIdx/endIdx/?keywords=keywords&tags[]=tag`).reply(201, { success: true, data: 'post', error: null });
  await api.getSortedPostBySearch(
    'startIdx',
    'endIdx',
    'keywords',
    ['tag'],
    (success, data, error) => {
      expect(success).toBe(true);
      expect(data).toBe('post');
      expect(error).toBe(null);
    },
  );
});

test('joinGroup could joins a user in group', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/joinGroup`).reply(201, { success: true, error: null });
  await api.joinGroup(
    'UserId',
    'PostId',
    25,
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});

test('leaveGroup could leaves a user from group', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/leaveGroup`).reply(201, { success: true, error: null });
  await api.leaveGroup(
    'UserId',
    'PostId',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});

test('changePostStatus could leaves a user from group', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/changePostStatus`).reply(201, { success: true, error: null });
  await api.changePostStatus(
    'UserId',
    'PostId',
    'newStatus',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});
