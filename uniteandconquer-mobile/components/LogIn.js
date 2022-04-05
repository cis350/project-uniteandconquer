import React from 'react';
import {
  StyleSheet, View, Text, Button, TextInput,
} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { showMessage } from 'react-native-flash-message';

import { loginUserWithEmail } from '../modules/UserDB';

// styling ---------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAE9C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    marginHorizontal: 30,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'stretch',
  },
});

// app content --------

export default function LogIn({ navigation }) {
  // General email regex (RFC 5322 Official Standard)
  // Adopted from https://mailtrap.io/blog/react-native-email-validation/
  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogIn = () => {
    if (email && password) {
      if (email.match(emailRegex)) {
        loginUserWithEmail(email, password, (success, userId, err) => {
          if (success) {
            navigation.navigate('Home', { userId });
          } else {
            showMessage({
              message: err,
              type: 'danger',
            });
          }
        });
      } else {
        showMessage({
          message: 'Invalid email format',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Email or password missing',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <Button
        onPress={handleLogIn}
        title="Log In"
      />
    </View>
  );
}
