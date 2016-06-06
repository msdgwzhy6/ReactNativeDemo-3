
import React, {Component} from 'react';
import Button from '../../src/Button';
import Swiper from 'react-native-swiper';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
} from 'react-native';

export default class Personal extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text>第一块</Text>
                </View>
                <View style={styles.view2}>
                    <Text>第二块</Text>
                </View>
                <View style={styles.view3}>
                    <Text>第3块</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: 'red',
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',  //水平居中
        alignItems: 'center',    //垂直居中
        flexDirection: 'row',   //主轴方向
        flexWrap: 'nowrap',   //伸缩容器在主轴方向空间不足的情况下,是否换行及如何换行
    
    },
    view1: {
        backgroundColor: 'red',
        height: 80,
        width: 80,
    },
    view2: {
        backgroundColor: 'blue',
        height: 80,
        width: 80,
    },
    view3: {
        backgroundColor: 'gray',
        height: 80,
        width: 80,
    },

});
