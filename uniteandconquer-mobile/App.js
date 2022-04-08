import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import Comment from './components/Comment';

import Setting from './components/SettingMain';
import SettingInterests from './components/UpdateInterests';
import UpdateInfo from './components/UpdatePersonalInfo';
import UpdatePassword from './components/UpdatePassword';
import { getUserDetails } from './modules/UserDB';


// styling ---------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAE9C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// app content --------

function HomeScreen({ navigation, route }) {
  const [firstName, setFirsteName] = useState('');

  useEffect(() => {
    if (route.params?.userId) {
      getUserDetails(route.params?.userId, (success, user, err) => {
        if (success) {
          setFirsteName(user.firstName);
        } else {
          showMessage({ message: err, type: 'danger' });
        }
      });
    }
  }, [route.params?.userId]);

  return (
    <View style={styles.container}>
      {firstName ? (
        <Text>
          Hello,
          {` ${firstName}`}
          !
        </Text>
      ) : <Text>Hello, guest!</Text>}
      <Button
        title="Log In"
        onPress={() => navigation.navigate('LogIn')}
      />
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
      <Button
        title="Setting"
        onPress={() => navigation.navigate('SettingMain')}
      />
    </View>
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
