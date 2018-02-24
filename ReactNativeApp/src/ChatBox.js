
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView, Animated, Keyboard, FlatList, Alert, ScrollView  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Header, Content, Form, Item, Input,Footer,Right } from 'native-base';
import {GiftedChat,Bubble} from 'react-native-gifted-chat';
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: "Chat",
    header:null

  }
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.state = {
      query : ' ',
      messages: [],
      resp: 'Hello!\nThe format for converting currency is:\nconvert (value) (currency_initial) to (currency_final)',
      onTyping:''
    };
  }

  componentDidMount () {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide); 
    this.setState({
      messages : [
        {
          _id: Math.round(Math.random() * 1000000),
          text: this.state.resp,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
            avatar: require('./bot1.png')
          },
        }
      ]
    })
  }
 
  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
      //  duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      
    ]).start();
  };

  keyboardDidHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
       // duration: event.duration,
        toValue: 0,
      }),
     
    ]).start();
  };
  handleQuery = async() => {
    console.log(this.state.query)
    var url = "https://api.dialogflow.com/v1/query?v=20150910";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer e5b2af61428143da80e7a57380c63af4"
        }
    };
    
    var body = {
            "lang": "en",
            "query" : this.state.query,
            "sessionId":"ed49f385-decb-4859-bebd-1dd6b842ac1c",
            "timezone":"America/Los_Angeles"
    };
    
    requestOptions.body = JSON.stringify(body);
    
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({resp:responseJson.result.fulfillment.speech});
      console.log(responseJson.result.fulfillment.speech)
      this.onReceive(this.state.resp);
      })
    .catch((error) => {
      console.log(error);
    });
  }
 
  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    let msg = messages[0].text
    console.log(msg)
    this.setState({query:await msg});
    console.log(this.state.query);
    this.handleQuery()
    }
    async onReceive(text) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id: Math.round(Math.random() * 1000000),
            text: text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
              avatar:require('./bot1.png')
            },
          }),
        };
      });
    }

    renderBubble(props) { 
      return ( <Bubble {...props} 
      wrapperStyle={{
          left: {
            backgroundColor: '#FFB347',
          },
          right: {
            backgroundColor: '#AB82FF'
          }
        }}
      textStyle={{
        left:{
          color:'#fff'
        }
      }} />
      )}
  render() {
    const { navigate } = this.props.navigation;
    const { messages } = this.state;
    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
    return ( 
      
 <View style={[styles.container/*, { paddingBottom: this.keyboardHeight }*/]}>
 <Header style={{backgroundColor:'#fff'}} noShadow={true} >
 <Right>
  <Button 
  onPress={() => navigate("Login", {screen: "Login"})}
  title="Logout"
  color="#5747ff"
  />
  </Right>
 </Header>
 <GiftedChat
 messages={this.state.messages}
 onSend={messages => this.onSend(messages)}
 placeholder = "Type your message here..."
 showUserAvatar = {true}
 user = {        
            {
              _id: 1,
              name: username,
              avatar:require('./user1.png')
            }
          }
renderBubble = {this.renderBubble}
/> 

 </View>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});