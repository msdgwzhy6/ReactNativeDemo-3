import React, {Component} from 'react';
import NavigationBar from '../../src/NavigationBar';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';

export default class BannerDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: this.props.title
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    title={this.state.title}
                    leftButton={() =>{
                        this.props.navigator.pop();
                    }}/>
                <WebView
                    source={{uri:this.state.url}}
                    startInLoadingState={true}>
                    {/*onLoad={() => this.test()}*/}
                </WebView>
            </View>
        );
    }

    test() {
        this.props.valueFromBannerDetail("test,zyj!!!");
    }

}

const styles = StyleSheet.create({});
