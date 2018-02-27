import React from 'react';
import { StyleSheet, Text, View,NetInfo,Dimensions,Image,ImageBackground } from 'react-native';
import { Container,Item,Thumbnail,Card,Button } from 'native-base'
import {Stacks} from './src/Stack.js';
import Welcome from './src/Welcome.js'
var {height, width} = Dimensions.get('window');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }
  componentWillMount() {
    this.loadFonts();
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

     return (
       <Stacks/>
       );
 } }