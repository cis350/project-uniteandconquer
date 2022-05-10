import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, Button,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import tagsList from '../data/tags.json';

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
    minHeight: 50,
    alignSelf: 'center',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
  },
  TagsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
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
  selectedTag: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    backgroundColor: '#FFAB2D',
    overflow: 'hidden',
    margin: 2,
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

function SettingInterests({ navigation, route }) {
  const { userId } = route.params;
  const [tags, setTags] = useState([]);

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
        showMessage({
          message: error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'updated successfully',
          type: 'success',
        });
      }
    });

    // Test error message
    showMessage({
      message: 'updated successfully',
      type: 'success',
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Update Interests
        </Text>
      </View>

      <View style={styles.TagAreaContainer}>
        <Text>Choose Your Interests</Text>
        <View style={styles.TagArea}>
          {tags.map((tag) => (
            <View key={tag}>
              <Text style={styles.selectedTag}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.TagsContainer}>
        {tagsList.map((tag) => (
          <Text
            key={tag.label}
            style={styles.tag}
            onPress={() => addTags(tag.label)}
          >
            {tag.label}
          </Text>
        ))}
      </View>

      <View style={styles.updateButton}>
        <Button title="Update" onPress={() => handleUpdate()} />
      </View>

      <View style={styles.backButtonContainer}>
        <View style={styles.button}>
          <Button
            title="Back to the setting page"
            onPress={() => navigation.navigate('SettingMain', {
              userId,
            })}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default SettingInterests;
