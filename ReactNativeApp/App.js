import React from 'react';
import { StyleSheet, Text, View,NetInfo } from 'react-native';
import {Stacks} from './src/Stack.js';
import Welcome from './src/Welcome.js'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isConnected : true
    };
  }
  componentWillMount() {
    this.loadFonts();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  
 render() {
   if (!this.state.isReady) {
     return <Expo.AppLoading />;
   }
   if (!this.state.isConnected) {
    return <Welcome />;
  }
     return (
       <Stacks/>
       );
 }

}



