/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('../modules/UserDB');

const rootURL = 'http://localhost:8080';
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

test('createUser creates a new player', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/createUser`).reply(201, { success: true, error: null });
  await api.createUser(
    '1',
    '4452219194',
    'zhyuan1@seas.upenn.edu',
    'Zhihang311@',
    'Zhihang',
    'Yuan',
    'food',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});

test('loginUserWithPhone logins an user', async () => {
  mock.onPost(`${rootURL}/loginUserWithPhone`).reply(201, { success: true, id: 'objectID', error: null });
  await api.loginUserWithPhone(
    '1',
    '4452219194',
    'Zhihang311@',
    (success, id, error) => {
      expect(success).toBe(true);
      expect(id).toBe('objectID');
      expect(error).toBe(null);
    },
  );
});

test('loginUserWithEmail logins an user', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/loginUserWithEmail`).reply(201, { success: true, id: 'objectID', error: null });
  await api.loginUserWithEmail(
    'zhyuan1@seas.upenn.edu',
    'Zhihang311@',
    (success, id, error) => {
      expect(success).toBe(true);
      expect(id).toBe('objectID');
      expect(error).toBe(null);
    },
  );
});

test('modifyUser modifies an user information', async () => {
  // mock the axios response- new user 201
  mock.onPut(`${rootURL}/modify`).reply(201, { success: true, error: null });
  await api.modifyUser(
    'ObjectID',
    'password',
    'newValue',
    'oldPassword',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});

test('getPassword returns an user password', async () => {
  // mock the axios response- new user 201
  mock.onGet(`${rootURL}/getPassword?id=ObjectID`).reply(201, { success: true, data: 'password', error: null });
  await api.getPassword(
    'ObjectID',
    (success, data, error) => {
      expect(success).toBe(true);
      expect(data).toBe('password');
      expect(error).toBe(null);
    },
  );
});

test('getUserDetails returns an user information', async () => {
  // mock the axios response- new user 201
  mock.onGet(`${rootURL}/getUserDetails?id=ObjectID`).reply(201, { success: true, data: 'userInfo', error: null });
  await api.getUserDetails(
    'ObjectID',
    (success, data, error) => {
      expect(success).toBe(true);
      expect(data).toBe('userInfo');
      expect(error).toBe(null);
    },
  );
});
