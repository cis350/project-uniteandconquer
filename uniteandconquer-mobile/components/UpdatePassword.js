import React from 'react';
import {
  StyleSheet, View, ScrollView, Text, TextInput, Button,
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
  inputContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  subtitle: {
    marginLeft: '-50%',
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
    padding: 10,
  },
  updateButton: {
    backgroundColor: '#FFD9A0',
    borderRadius: 100,
    padding: 3,
    marginLeft: '60%',
    marginTop: '40%',
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: '25%',
    width: '100%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
  },
});

function UpdatePassword({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Change Password
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.subtitle}>
          <Text>Current Password</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="Current Password" />
        </View>

        <View style={styles.subtitle}>
          <Text>New Password</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="New Password" />
        </View>

        <View style={styles.updateButton}>
          <Button title="Update" />
        </View>

        <View style={styles.backButtonContainer}>
          <View style={styles.button}>
            <Button title="Back to the main page" onPress={() => navigation.navigate('SettingMain')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UpdatePassword;
