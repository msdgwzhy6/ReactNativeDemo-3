/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Root from './files/sections/Root'

import {
    AppRegistry,
} from 'react-native';

class ReactNativeDemo extends Component {
  render() {
    return (
        <Root/>
    );
  }
}


AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
