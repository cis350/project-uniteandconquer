import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button, Modal,
} from 'react-native';

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

function UpdatePassword({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

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
        if (!success) {
          setMessage(error);
          setModalVisible(true);
        } else {
          setMessage('updated successfully');
          setModalVisible(true);
        }
      });
    } else {
      setMessage('Field can not to be empty');
      setModalVisible(true);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>
              <Button title="CLOSE" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

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