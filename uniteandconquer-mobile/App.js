import React, { useEffect, useState } from 'react';
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
import { getUserDetails } from './modules/UserDB';

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
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (route.params?.userId) {
      getUserDetails(route.params?.userId, (success, user, err) => {
        if (success) {
          setFirstName(user.firstName);
        } else {
          showMessage({ message: err, type: 'danger' });
        }
      });
    }
  }, [route.params?.userId]);

  const [posts, setPosts] = React.useState([
    { id: 1, item: 'item', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ex vel arcu eleifend, vestibulum lacinia libero scelerisque.' },
    { id: 2, item: 'item', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ex vel arcu eleifend, vestibulum lacinia libero scelerisque.' },
    { id: 3, item: 'item', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ex vel arcu eleifend, vestibulum lacinia libero scelerisque.' }]);
  const [searchKeyWord, setSearchKeyWord] = React.useState('');
  const [showNotif, setShowNotif] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    { key: 'tag1', label: 'tag1', value: 'tag1' },
    { key: 'tag2', label: 'tag2', value: 'tag2' },
    { key: 'tag3', label: 'tag3', value: 'tag3' },
  ]);
  const search = () => {

  };

  return (
    <ScrollView style={styles.container}>
      {showNotif && <Notification setShowNotif={setShowNotif} showNotif={showNotif} />}
      <View style={userStyles.container}>
        <TouchableOpacity
          style={homePageStyles.iconProfile}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon name="user" size={28} style={userStyles.icon} />
        </TouchableOpacity>
        <Text style={userStyles.text}>
          {firstName ? (
            <Text>
              Hello,
              {` ${firstName}`}
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
          {!firstName ? (
            <Button
              color="#000"
              title="Log In"
              onPress={() => navigation.navigate('LogIn')}
            />
          ) : (
            <Button
              color="#000"
              title="Log Out"
              onPress={() => setFirstName('')}
            />
          )}
        </Text>
      </View>
      <View style={homePageStyles.showButton}>
        <TouchableOpacity
          onPress={() => setShowNotif(!showNotif)}
        >
          <Icon
            name="bell"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={postButton.container}>
        <Button
          color="#000"
          title="Start a Post"
          onPress={() => navigation.navigate('CreatePost')}
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
            key={post.id}
            onPress={() => navigation.navigate('PostDetails')}
          >
            <View key={post.id} style={homePageStyles.center}>
              <View style={homePageStyles.postContainer}>
                <Text style={homePageStyles.postTitle}>{post.item}</Text>
                <Text>{post.description}</Text>
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
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </View>
  );
}
