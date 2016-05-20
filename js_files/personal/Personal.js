
import React, {Component} from 'react';
import Button from '../src/Button';

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
                <View style={styles.view1}></View>
                <View style={styles.view2}></View>
                < Button
                    ref='button'       //ref相当于HTML中的id,标记和引用组件
                    title="hah"
                    width="50"
                    height="50"
                    color="black"
                    backgroundColor="pink"
                    borderRadius="25"
                    onPress={this.fetchData}/>
            </View>
        );
    }

    fetchData = (enableCallBack) => {
        this.timer = setTimeout(() => {
            enableCallBack();
        },3000);
    }
}

const styles = StyleSheet.create({
    container: {
        height: 600,
        marginTop: 20,
        marginBottom: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    view1: {
        backgroundColor: 'red',
        height: 80,
        width: 50,
    },
    view2: {
        backgroundColor: 'blue',
        marginLeft: 10,
        height: 80,
        width: 50,
    },
    view3: {
        backgroundColor: 'black',
        marginLeft: 10,
        height: 80,
        width: 80,
    },
    view4: {
        backgroundColor: 'green',
        marginLeft: 10,
        height: 80,
        width: 100,
    },

});

module.exports = Personal;
