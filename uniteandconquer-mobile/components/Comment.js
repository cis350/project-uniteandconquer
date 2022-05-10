import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button, Modal,
} from 'react-native';

const postDB = require('../modules/PostDB');

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
  },
});
function Comment({ route }) {
  const { userid, postid } = route.params;
  // const [tempID, setTempID] = useState(3);
  const [commentInput, setCommentInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [flag, setFlag] = useState(0);
  const [comments, setComments] = useState([]);
  /**
  * how to retrieve the user id is to be decided.
  */
  // const userid = 'TBD';

  /**
     * how to retrieve the user id is to be decided.
     */
  // const postid = 'TBD';

  useEffect(() => {
    postDB.getPost(postid, (success, details) => {
      if (success) {
        setComments(details.comments);
      }
    });
  }, [flag]);

  /**
   * add comment to the post db
   */
  const addComment = () => {
    if (commentInput && commentInput.length > 0) {
      postDB.addComment(userid, postid, (success, error) => {
        if (success) {
          setFlag(flag + 1);
        } else {
          setErrorMessage(error);
          setModalVisible(true);
        }
      });
    }
    setErrorMessage('input must not be empty');
    setModalVisible(true);
  };

  /** create an useInterval hook for looping fetch */
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
      return null;
    }, [delay]);
  }

  useInterval(() => {
    postDB.getPost(postid, (success, details) => {
      if (success) {
        setComments(details.comments);
      }
    });
  }, 5000);

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

      <View style={commentStyles.container}>
        <View style={commentStyles.addComment}>
          <TextInput placeholder="Enter your comment" value={commentInput} onChangeText={setCommentInput} />
          <Button title="Comment" onPress={addComment} />
        </View>
      </View>

      <View>
        {comments.map((comment) => (
          <View style={commentStyles.comment} key={comment.authorName}>
            <View>
              <View><Text style={commentStyles.commentName}>{comment.authorName}</Text></View>
              <View><Text style={commentStyles.commentContent}>{comment.content}</Text></View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default Comment;
