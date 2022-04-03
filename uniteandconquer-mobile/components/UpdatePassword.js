import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button,
} from 'react-native';

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
    marginTop: '20%',
  },
  subtitle: {
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
    marginTop: '40%',
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
});

function UpdatePassword({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();

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
   * change the user's password to a new one, only if
   * the user's old password matches
   */
  function handleUpdate() {
    if (checkValidInput(newPassword) && checkValidInput(currentPassword)) {
      userDB.modifyUser(userid, 2, newPassword, currentPassword, (success, error) => {
        console.log(error);
      });
    } else {
      console.log('Field can not to be empty');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Change Password
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.subtitle}>
          <Text>Current Password</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Current Password"
            onChangeText={setCurrentPassword}
            value={currentPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.subtitle}>
          <Text>New Password</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="New Password"
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry
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

export default UpdatePassword;
