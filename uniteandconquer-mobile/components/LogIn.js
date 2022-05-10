import React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {
  StyleSheet, View, Text, Button, TextInput,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';

import { loginUserWithPhone, loginUserWithEmail } from '../modules/UserDB';

const UserDB = require('../modules/UserDB');

// styling ---------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAE9C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    width: '20%',
    height: 40,
    margin: 12,
    marginRight: 0,
    backgroundColor: '#e9967a',
    padding: 10,
  },
  inputPhoneNumber: {
    width: '60%',
    height: 40,
    margin: 12,
    marginHorizontal: 0,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'stretch',
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
let firstName;
const getFirstName = async (userID) => {
  await UserDB.getUserDetails(userID, (success, data) => {
    if (success) {
      firstName = data.firstName;
      return firstName;
    }
    return null;
  });
};

function PhoneLogIn({ navigation }) {
  const [countryCode, setCountryCode] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');

  const countryCodeList = ['+1', '+86'];

  const setUserInfoPhone = async (userId, username_) => {
    await AsyncStorage.setItem('UserID', userId);
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('loginAuth', JSON.stringify({ phone: username_ }));
  };

  const handleLogIn = () => {
    if (countryCode && phoneNumber && password) {
      if (phoneNumber.match(/^\d+$/)) {
        loginUserWithPhone(countryCode, phoneNumber, password, (success, userId, err) => {
          if (success) {
            getFirstName(userId);
            setUserInfoPhone(userId, phoneNumber);
            navigation.navigate({ name: 'Home', params: { userId }, merge: true });
          } else {
            showMessage({ message: err, type: 'danger' });
          }
        });
      } else {
        showMessage({ message: 'Invalid phone number', type: 'danger' });
      }
    } else {
      showMessage({ message: 'Phone or password missing', type: 'danger' });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome Back!</Text>
      <View style={{ alignContent: 'space-between', flexDirection: 'row' }}>
        <SelectDropdown
          data={countryCodeList}
          defaultButtonText="Select"
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={{ fontSize: 14 }}
          onSelect={(selectedItem) => {
            setCountryCode(selectedItem);
          }}
        />
        <TextInput
          style={styles.inputPhoneNumber}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
      </View>
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

function EmailLogIn({ navigation }) {
  // General email regex (RFC 5322 Official Standard)
  // Adopted from https://mailtrap.io/blog/react-native-email-validation/
  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const setUserInfoEmail = async (userId, username_) => {
    await AsyncStorage.setItem('UserID', userId);
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('loginAuth', JSON.stringify({ email: username_ }));
  };

  const handleLogIn = () => {
    if (email && password) {
      if (email.match(emailRegex)) {
        loginUserWithEmail(email, password, (success, userId, err) => {
          if (success) {
            getFirstName(userId);
            setUserInfoEmail(userId, email);
            navigation.navigate({ name: 'Home', params: { userId }, merge: true });
          } else {
            showMessage({ message: err, type: 'danger' });
          }
        });
      } else {
        showMessage({ message: 'Invalid email format', type: 'danger' });
      }
    } else {
      showMessage({ message: 'Email or password missing', type: 'danger' });
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

const Tab = createBottomTabNavigator();

export default function LogIn() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Phone') {
            iconName = 'call';
          } else if (route.name === 'Email') {
            iconName = 'mail';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffe4b5',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Phone" component={PhoneLogIn} />
      <Tab.Screen name="Email" component={EmailLogIn} />
    </Tab.Navigator>
  );
}
