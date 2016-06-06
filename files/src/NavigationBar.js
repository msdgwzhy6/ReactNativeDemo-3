/**
 * Created by zyj on 16/5/19.
 */
import React, {Component} from 'react';
import Button from './Button';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class NavigationBar extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            title: null,    //NavigationBar标题
            color: 'black',
            fontSize: 17,
            backgroundColor: '#F5FCFF',
            leftTitle: null,    //左按钮标题,标题为空时默认显示返回图标按钮
            rightTitle: 'title',    //右按钮标题
        }
    }

    render() {
        for (const getKey in this.props) {
            for (const setKey in this.state) {
                if (getKey == setKey && this.props[getKey] != null && this.props[getKey] != "") {
                    //属性赋值
                    if (typeof this.state[setKey] == "number")
                        this.state[setKey] = parseFloat(this.props[getKey])
                    else
                        this.state[setKey] = this.props[getKey];
                }
            }
        }

        //左按钮是图片还是文字
        var buttonType;
        if (this.state.leftTitle == null) {
            buttonType = "true";
        }else {
            buttonType = "false";
        }

        var leftButton;
        var rightButton;
        //根据NavigationBar是否使用leftButton/rightButton判断是否隐藏按钮操作
        if (this.props.leftButton != null) {
            leftButton = (
                <Button fontJustify='flex-start' width="70" fontMarginLeft="10" title={this.state.leftTitle} image={buttonType} onPress={() => {
                    const {leftButton} = this.props;
                    leftButton();
                }}/>
            )
        }else {
            leftButton = (
                <Button/>
            )
        }
        if (this.props.rightButton != null) {
            rightButton = (
                <Button fontJustify='flex-end' width="70" fontMarginRight="10" title={this.state.rightTitle} onPress={() =>{
                    const {rightButton} = this.props;
                    rightButton();
                }}/>
            );
        }else {
            rightButton = (
                <Button/>
            );
        }

        return (
            <View>
                <View style={{flexDirection: 'row',height: 63,justifyContent: 'space-between',alignItems: 'center'}}>
                    <View style={{marginTop: 15}}>
                        {leftButton}
                    </View>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: this.state.fontSize,color: this.state.color}}>{this.state.title}</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        {rightButton}
                    </View>
                </View>
                <View style={{height: 1,backgroundColor: '#EAEAEA'}}></View>
            </View>
        );
    }

/*--

     --*/
}

const styles = StyleSheet.create({
});

