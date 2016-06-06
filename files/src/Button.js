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
    Image
} from 'react-native';

export default class Button extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        /*
         * 【-注意事项-】
         *  1、当Button没有设置onPress时,不会显示
        */
        this.state = {
            title: 'button',
            backgroundColor: null,
            color: 'black',
            width: 60,
            height: 30,
            borderRadius: 0,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            image: 'false',
            opacity: 1,
            fontJustify: 'center',  //字体对齐
            fontMarginTop: 0,
            fontMarginBottom: 0,
            fontMarginLeft: 0,
            fontMarginRight: 0,
            disabled: false
        };
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {
        var contents;   //按钮内容变量
        for (const  getKey in this.props) {
            for (const setKey in this.state) {
                if (getKey == setKey) {
                    //button属性赋值
                    if (typeof this.state[setKey] == "number")
                        this.state[setKey] = parseFloat(this.props[getKey])
                    else
                        this.state[setKey] = this.props[getKey];
                    //隐藏背景颜色
                    if (getKey == "backgroundColor" && this.props[getKey] == "null") {
                        this.state[setKey] = null;
                    }
                    //设置按钮为图片或文字
                    if (getKey == 'image' && this.props[getKey] == "true") {
                        this.state.title = null;
                        this.state.backgroundColor = null;
                        contents = (
                            <Image source={require('./images/return.png')} style={{height: 18,width: 18}} />
                        )
                    }else {
                        contents = (
                            <Text ref='buttonTitle' style={[{color:this.state.color},this.state.disabled && {}]}>
                                {this.state.title}
                            </Text>
                        )
                    }
                }
            }
        }

        if (this.props.onPress == null) {
            this.state.opacity = 0;
            this.state.disabled = true;
        }
        
        return (
            <View style={{opacity: this.state.opacity,flexDirection:'row',marginTop: this.state.marginTop,marginBottom: this.state.marginBottom,marginLeft: this.state.marginLeft,marginRight: this.state.marginRight,alignItems: 'center'}}>
                {/*--opacity: 0  隐藏控件--*/}
                <TouchableOpacity
                    style={[{height:this.state.height, width:this.state.width, borderRadius:this.state.borderRadius, backgroundColor:this.state.backgroundColor, justifyContent:'center',alignItems: this.state.fontJustify, overflow:'hidden'},this.state.disabled && styles.disable]}
                    disabled={this.state.disabled}
                    activeOpacity={0.5}
                    onPress={this.touchAction}>
                    <View style={{marginLeft: this.state.fontMarginLeft,marginRight:this.state.fontMarginRight, marginTop:this.state.fontMarginTop,marginBottom: this.state.fontMarginBottom}}>
                        {contents}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    touchAction = () => {
        if (this.props.onPress != null) {
            const {onPress} = this.props;
            onPress();
        }
    }

    enable = () => {
        this.setState({
            disabled: false
        });
    };

    disable = () => {
        this.setState({
            disabled: true
        });
        this.timer = setTimeout(() => {
            this.enable();
        }, 500);
    };

}

const styles = StyleSheet.create({
    disable: {
        //backgroundColor: 'rgba(34,26,38,0.1)',
    }
});

