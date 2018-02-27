
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import Login from './Login.js';
import SignUp from './SignUp.js';
import ChatBox from './ChatBox.js';
import Welcome from './Welcome.js'

export const Stacks = StackNavigator({
    Welcome: {screen: Welcome},
    Login: { screen: Login},
    SignUp: { screen: SignUp},
    ChatBox: {screen: ChatBox},
  },
{
  headerMode: "none"
}
);

