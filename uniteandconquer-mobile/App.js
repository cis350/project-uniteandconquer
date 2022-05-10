/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {
  StyleSheet, View, Text, Button, TouchableOpacity, ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import Comment from './components/Comment';
import Notification from './components/Notification';
import Setting from './components/SettingMain';
import UpdateInfo from './components/UpdatePersonalInfo';
import UpdatePassword from './components/UpdatePassword';
import SettingInterests from './components/UpdateInterests';
import { getUserDetails } from './modules/UserDB';
import tagsList from './data/tags.json';

const notifyDB = require('./modules/NotificationDB');
const PostDB = require('./modules/PostDB');

// styling ---------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    width: '100%',
    height: '100%',
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

const postButton = StyleSheet.create({
  container: {
    backgroundColor: '#FFD9A0',
    borderRadius: 6,
    padding: 3,
    width: '30%',
    marginLeft: 20,
  },
});

const homePageStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    zIndex: 1,
  },
  postContainer: {
    padding: 20,
    backgroundColor: '#FFD9A0',
    width: '90%',
    marginTop: 20,
  },
  postTitle: {
    fontSize: 23,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  bar: {
    backgroundColor: '#FFD9A0',
    padding: 10,
    width: '70%',
  },
  icon: {
    backgroundColor: '#FFD9A0',
    padding: 7,
  },
  selectTags: {
    marginTop: 20,
    backgroundColor: '#FFD9A0',
    padding: 10,
    width: '78%',
    borderWidth: 0,
    marginBottom: 100,
    textAlign: 'center',
  },
  dropdown: {
    textAlign: 'center',
  },
  showButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  },
  iconProfile: {
    alignSelf: 'flex-end',
  },
  posts: {
    marginBottom: 20,
  },
});

// app content --------

function HomeScreen({ navigation, route }) {
  // const { userId, firstName } = route.params;
  const firstName = React.useRef('');
  const UserID = React.useRef('');

  const [firstNameState, setFirstNameState] = React.useState('');
  const [posts, setPosts] = useState([]);
  // const [selectedTags, setSelectedTags] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = React.useState('');
  const [showNotif, setShowNotif] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState(tagsList);
  const [notifs, setNotifs] = useState([]);
  const search = () => {

  };

  useEffect(() => {
    if (route.params?.userId) {
      getUserDetails(route.params?.userId, (success, user, err) => {
        if (success) {
          firstName.current = user.firstName;
          UserID.current = route.params?.userId;
          setFirstNameState(user.firstName);
        } else {
          showMessage({ message: err, type: 'danger' });
        }
      });
    }
  }, [route.params?.userId, firstNameState]);
  // time interval hook
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
      return null;
    }, [delay]);
  }

  // get all posts when user get into the page
  useEffect(() => {
    PostDB.getSortedPostBySearch(0, 19, '', [], (success, postInfo, err) => {
      if (success) {
        setPosts(postInfo);
      } else {
        console.log(err);
      }
    });
  }, []);

  useInterval(() => {
    const tagList = value.map((tag) => (tag.value));
    PostDB.getSortedPostBySearch(0, 19, searchKeyWord, tagList, (success, postInfo, err) => {
      if (success) {
        console.log(searchKeyWord, tagList);
        setPosts(postInfo);
      } else {
        console.log(err);
      }
    });
  }, 5000);

  const handleLogOut = () => {
    navigation.setParams({ userId: '' });
    setFirstNameState('');
    firstName.current = '';
  };

  const handleStartPost = () => {
    if (firstNameState) {
      navigation.navigate('CreatePost', {
        userName: firstName.current,
        userId: UserID.current,
      });
    } else {
      navigation.navigate('LogIn');
    }
  };

  const handleNotifClick = async () => {
    await notifyDB.getNotificationsForUser(route.params?.userId, (success, notifList, err) => {
      if (success) {
        setNotifs(notifList);
        setShowNotif(!showNotif);
      } else {
        console.log(err);
      }
    });
  };

  const handleProfile = () => {
    if (firstNameState) {
      navigation.navigate('UserProfile', {
        userId: firstNameState,
      });
    } else {
      navigation.navigate('LogIn');
    }
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
          style={homePageStyles.iconProfile}
          onPress={() => handleProfile()}
        >
          <Icon name="user" size={28} style={userStyles.icon} />
        </TouchableOpacity>
        <Text style={userStyles.text}>
          {firstNameState ? (
            <Text>
              Hello,
              {` ${firstNameState}`}
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
        <Text style={userStyles.button}>
          {!firstNameState ? (
            <Button
              color="#000"
              title="Log In"
              onPress={() => navigation.navigate('LogIn')}
            />
          ) : (
            <Button
              color="#000"
              title="Log Out"
              onPress={handleLogOut}
            />
          )}
        </Text>
      </View>
      <View style={homePageStyles.showButton}>
        {firstNameState ? (
          <TouchableOpacity
            onPress={handleNotifClick}
          >
            <Icon
              name="bell"
              size={25}
            />
          </TouchableOpacity>
        ) : <Text />}
      </View>
      <View style={postButton.container}>
        <Button
          color="#000"
          title="Start a Post"
          onPress={() => handleStartPost()}
        />
      </View>
      <View style={homePageStyles.searchContainer}>
        <TextInput
          style={homePageStyles.bar}
          onChangeText={setSearchKeyWord}
          value={searchKeyWord}
          placeholder="What are you searching for?"
        />
        <TouchableOpacity
          onPress={() => search()}
        >
          <Icon name="search" size={20} style={homePageStyles.icon} />
        </TouchableOpacity>
      </View>
      <View style={homePageStyles.center}>
        <View style={homePageStyles.dropdown}>
          <DropDownPicker
            multiple
            min={0}
            style={{
              backgroundColor: '#FFD9A0',
              width: '80%',
              marginTop: 20,
              position: 'relative',
              zIndex: 100,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{
              backgroundColor: '#FFD9A0',
              width: '80%',
              marginTop: 15,
            }}
            placeholder="Select tags"
            mode="BADGE"
            searchable
            searchPlaceholder="Search tags"
            listMode="SCROLLVIEW"
          />
        </View>
      </View>
      <View style={homePageStyles.posts}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post._id}
            onPress={() => navigation.navigate('PostDetails', {
              userName: firstName.current, userId: UserID.current, postId: post._id,
            })}
          >
            <View key={post._id} style={homePageStyles.center}>
              <View style={homePageStyles.postContainer}>
                <Text style={homePageStyles.postTitle}>{post.itemName}</Text>
                <Text>
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
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="PostDetails" component={PostDetails} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="SettingMain" component={Setting} />
          <Stack.Screen name="SettingInterests" component={SettingInterests} />
          <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </View>
  );
}
