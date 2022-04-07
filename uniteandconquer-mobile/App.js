import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import Comment from './components/Comment';

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
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </View>
  );
}
