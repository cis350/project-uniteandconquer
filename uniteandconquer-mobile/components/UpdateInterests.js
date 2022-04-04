import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, Button, Modal,
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
  TagAreaContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  TagArea: {
    backgroundColor: '#FFD9A0',
    width: '80%',
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  TagsContainer: {
    alignItems: 'center',
  },
  tagRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tag: {
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    padding: 7,
    backgroundColor: '#FFAB2D',
    overflow: 'hidden',
    margin: 4,
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: '15%',
    width: '100%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
  },
  updateButton: {
    backgroundColor: '#FFD9A0',
    borderRadius: 100,
    padding: 3,
    width: '30%',
    marginLeft: '60%',
    marginTop: '10%',
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

function SettingInterests({ navigation }) {
  const [tags, setTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function addTags(tag) {
    if (tags.includes(tag)) {
      const newList = tags.filter((item) => item !== tag);
      setTags(newList);
    } else {
      setTags((arr) => [...arr, tag]);
    }
  }
  /**
  * how to retrieve the user id is to be decided.
  */
  const userid = 'TBD';

  /**
   * update the interests list of the user
   * I assume that the user can add an empty array to the database.
   */
  function handleUpdate() {
    userDB.modifyUser(userid, 5, tags, null, (success, error) => {
      if (!success) {
        setErrorMessage(error);
        setModalVisible(true);
      }
    });

    // Test error message
    setErrorMessage('error');
    setModalVisible(true);
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
              <Text style={styles.modalText}>{errorMessage}</Text>
              <Button title="CLOSE" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Update Interests
        </Text>
      </View>

      <View style={styles.TagAreaContainer}>
        <Text>Choose Your Interests</Text>
        <View style={styles.TagArea}>
          <Text>
            {tags.join(' ')}
          </Text>
        </View>
      </View>

      <View style={styles.TagsContainer}>
        <View style={styles.tagRow}>
          <Text style={styles.tag} onPress={() => addTags('Tag1')}>Tag1</Text>
          <Text style={styles.tag} onPress={() => addTags('Tag2')}>Tag2</Text>
        </View>
        <View style={styles.tagRow}>
          <Text style={styles.tag} onPress={() => addTags('Tag3')}>Tag3</Text>
          <Text style={styles.tag} onPress={() => addTags('Tag4')}>Tag4</Text>
        </View>
        <View style={styles.tagRow}>
          <Text style={styles.tag} onPress={() => addTags('Tag5')}>Tag5</Text>
          <Text style={styles.tag} onPress={() => addTags('Tag6')}>Tag6</Text>
        </View>
      </View>

      <View style={styles.updateButton}>
        <Button title="Update" onPress={() => handleUpdate()} />
      </View>

      <View style={styles.backButtonContainer}>
        <View style={styles.button}>
          <Button title="Back to the main page" onPress={() => navigation.navigate('SettingMain')} />
        </View>
      </View>
    </ScrollView>
  );
}

export default SettingInterests;
