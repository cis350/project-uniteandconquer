import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { showMessage } from 'react-native-flash-message';

const userDB = require('../modules/UserDB');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    marginTop: '5%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

function UpdateInfo({ navigation }) {
  // const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const countryCodeList = ['1', '86'];

  /**
   * how to retrieve the user id is to be decided.
   */
  const userid = 'TBD';

  /**
   * Fetch the user information from the user DB and store
   * the user information into an object - userInfo
   */
  let userInfo;
  userDB.getUserDetails(userid, (success, user) => {
    if (success) {
      userInfo = user;
    }
  });

  /**
   *
   * @param {*} input the input could be one of the user input information
   * @returns true if the input is not initialized or is empty
   */
  function checkValidInput(input, currentValue) {
    const isEmpty = (input != null && input.trim().length >= 1);
    const isChanged = input !== currentValue;
    return isEmpty && isChanged;
  }

  /**
   *
   * check whether the email has a good format
   */
  function checkValidEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /**
   * check whether the phone number contains only digits.
   */

  function checkPhone() {
    return /^\d+$/.test(phone);
  }

  /**
   * update the personal information if the input is valid
   */
  function handleUpdate() {
    let isChanged = false;
    let isSuccess = true;
    // Update first name
    if (checkValidInput(firstName, userInfo.firstName)) {
      userDB.modifyUser(userid, 3, firstName, null, (success, error) => {
        if (!success) {
          showMessage({
            message: error,
            type: 'danger',
          });
          isSuccess = false;
        } else {
          isChanged = true;
        }
      });
    }
    // Update last name
    if (checkValidInput(lastName, userInfo.lastName)) {
      userDB.modifyUser(userid, 4, lastName, null, (success, error) => {
        if (!success) {
          showMessage({
            message: error,
            type: 'danger',
          });
          isSuccess = false;
        } else {
          isChanged = true;
        }
      });
    }
    // Update phone
    if (checkValidInput(phone, userInfo.phone.phoneNumber)
      || checkValidInput(countryCode, userInfo.phone.countryCode)) {
      if (checkPhone()) {
        const newValue = { countryCode, phone };
        userDB.modifyUser(userid, 0, newValue, null, (success, error) => {
          if (!success) {
            showMessage({
              message: error,
              type: 'danger',
            });
            isSuccess = false;
          } else {
            isChanged = true;
          }
        });
      } else {
        showMessage({
          message: 'Phone number can only contain digits',
          type: 'danger',
        });
        isSuccess = false;
      }
    }

    // Update email
    if (checkValidInput(email, userInfo.email)) {
      if (checkValidEmail()) {
        userDB.modifyUser(userid, 1, email, null, (success, error) => {
          if (!success) {
            showMessage({
              message: error,
              type: 'danger',
            });
            isSuccess = false;
          } else {
            isChanged = true;
          }
        });
      } else {
        showMessage({
          message: 'Your email address is not valid',
          type: 'danger',
        });
        isSuccess = false;
      }
    }

    // // test set error message
    if (isChanged && isSuccess) {
      showMessage({
        message: 'updated successfully',
        type: 'success',
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
            placeholder={userInfo.firstName}
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>

        <View style={styles.subtitle}>
          <Text>Last Name</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder={userInfo.lastName}
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
            defaultButtonText={userInfo.phone.countryCode}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={{ fontSize: 18 }}
            onSelect={(selectedItem) => {
              setCountryCode(selectedItem);
            }}
          />
          <View style={styles.phone}>
            <TextInput
              placeholder={userInfo.phone.phoneNumber}
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
            placeholder={userInfo.email}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.updateButton}>
          <Button title="Update" onPress={() => handleUpdate()} />
        </View>

        <View style={styles.backButtonContainer}>
          <View style={styles.button}>
            <Button title="Back to the setting page" onPress={() => navigation.navigate('SettingMain')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UpdateInfo;
