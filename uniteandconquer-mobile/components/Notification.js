import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    width: 200,
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

export default function Notification({ setShowNotif, showNotif }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowNotif(!showNotif)}>
        <Icon
          style={notificationStyles.cancelButton}
          name="times"
          size={15}
        />
      </TouchableOpacity>
      <Text style={notificationStyles.header}>Notifications</Text>
      <View>
        <Text style={notificationStyles.date}>28 February 2022</Text>
        <View style={notificationStyles.notifMsgContainer}>
          <TouchableOpacity>
            <Icon
              style={notificationStyles.notifCancelButton}
              name="times"
              size={15}
            />
          </TouchableOpacity>
          <Text style={notificationStyles.notifMsg}>[message] - 2 days ago</Text>
        </View>
        <View style={notificationStyles.notifMsgContainer}>
          <TouchableOpacity>
            <Icon
              style={notificationStyles.notifCancelButton}
              name="times"
              size={15}
            />
          </TouchableOpacity>
          <Text style={notificationStyles.notifMsg}>[message] - 4 days ago</Text>
        </View>
        <View style={notificationStyles.notifMsgContainer}>
          <TouchableOpacity>
            <Icon
              style={notificationStyles.notifCancelButton}
              name="times"
              size={15}
            />
          </TouchableOpacity>
          <Text style={notificationStyles.notifMsg}>[message] - 5 days ago</Text>
        </View>
        <Text style={notificationStyles.date}>2 February 2022</Text>
        <View style={notificationStyles.notifMsgContainer}>
          <TouchableOpacity>
            <Icon
              style={notificationStyles.notifCancelButton}
              name="times"
              size={15}
            />
          </TouchableOpacity>
          <Text style={notificationStyles.notifMsg}>[message] - 22 days ago</Text>
        </View>
        <View style={notificationStyles.notifMsgContainer}>
          <TouchableOpacity>
            <Icon
              style={notificationStyles.notifCancelButton}
              name="times"
              size={15}
            />
          </TouchableOpacity>
          <Text style={notificationStyles.notifMsg}>[message] - 25 days ago</Text>
        </View>
      </View>
    </View>
  );
}
