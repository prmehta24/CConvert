
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import Login from './Login.js';
import SignUp from './SignUp.js';
import ChatBox from './ChatBox.js';


export const Stacks = StackNavigator({
    Login: { screen: Login},
    SignUp: { screen: SignUp},
    ChatBox: {screen: ChatBox},
  });

