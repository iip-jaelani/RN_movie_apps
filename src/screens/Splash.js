/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export class Splash extends Component {
  componentDidMount() {
    //
    this.promiseTes();
  }
  promiseTes() {
    setTimeout(() => {
      this.props.navigation.navigate('RecommendMovie');
    }, 1000);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Nonton-Kuy
        </Text>
        <ActivityIndicator color="red" />
      </View>
    );
  }
}

export default Splash;
