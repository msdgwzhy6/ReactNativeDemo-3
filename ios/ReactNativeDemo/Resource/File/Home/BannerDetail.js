import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

class BannerDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
        url: this.props.url,
    };
  }

  render(){
    return (
      <WebView
        source = {{uri:this.state.url}}
        startInLoadingState = {true}
        onLoad = {() => this.test()}>
      </WebView>
    );
  }

  test() {
    this.props.valueFromBannerDetail("test,zyj!!!");
  }

}

const styles = StyleSheet.create({
});

module.exports = BannerDetail;
