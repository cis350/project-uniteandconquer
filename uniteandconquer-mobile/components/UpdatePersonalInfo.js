import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const userDB = require('../modules/UserDB');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  titleFont: {
    fontSize: 40,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  subtitle: {
    // marginLeft: '-60%',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
    padding: 10,
  },
  updateButton: {
    backgroundColor: '#FFD9A0',
    borderRadius: 100,
    padding: 3,
    marginLeft: '60%',
    marginTop: '20%',
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: '25%',
    width: '100%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
  },
  dropdownButton: {
    width: '20%',
    height: 37,
    backgroundColor: '#e9967a',
  },
  phone: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '58%',
    marginLeft: '2%',
    padding: 10,
  },
});

function UpdateInfo({ navigation }) {
  // const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const countryCodeList = ['+1', '+86'];

  /**
   * how to retrieve the user id is to be decided.
   */
  const userid = 'TBD';
  /**
   *
   * @param {*} input the input could be one of the user input information
   * @returns true if the input is not initialized or is empty
   */
  function checkValidInput(input) {
    return (input != null && input.trim().length >= 1);
  }

  /**
   * update the personal information if the input is valid
   */
  function handleUpdate() {
    // Update first name
    if (checkValidInput(firstName)) {
      userDB.modifyUser(userid, 3, firstName, null, (success, error) => {
        console.log(error);
      });
    }
    // Update last name
    if (checkValidInput(lastName)) {
      userDB.modifyUser(userid, 4, lastName, null, (success, error) => {
        console.log(error);
      });
    }
    // Update phone
    if (checkValidInput(phone) && checkValidInput(countryCode)) {
      const newValue = { countryCode, phone };
      userDB.modifyUser(userid, 0, newValue, null, (success, error) => {
        console.log(error);
      });
    }

    // Update phone
    if (checkValidInput(email)) {
      userDB.modifyUser(userid, 1, email, null, (success, error) => {
        console.log(error);
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Personal Information
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {/* <View style={styles.subtitle}>
          <Text>Username</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
        </View> */}

        <View style={styles.subtitle}>
          <Text>First Name</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="First Name"
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>

        <View style={styles.subtitle}>
          <Text>Last Name</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Last Name"
            onChangeText={setLastName}
            value={lastName}
          />
        </View>

        <View style={styles.subtitle}>
          <Text>Phone</Text>
        </View>

        <View style={{ flex: 1, alignContent: 'space-between', flexDirection: 'row' }}>
          <SelectDropdown
            data={countryCodeList}
            defaultButtonText="code"
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={{ fontSize: 18 }}
            onSelect={(selectedItem) => {
              setCountryCode(selectedItem);
            }}
          />
          <View style={styles.phone}>
            <TextInput
              placeholder="Phone"
              onChangeText={setPhone}
              value={phone}
            />
          </View>
        </View>

        <View style={styles.subtitle}>
          <Text>Email</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.updateButton}>
          <Button title="Update" onPress={() => handleUpdate()} />
        </View>

        <View style={styles.backButtonContainer}>
          <View style={styles.button}>
            <Button title="Back to the main page" onPress={() => navigation.navigate('SettingMain')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UpdateInfo;
