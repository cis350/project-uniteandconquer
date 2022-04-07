import React from 'react';
// import react navigation container
import { NavigationContainer } from '@react-navigation/native';
// import navigation stack constructor
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import UserProfile from './components/UserProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import Comment from './components/Comment';
import Setting from './components/SettingMain';
import SettingInterests from './components/UpdateInterests';
import UpdateInfo from './components/UpdatePersonalInfo';
import UpdatePassword from './components/UpdatePassword';

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

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
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
  );
}
