
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Personal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
           Personal
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   description: {
        fontSize: 20,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = Personal;
