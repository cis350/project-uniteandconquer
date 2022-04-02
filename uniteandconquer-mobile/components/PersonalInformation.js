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
    marginTop: '10%',
  },
  subtitle: {
    marginLeft: '-60%',
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
    marginTop: '20%',
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: '25%',
    width: '80%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
  },
});

function UpdateInfo({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Personal Information
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.subtitle}>
          <Text>Username</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="Username" />
        </View>

        <View style={styles.subtitle}>
          <Text>Full Name</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="Full Name" />
        </View>

        <View style={styles.subtitle}>
          <Text>Phone</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="Phone" />
        </View>

        <View style={styles.subtitle}>
          <Text>Email</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="Email" />
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

export default UpdateInfo;
