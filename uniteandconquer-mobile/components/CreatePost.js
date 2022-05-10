import React from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button, Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tagsList from '../data/tags.json';

const postDB = require('../modules/PostDB');

// styling ---------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    height: '100%',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

const userStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'right',
    margin: 4,
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
  },
});

const createPostStyles = StyleSheet.create({
  container: {
    borderWidth: 8,
    borderColor: '#FFD9A0',
    height: '90%',
  },
  tags: {
    backgroundColor: '#FFCB7D',
    width: '50%',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  groupHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  tagsHeader: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tag: {
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 15,
    padding: 3,
    backgroundColor: '#FFAB2D',
    overflow: 'hidden',
    margin: 4,
    textAlign: 'center',
    fontSize: 15,
  },
  details: {
    marginBottom: 15,
    marginTop: 7,
    fontSize: 15,
  },
  groupDetailsContainer: {
    marginLeft: 8,
  },
  upperBox: {
    padding: 5,
    backgroundColor: '#FFD9A0',
    width: '40%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  field: {
    backgroundColor: '#FFD9A0',
    padding: 5,
    width: 170,
    marginBottom: 50,
    height: 40,
  },
  description: {
    backgroundColor: '#FFD9A0',
    padding: 5,
    width: 350,
    height: 80,
    alignSelf: 'center',
  },
  fieldName: {
    marginLeft: 24,
  },
  LeftButton: {
    backgroundColor: '#FFCB7D',
    borderRadius: 6,
    padding: 3,
    marginRight: 5,
  },
  RightButton: {
    backgroundColor: '#C6C6C6',
    borderRadius: 6,
    padding: 3,
    marginLeft: 5,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: -45,
    marginBottom: 100,
  },
  tagsContainer: {
    marginTop: 10,
  },
  tagsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

// app content --------

export default function CreatePost({ navigation, route }) {
  const {
    userName, userId,
  } = route.params;
  const [itemName, setItemName] = React.useState('');
  const [targetQuantity, setTargetQuantity] = React.useState('');
  const [currentQuantity, setCurrentQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [link, setLink] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  function addTags(tag) {
    if (tags.includes(tag)) {
      const newList = tags.filter((item) => item !== tag);
      setTags(newList);
    } else {
      setTags((arr) => [...arr, tag]);
    }
  }

  /**
   * This function is used to check all the input fields are valid.
   * Return true, if itemName, link, description, price, targetQuality are not null or empty
   * False otherwise.
   *
   * Note that we will allow empty tags array to be added to database.
   */
  function checkValidInput() {
    const isValidItemName = itemName !== null && itemName.trim().length >= 1;
    const isValidlink = link !== null && link.trim().length >= 1;
    const isValidDiscription = description !== null && description.trim().length >= 1;
    const isValidPrice = price !== null && price.trim().length >= 1;
    const isValidTagetQuantity = targetQuantity !== null && targetQuantity.trim().length >= 1;
    const isValidCurrentQuantity = currentQuantity !== null && currentQuantity.trim().length >= 1;
    return isValidDiscription
            && isValidlink
            && isValidItemName
            && isValidPrice
            && isValidTagetQuantity
            && isValidCurrentQuantity;
  }

  function handlePost() {
    console.log(
      itemName,
      targetQuantity,
      currentQuantity,
      price,
      link,
      description,
      userId,
      tags,
      userName,
    );
    if (checkValidInput()) {
      postDB.addPost(
        itemName,
        targetQuantity,
        currentQuantity,
        price,
        link,
        description,
        userId,
        tags,
        (success, id, error) => {
          console.log(success, id);
          if (success) {
            navigation.navigate('PostDetails', {
              userName, userId, postId: id,
            });
          } else {
            setErrorMessage(error);
            setModalVisible(true);
          }
        },
      );
    } else {
      setErrorMessage('input must not be empty');
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
              <Text style={styles.modalText}>{errorMessage}</Text>
              <Button title="CLOSE" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <View style={userStyles.container}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={() => navigation.navigate('UserProfile', {
              userId,
            })}
          >
            <Icon name="user" size={28} style={userStyles.icon} />
          </TouchableOpacity>
          <Text style={userStyles.text}>
            {userId ? (
              <Text>
                Hello,
                {` ${userName}`}
                !
              </Text>
            ) : <Text>Hello, guest!</Text>}
          </Text>
          <Text style={userStyles.button}>
            <Button
              color="#000"
              title="My Chats"
            />
          </Text>
        </View>
        <Text style={createPostStyles.upperBox}>Create a Post</Text>
        <View style={createPostStyles.container}>
          <View style={createPostStyles.upper}>
            <View style={createPostStyles.tags}>
              <Text style={createPostStyles.tagsHeader}>Tags</Text>
              <View style={createPostStyles.tagsBox}>
                {tagsList.map((tag) => (
                  <Text
                    key={tag.label}
                    style={createPostStyles.tag}
                    onPress={() => addTags(tag.label)}
                  >
                    {tag.label}
                  </Text>
                ))}
              </View>
            </View>
            <View style={{ flexShrink: 1 }}>
              <View>
                <Text style={{ marginTop: 10 }}>Item Name</Text>
                <TextInput
                  style={createPostStyles.field}
                  placeholder="item name"
                  onChangeText={setItemName}
                  value={itemName}
                />
                <Text>Target Quantity</Text>
                <TextInput
                  style={createPostStyles.field}
                  placeholder="target quantity #"
                  onChangeText={setTargetQuantity}
                  value={targetQuantity}
                />

                <Text>Price/Item</Text>
                <TextInput
                  style={createPostStyles.field}
                  placeholder="price/item #"
                  onChangeText={setPrice}
                  value={price}
                />
                <Text>Item Link</Text>
                <TextInput
                  style={createPostStyles.field}
                  placeholder="url for item"
                  onChangeText={setLink}
                  value={link}
                />
                <Text>Current Quantity</Text>
                <TextInput
                  style={createPostStyles.field}
                  placeholder="current quantity"
                  onChangeText={setCurrentQuantity}
                  value={currentQuantity}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={createPostStyles.fieldName}>Description</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={createPostStyles.description}
              placeholder="description..."
              onChangeText={setDescription}
              value={description}
            />
          </View>
          <View style={createPostStyles.tagsContainer}>
            <Text style={createPostStyles.fieldName}>Tags</Text>
            <View style={createPostStyles.description}>
              <Text>
                {tags.join(' ')}
              </Text>
            </View>
          </View>
          <View>
            <View style={createPostStyles.buttons}>
              <View style={createPostStyles.LeftButton}><Button color="#000" title="Post" onPress={() => handlePost()} /></View>
              <View style={createPostStyles.RightButton}><Button color="#000" title="Cancel" onPress={() => navigation.navigate('Home')} /></View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
