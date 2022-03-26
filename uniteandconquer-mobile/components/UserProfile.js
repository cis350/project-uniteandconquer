import React from 'react';
import {
  StyleSheet, View, Button, Text,
} from 'react-native';

// styling ---------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const userStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  button: {
    padding: 0,
    backgroundColor: '#FFD9A0',
  },
});

const postStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFD9A0',
    marginBottom: 15,
    width: 380,
  },
  header: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const tagStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFD9A0',
    marginBottom: 15,
    width: 380,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 19,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    margin: 10,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

const postsContentStyles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 120,
  },
});

const titleStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  position: {
    position: 'absolute',
    top: 50,
  },
  subtitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontStyle: 'italic',
  },
});

const headerButtonStyles = StyleSheet.create({
  container: {
    marginTop: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 25,
  },
  left: {
    backgroundColor: '#FFD9A0',
    height: 35,
    width: 150,
    marginRight: 35,
  },
  right: {
    backgroundColor: '#FFD9A0',
    height: 35,
    width: 150,
    marginLeft: 35,
  },
});

// app content --------

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <View style={userStyles.container}>
        <Text>
          Hi, Jeremy
        </Text>
        <Text>
          My Chats
        </Text>
        <Text>
          Log Out
        </Text>
      </View>
      <View style={titleStyles.position}>
        <Text style={titleStyles.container}>My Profile</Text>
      </View>
      <View style={headerButtonStyles.container}>
        <View style={headerButtonStyles.left}><Button color="#000" title="Settings" /></View>
        <View style={headerButtonStyles.right}><Button color="#000" title="Main Page" /></View>
      </View>
      <View style={postsContentStyles.container}>
        <View>
          <Text style={titleStyles.subtitle}>My Owned Posts</Text>
          <View style={postStyles.container}>
            <Text style={postStyles.header}>This is a Post</Text>
            <Text>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
          <View style={postStyles.container}>
            <Text style={postStyles.header}>This is a Post</Text>
            <Text>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
        </View>
        <View>
          <Text style={titleStyles.subtitle}>My Joined Posts</Text>
          <View style={postStyles.container}>
            <Text style={postStyles.header}>This is a Post</Text>
            <Text>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
          <View style={postStyles.container}>
            <Text style={postStyles.header}>This is a Post</Text>
            <Text>
              This post is led by Jeremy and trades [ITEM] for $[VALUE] with
              maturity [DATE]
            </Text>
          </View>
        </View>
      </View>
      <View style={tagStyles.container}>
        <Text style={tagStyles.header}>My Interests</Text>
        <View style={tagStyles.tags}>
          <Text style={tagStyles.tag}>tag</Text>
          <Text style={tagStyles.tag}>tag</Text>
        </View>
      </View>
    </View>
  );
}
