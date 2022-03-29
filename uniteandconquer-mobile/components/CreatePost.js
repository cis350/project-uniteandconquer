import React from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// styling ---------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    height: '100%',
    width: '100%',
  },
});

const userStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 10,
    zIndex: 1,
  },
  text: {
    textAlign: 'right',
  },
  icon: {
    alignSelf: 'flex-end',
  },
});

const createPostStyles = StyleSheet.create({
  container: {
    borderWidth: 8,
    borderColor: '#FFD9A0',
    height: '90%',
    zIndex: 0,
  },
  tags: {
    backgroundColor: '#FFCB7D',
    width: '35%',
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
    width: 235,
    marginBottom: 10,
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
    width: 100,
  },
  RightButton: {
    backgroundColor: '#C6C6C6',
    borderRadius: 6,
    padding: 3,
    marginLeft: 5,
    width: 100,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: -80,
  },
});

// app content --------

export default function CreatePost() {
  const [itemName, setItemName] = React.useState('');
  const [targetQuantity, setTargetQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [link, setLink] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={userStyles.container}>
          <Icon name="user" size={28} style={userStyles.icon} />
          <Text style={userStyles.text}>
            Hi, Jeremy
          </Text>
          <Text style={userStyles.text}>
            My Chats
          </Text>
          <Text style={userStyles.text}>
            Log Out
          </Text>
        </View>
        <Text style={createPostStyles.upperBox}>Create a Post</Text>
        <View style={createPostStyles.container}>
          <View style={createPostStyles.upper}>
            <View style={createPostStyles.tags}>
              <Text style={createPostStyles.tagsHeader}>Tags</Text>
              <View>
                <Text style={createPostStyles.tag}>Tag1</Text>
                <Text style={createPostStyles.tag}>Tag2</Text>
                <Text style={createPostStyles.tag}>Tag3</Text>
                <Text style={createPostStyles.tag}>Tag3</Text>
                <Text style={createPostStyles.tag}>Tag3</Text>
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
          <View>
            <View style={createPostStyles.buttons}>
              <View style={createPostStyles.LeftButton}><Button color="#000" title="Post" /></View>
              <View style={createPostStyles.RightButton}><Button color="#000" title="Cancel" /></View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
