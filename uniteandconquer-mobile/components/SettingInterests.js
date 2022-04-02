import React from 'react';
import {
  StyleSheet, View, ScrollView, Text, Button,
} from 'react-native';

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
    marginTop: '35%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
  },
});

function SettingInterests({ navigation }) {
  const [tags, setTags] = React.useState([]);

  function addTags(tag) {
    if (tags.includes(tag)) {
      const newList = tags.filter((item) => item !== tag);
      setTags(newList);
    } else {
      setTags((arr) => [...arr, tag]);
      console.log('adding tag... and current tags are:', tags);
    }
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
          <Text>
            {tags}
          </Text>
        </View>
      </View>

      <View style={styles.TagsContainer}>
        <View style={styles.tagRow}>
          <Text style={styles.tag} onPress={() => addTags('Tag1 ')}>Tag1</Text>
          <Text style={styles.tag} onPress={() => addTags('Tag2 ')}>Tag2</Text>
        </View>
        <View style={styles.tagRow}>
          <Text style={styles.tag} onPress={() => addTags('Tag3 ')}>Tag3</Text>
          <Text style={styles.tag} onPress={() => addTags('Tag4 ')}>Tag4</Text>
        </View>
        <View style={styles.tagRow}>
          <Text style={styles.tag} onPress={() => addTags('Tag5 ')}>Tag5</Text>
          <Text style={styles.tag} onPress={() => addTags('Tag6 ')}>Tag6</Text>
        </View>
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
