import React from 'react';
// import react navigation container
import { NavigationContainer } from '@react-navigation/native';
// import navigation stack constructor
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet, ScrollView, View, Text, Button, TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import UserProfile from './components/UserProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import Comment from './components/Comment';
import Notification from './components/Notification';

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
    margin: 14,
  },
  text: {
    textAlign: 'right',
    margin: 3,
  },
  icon: {
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
});

// app content --------

function HomeScreen({ navigation }) {
  const [posts, setPosts] = React.useState([
    { item: 'item', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ex vel arcu eleifend, vestibulum lacinia libero scelerisque.' },
    { item: 'item', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ex vel arcu eleifend, vestibulum lacinia libero scelerisque.' },
    { item: 'item', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat ex vel arcu eleifend, vestibulum lacinia libero scelerisque.' }]);
  const [searchKeyWord, setSearchKeyWord] = React.useState('');
  const [showNotif, setShowNotif] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    { label: 'tag1', value: 'tag1' },
    { label: 'tag2', value: 'tag2' },
    { label: 'tag3', value: 'tag3' },
  ]);
  const search = () => {

  };
  return (
    <ScrollView style={styles.container}>
      {showNotif && <Notification setShowNotif={setShowNotif} showNotif={showNotif} />}
      <View style={userStyles.container}>
        <Icon name="user" size={28} style={userStyles.icon} />
        <Text style={userStyles.text}>
          Hi, Jeremy
        </Text>
        <Text style={userStyles.text}>
          My Chats
        </Text>
        <Text style={userStyles.text}>
          Log Out
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
          />
        </View>
      </View>
      <View>
        {posts.map((post) => (
          <View style={homePageStyles.center}>
            <View style={homePageStyles.postContainer}>
              <Text style={homePageStyles.postTitle}>{post.item}</Text>
              <Text>{post.description}</Text>
            </View>
          </View>
        ))}
      </View>
      <View>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('UserProfile')}
        />
        <Button
          title="Post Details"
          onPress={() => navigation.navigate('PostDetails')}
        />
        <Button
          title="Create Post"
          onPress={() => navigation.navigate('CreatePost')}
        />
      </View>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="Comment" component={Comment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
