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
  buttonContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#FFD9A0',
    width: '80%',
  },
  titleContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  titleFont: {
    fontSize: 40,
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: '90%',
    width: '100%',
  },
});

function Setting({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>
          Setting
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Personal Information" onPress={() => navigation.navigate('UpdateInfo')} />
        </View>
        <View style={styles.button}>
          <Button title="Item Preference" onPress={() => navigation.navigate('SettingInterests')} />
        </View>
        <View style={styles.button}>
          <Button title="Password" onPress={() => navigation.navigate('UpdatePassword')} />
        </View>
      </View>

      <View style={styles.backButtonContainer}>
        <View style={styles.button}>
          <Button title="Back to the main page" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </ScrollView>
  );
}
export default Setting;
