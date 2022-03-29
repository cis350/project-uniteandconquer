import React, { useState } from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAE9C7',
    height: '100%',
    width: '100%',
  },
});
const commentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',

  },
  addComment: {
    padding: 10,
    backgroundColor: '#FFD9A0',
    marginBottom: 15,
    width: 380,
  },
  commentName: {
    fontWeight: 'bold',
  },
  commentContent: {

  },
  comment: {
    backgroundColor: '#ffd9a0',
    borderRadius: 20,
    padding: 10,
    // shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    // borderRadius: 5,
    // padding: '5px',
    // marginTop: '15px',
    // width: '350px',
  },
});
function Comment() {
  const [tempID, setTempID] = useState(3);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'user1', content: 'I loved using this item' },
    { id: 2, name: 'user2', content: 'I wonder if I will need this' },
  ]);

  const addComment = () => {
    if (commentInput && commentInput.length > 0) {
      const newComment = { id: tempID, name: `user${3}`, content: commentInput };
      setComments([...comments, newComment]);
      setTempID(tempID + 1);
      setCommentInput('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={commentStyles.container}>
        <View style={commentStyles.addComment}>
          <TextInput placeholder="Enter your comment" value={commentInput} onChangeText={setCommentInput} />
          <Button title="Comment" onPress={addComment} />
        </View>
      </View>

      <View>
        {comments.map((comment) => (
          <View style={commentStyles.comment}>
            <View>
              <View><Text style={commentStyles.commentName}>{comment.name}</Text></View>
              <View><Text style={commentStyles.commentContent}>{comment.content}</Text></View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default Comment;
