import React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const notifyDB = require('../modules/NotificationDB');
// styling ---------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD9A0',
    minHeight: 300,
    width: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
});

const notificationStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD9A0',
    minHeight: 300,
    width: 175,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    margin: 5,
  },
  header: {
    textAlign: 'center',
    fontSize: 23,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 5,
  },
  notifMsg: {
    marginLeft: 5,
  },
  notifMsgContainer: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#FFAB2D',
    overflow: 'hidden',
    margin: 4,
  },
  notifCancelButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

// app content --------

export default function Notification({
  setShowNotif, showNotif, notifs, setNotifs, userId,
}) {
  const messageGenerator = () => notifs.map(
    (notif) => {
      const message = notif.content;
      const date = new Date(notif.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' });
      return (
        <View style={notificationStyles.notifMsgContainer}>
          <Text style={notificationStyles.notifMsg}>
            {message}
            {' '}
            -
            {' '}
            {date}
          </Text>
        </View>
      );
    },
  );
  const handleClick = async () => {
    await notifyDB.deleteNotifications(userId, (success, err) => {
      if (success) {
        console.log('click');
        setNotifs([]);
      } else {
        console.log(err);
      }
    });
    setShowNotif(!showNotif);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <Icon
          style={notificationStyles.cancelButton}
          name="times"
          size={15}
        />
      </TouchableOpacity>
      <Text style={notificationStyles.header}>Notifications</Text>
      {messageGenerator()}
    </View>
  );
}
