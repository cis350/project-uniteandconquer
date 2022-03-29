import { React, useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostDB = require('../../uniteandconquer/src/modules/PostDB');

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
  },
  text: {
    textAlign: 'right',
  },
  icon: {
    alignSelf: 'flex-end',
  },
});

const postDetailStyles = StyleSheet.create({
  container: {
    borderWidth: 8,
    borderColor: '#FFD9A0',
    height: '90%',
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
  groupUser: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    width: '40%',
  },
  groupUserName: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 22,
    marginLeft: 20,
  },
  groupUserQuantity: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 22,
    marginLeft: 20,
  },
  groupUserIcon: {
    marginBottom: 10,
    marginRight: 10,
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
    bottom: -50,
  },
  upperBox: {
    padding: 5,
    backgroundColor: '#FFD9A0',
    width: '40%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// app content --------

export default function PostDetails() {
  const [join, setJoin] = useState(false);
  function handleJoin() {
    const userID = 'bababababa';
    const postID = 0;
    const quantity = 2;
    PostDB.joinGroup(userID, postID, quantity, (success, err) => {
      if (success) {
        setJoin(true);
        // navigate(`/post-details${postID}`);
      } else {
        console.log(err);
      }
    });
  }
  return (
    <ScrollView style={styles.container}>
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
      <Text style={postDetailStyles.upperBox}>Item Name</Text>
      <View style={postDetailStyles.container}>
        <View style={postDetailStyles.upper}>
          <View style={postDetailStyles.tags}>
            <Text style={postDetailStyles.tagsHeader}>Tags</Text>
            <View>
              <Text style={postDetailStyles.tag}>Tag1</Text>
              <Text style={postDetailStyles.tag}>Tag2</Text>
              <Text style={postDetailStyles.tag}>Tag3</Text>
              <Text style={postDetailStyles.tag}>Tag3</Text>
              <Text style={postDetailStyles.tag}>Tag3</Text>
            </View>
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={postDetailStyles.detailsHeader}>Item Details</Text>
            <View>
              <Text style={postDetailStyles.details}>Target Quantity: 4/5</Text>
              <Text style={postDetailStyles.details}>Price/Item: $10.00</Text>
              <Text style={postDetailStyles.details}>Item Link example.com/item</Text>
              <Text style={postDetailStyles.details}>
                Description: Beautiful fairy lights to use for your dorm
              </Text>
            </View>
          </View>
        </View>
        <View style={postDetailStyles.groupDetailsContainer}>
          <Text style={postDetailStyles.groupHeader}>Group Details</Text>
          <Text style={postDetailStyles.details}>Group size: 2</Text>
          <View>
            <View style={postDetailStyles.groupUser}>
              <View style={postDetailStyles.list}>
                {[
                  { key: 'Alice' },
                  { key: 'Bob' },
                  { key: 'Dan' },
                ].map(() => (
                  <View>
                    <Icon
                      style={postDetailStyles.groupUserIcon}
                      name="user"
                      size={40}
                    />
                  </View>
                ))}
              </View>
              <View>
                {[
                  { key: 'Alice' },
                  { key: 'Bob' },
                  { key: 'Dan' },
                ].map((item) => (
                  <View>
                    <Text
                      style={postDetailStyles.groupUserName}
                    >
                      {item.key}
                    </Text>
                  </View>
                ))}
              </View>
              <View>
                {[
                  { key: 5 },
                  { key: 3 },
                  { key: 4 },
                ].map((item) => (
                  <View>
                    <Text
                      style={postDetailStyles.groupUserQuantity}
                    >
                      Quantity:
                      {' '}
                      {item.key}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View>
            <View style={postDetailStyles.buttons}>
              <View style={postDetailStyles.LeftButton}><Button color="#000" title={join ? 'Delete' : 'Join'} onPress={() => handleJoin()} /></View>
              <View style={postDetailStyles.RightButton}><Button color="#000" title="Back" /></View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
