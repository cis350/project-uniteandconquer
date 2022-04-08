import React from 'react';
import {
  StyleSheet, View, Button, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notification from './Notification';

// styling ---------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    height: '100%',
    width: '100%',
  },
});

const userStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'right',
    margin: 4,
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
  },
});

const profileContainer = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  leftButton: {
    backgroundColor: '#FFD9A0',
    height: 35,
    width: 150,
    marginRight: 35,
  },
  rightButton: {
    backgroundColor: '#FFD9A0',
    height: 35,
    width: 150,
    marginLeft: 35,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  post: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFD9A0',
    marginBottom: 5,
    width: 380,
  },
  postHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  },
});

const tagStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFD9A0',
    marginBottom: 15,
    width: 380,
    marginTop: 15,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 19,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    margin: 10,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  position: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// app content --------

export default function UserProfile({ navigation }) {
  const [showNotif, setShowNotif] = React.useState(false);
  return (
    <ScrollView style={styles.container}>
      {showNotif && <Notification setShowNotif={setShowNotif} showNotif={showNotif} />}
      <View style={userStyles.container}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon name="user" size={28} style={userStyles.icon} />
        </TouchableOpacity>
        <Text style={userStyles.text}>
          Hello, guest!
        </Text>
        <Text style={userStyles.button}>
          <Button
            color="#000"
            title="My Chats"
          />
        </Text>
        <Text style={userStyles.button}>
          <Button
            color="#000"
            title="Log In"
            onPress={() => navigation.navigate('LogIn')}
          />
        </Text>
      </View>
      <View style={profileContainer.showButton}>
        <TouchableOpacity
          onPress={() => setShowNotif(!showNotif)}
        >
          <Icon
            name="bell"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={profileContainer.header}>My Profile</Text>
        <View style={profileContainer.buttons}>
          <View style={profileContainer.leftButton}><Button color="#000" title="Settings" /></View>
          <View style={profileContainer.rightButton}><Button color="#000" title="Main Page" onPress={() => navigation.navigate('Home')} /></View>
        </View>
        <Text style={profileContainer.subtitle}>My Owned Posts</Text>
        <View style={profileContainer.postContainer}>
          <View style={profileContainer.post}>
            <Text style={profileContainer.postHeader}>This is a Post</Text>
            <Text style={profileContainer.postContent}>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
          <View style={profileContainer.post}>
            <Text style={profileContainer.postHeader}>This is a Post</Text>
            <Text style={profileContainer.postContent}>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
          <View style={profileContainer.post}>
            <Text style={profileContainer.postHeader}>This is a Post</Text>
            <Text style={profileContainer.postContent}>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
        </View>
        <Text style={profileContainer.subtitle}>My Joined Posts</Text>
        <View style={profileContainer.postContainer}>
          <View style={profileContainer.post}>
            <Text style={profileContainer.postHeader}>This is a Post</Text>
            <Text style={profileContainer.postContent}>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
          <View style={profileContainer.post}>
            <Text style={profileContainer.postHeader}>This is a Post</Text>
            <Text style={profileContainer.postContent}>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
          <View style={profileContainer.post}>
            <Text style={profileContainer.postHeader}>This is a Post</Text>
            <Text style={profileContainer.postContent}>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
        </View>
        <View style={tagStyles.position}>
          <View style={tagStyles.container}>
            <Text style={tagStyles.header}>My Interests</Text>
            <View style={tagStyles.tags}>
              <Text style={tagStyles.tag}>tag</Text>
              <Text style={tagStyles.tag}>tag</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
