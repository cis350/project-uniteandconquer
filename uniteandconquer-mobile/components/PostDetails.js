import {
  React, useState, useEffect,
} from 'react';
import {
  StyleSheet, View, ScrollView, Text, Button, TouchableOpacity, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { leaveGroup } from '../modules/PostDB';

const PostDB = require('../modules/PostDB');

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
    margin: 4,
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
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
    marginRight: 20,
  },
  groupUserQuantity: {
    fontSize: 20,
    marginRight: 20,
  },
  groupUserIcon: {
    marginRight: 20,
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
    bottom: -50,
    marginBottom: 100,
  },
  upperBox: {
    padding: 5,
    backgroundColor: '#FFD9A0',
    width: '40%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupUserContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});

// app content --------

export default function PostDetails({ navigation }) {
  // event handlers --------
  const [errorMessage, setErrorMessage] = useState(null);
  const [join, setJoin] = useState(false);
  const [members, setMembers] = useState([]);
  const [ownerID, setOwnerID] = useState('');
  const [quantity, setQuantity] = useState(0);
  // const [memberId, setMemberId] = useState('');
  const postId = '1';// need to be change.
  const userId = '5087901e810c109679e860ea';

  const leavePressed = () => {
    // const userId = ''; // dummy, need to get from session once log in routing is set up
    // const postId = ''; // dummy, need to get from current view
    leaveGroup(userId, postId, (success, err) => {
      setErrorMessage(err); // trigger re-rendering; will display err if err is not null
    });
    setJoin(false);
  };
  const handleJoin = () => {
    const userID = 'bababababa';
    const postID = 0;
    // const quantity = 2;
    PostDB.joinGroup(userID, postID, quantity, (success, err) => {
      if (success) {
        setJoin(true);
        PostDB.getPostMembers(postId, (success2, memberList, err2) => {
          if (success2) {
            setMembers(memberList);
          } else {
            console.log(err2);
          }
        });
      } else { setErrorMessage(err); }
    });
  };

  const handleJoinLeave = () => {
    if (join) {
      leavePressed();
    } else {
      handleJoin();
    }
  };

  useEffect(() => {
    PostDB.getPostMembers(postId, (success, memberList, err) => {
      if (success) {
        console.log(memberList);
        setMembers(memberList);
        if (memberList.some((e) => e.id === userId)) {
          setJoin(true);
        }
      } else {
        console.log(err);
      }
      PostDB.getOwner(postId, (success2, owner, err2) => {
        if (success2) {
          setOwnerID(owner);
        } else {
          console.log(err2);
        }
      });
    });
  }, []);
  const handleKick = (memberID) => {
    PostDB.kickMembers(memberID, postId, (success, err) => {
      if (success) {
        console.log(members.filter((item) => item.id !== memberID));
        setMembers(members.filter((item) => item.id !== memberID));
      } else {
        console.log(err);
      }
    });
  };
  function kickButton(memberID) {
    console.log(ownerID === userId);
    if (ownerID === userId && ownerID !== memberID) {
      return (
        <View style={postDetailStyles.LeftButton}>
          <Button color="#000" title="Kick" onPress={() => handleKick(memberID)} />
        </View>
      );
    }
    return null;
  }

  // views ---------

  return (
    <ScrollView style={styles.container}>
      <View style={userStyles.container}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon name="user" size={28} style={userStyles.icon} />
        </TouchableOpacity>
        <Text style={userStyles.text}>
          Hello, guest!
        </Text>
        <Text style={userStyles.button}>
          <Button
            color="#000"
            title="My Chats"
          />
        </Text>
        <Text style={userStyles.button}>
          <Button
            color="#000"
            title="Log In"
            onPress={() => navigation.navigate('LogIn')}
          />
        </Text>
      </View>
      {errorMessage && (
        <Text>{errorMessage}</Text>
      )}
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
          <Text style={postDetailStyles.details}>
            Group size:
            {' '}
            { members.length}
          </Text>
          <View>
            <View style={postDetailStyles.groupUser}>
              <View>
                {members.map((item) => (
                  <View key={item.name} style={postDetailStyles.groupUserContent}>
                    <View>
                      <Icon
                        style={postDetailStyles.groupUserIcon}
                        name="user"
                        size={40}
                      />
                    </View>
                    <View>
                      <Text
                        style={postDetailStyles.groupUserName}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={postDetailStyles.groupUserQuantity}
                      >
                        Quantity:
                        {' '}
                        {item.quantity}
                      </Text>
                    </View>
                    {kickButton(item.id)}
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View>
            <TextInput
              placeholder="quantity"
              onChangeText={setQuantity}
              value={quantity}
            />
            <View style={postDetailStyles.buttons}>
              <View style={postDetailStyles.LeftButton}><Button color="#000" title={join ? 'Leave' : 'Join'} onPress={handleJoinLeave} /></View>
              <View style={postDetailStyles.LeftButton}><Button color="#000" title="Comment" onPress={() => navigation.navigate('Comment')} /></View>
              <View style={postDetailStyles.RightButton}><Button color="#000" title="Back" onPress={() => navigation.navigate('Home')} /></View>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
