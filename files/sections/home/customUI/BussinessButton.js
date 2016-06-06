import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class BussinessButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePath: null,
            title: null
        };
    }

    render() {
        console.log(parseFloat(this.props.index));
        var image;
        switch (parseFloat(this.props.index)) {
            case 0:
                image = (
                    <Image style={{width: 50,height: 50,borderRadius: 25}} source={require('../../../images/mainpage/bzfw.png')}/>
                );
                break;
            case 1:
                image = (
                    <Image style={{width: 50,height: 50,borderRadius: 25}} source={require('../../../images/mainpage/fssyw.png')}/>
                );
                break;
            case 2:
                image = (
                    <Image style={{width: 50,height: 50,borderRadius: 25}} source={require('../../../images/mainpage/ssyw.png')}/>
                );
                break;
            case 3:
                image = (
                    <Image style={{width: 50,height: 50,borderRadius: 25}} source={require('../../../images/mainpage/mfzx.png')}/>
                );
                break;
        }
        
        return (
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                    underlayColor="rgba(34,26,38,0.1)"
                    onPress={() => {
                         alert(1);
                     }}>
                    {image}
                </TouchableOpacity>
                <Text style={{marginTop:5}}>{this.props.title}</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({});
