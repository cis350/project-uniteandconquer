import { React, useEffect, useState } from 'react';
import {
  StyleSheet, View, Button, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notification from './Notification';

const UserDB = require('../modules/UserDB');
const PostDB = require('../modules/PostDB');
const notifyDB = require('../modules/NotificationDB');
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
    marginTop: 20,
    fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  post: {
    marginTop: 10,
    padding: 20,
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

export default function UserProfile({ navigation, route }) {
  const { userId } = route.params;
  const [showNotif, setShowNotif] = React.useState(false);
  const [tags, setTags] = React.useState([
    'Appliances', 'Books', 'Electronics',
  ]);
  const [ownedPosts, setOwnedPosts] = useState([]);
  const [notifs, setNotifs] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await UserDB.getUserDetails(userId, (success, userInfo, err) => {
      if (success) {
        setTags(userInfo.interests);
        userInfo.posts.forEach((post) => {
          PostDB.getPost(post, (success2, postInfo, err2) => {
            if (success2) {
              setOwnedPosts((arr) => [...arr, postInfo]);
            } else {
              console.log(err2);
            }
          });
        });
      } else {
        console.log(err);
      }
    });
  }, []);

  const handleNotifClick = async () => {
    await notifyDB.getNotificationsForUser(userId, (success, notifList, err) => {
      if (success) {
        setNotifs(notifList);
        setShowNotif(!showNotif);
      } else {
        console.log(err);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {showNotif && (
      <Notification
        setShowNotif={setShowNotif}
        showNotif={showNotif}
        notifs={notifs}
        setNotifs={setNotifs}
      />
      )}
      <View style={userStyles.container}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
        >
          <Icon name="user" size={28} style={userStyles.icon} />
        </TouchableOpacity>
        <Text style={userStyles.text}>
          {userId ? (
            <Text>
              Hello,
              {` ${userId}`}
              !
            </Text>
          ) : <Text>Hello, guest!</Text>}
        </Text>
        <Text style={userStyles.button}>
          <Button
            color="#000"
            title="My Chats"
          />
        </Text>
      </View>
      <View style={profileContainer.showButton}>
        <TouchableOpacity
          onPress={handleNotifClick}
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
          <View style={profileContainer.leftButton}><Button color="#000" title="Settings" onPress={() => navigation.navigate('SettingMain')} /></View>
          <View style={profileContainer.rightButton}><Button color="#000" title="Main Page" onPress={() => navigation.navigate('Home')} /></View>
        </View>
        <Text style={profileContainer.subtitle}>My Owned Posts</Text>
        <View style={profileContainer.postContainer}>
          {ownedPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => navigation.navigate('PostDetails')}
            >
              <View key={post.id} style={profileContainer.post}>
                <Text style={profileContainer.postHeader}>{post.itemName}</Text>
                <Text style={profileContainer.postContent}>
                  This post has
                  {' '}
                  {post.itemNumCurrent}
                  {' '}
                  currently,
                  prince is $
                  {' '}
                  {post.pricePerItem}
                  {' '}
                  each
                  {post.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={profileContainer.subtitle}>My Joined Posts</Text>
        {/* <View style={profileContainer.postContainer}>
          {joinedPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => navigation.navigate('PostDetails')}
            >
              <View key={post.id} style={profileContainer.post}>
                <Text style={profileContainer.postHeader}>{post.item}</Text>
                <Text style={profileContainer.postContent}>
                  {post.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}
        <View style={tagStyles.position}>
          <View style={tagStyles.container}>
            <Text style={tagStyles.header}>My Interests</Text>
            <View style={tagStyles.tags}>
              {tags.map((tag) => (<Text key={tag} style={tagStyles.tag}>{tag}</Text>))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
