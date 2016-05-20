/**
 * Created by zyj on 16/5/19.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class Button extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            title: 'button',
            backgroundColor: 'white',
            color: 'black',
            width: 60,
            height: 30,
            borderRadius: 0,
            disabled: false
        };
    }

    render() {
        //button属性赋值
        for (const  getKey in this.props) {
            for (const setKey in this.state) {
                if (getKey == setKey && this.props[getKey] != null) {
                    if (typeof this.state[setKey] == "number")
                        this.state[setKey] = parseFloat(this.props[getKey])
                    else
                        this.state[setKey] = this.props[getKey];
                }
            }
        }

        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                    style={[{height:this.state.height, width:this.state.width, borderRadius:this.state.borderRadius, backgroundColor:this.state.backgroundColor, justifyContent:'center', overflow:'hidden',alignItems: 'center'},this.state.disabled && styles.disable]}
                    disabled={this.state.disabled}
                    activeOpacity={1}
                    onPress={this.touchAction}>
                    <Text style={[{color:this.state.color},this.state.disabled && {color:'white'}]}>{this.state.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    touchAction = () => {
        const {onPress} = this.props;
        this.disable();
        onPress(this.enable);
    };

    enable = () => {
        this.setState({
            disabled: false
        });
    };

    disable = () => {
        this.setState({
            disabled: true
        });
    };

}

const styles = StyleSheet.create({
    disable: {
        backgroundColor: 'gray',
    }
});

