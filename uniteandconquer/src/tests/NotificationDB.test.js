/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('../modules/NotificationDB');

const rootURL = 'http://localhost:8080';
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

test('addNotif could add a new notification', async () => {
  // mock the axios response- new user 201
  mock.onPost(`${rootURL}/addNotification`).reply(201, { success: true, error: null });
  await api.createNotification(
    'ObjectID',
    'content',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});

test('getNotificationsForUser could get a new notification for user', async () => {
  // mock the axios response- new user 201
  mock.onGet(`${rootURL}/getNotificationForUser/userID`).reply(201, { success: true, data: 'data', error: null });
  await api.getNotificationsForUser(
    'userID',
    (success, data, error) => {
      expect(success).toBe(true);
      expect(data).toBe('data');
      expect(error).toBe(null);
    },
  );
});

test('deleteNotifications could delete a notification', async () => {
  // mock the axios response- new user 201
  mock.onDelete(`${rootURL}/deletNotifForUser/userID`).reply(201, { success: true, error: null });
  await api.deleteNotifications(
    'userID',
    (success, error) => {
      expect(success).toBe(true);
      expect(error).toBe(null);
    },
  );
});
