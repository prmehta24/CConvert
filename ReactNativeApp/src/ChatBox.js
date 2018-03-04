
import React from 'react';
import { StyleSheet, View,TextInput,KeyboardAvoidingView, Animated, Keyboard, FlatList, Alert, ScrollView  } from 'react-native';
import { Container,Card,CardItem,Left,Right, Header, Content,Footer, Form, Item, Input,Label,Icon,Button,Text ,H1,Body,Title,Thumbnail} from 'native-base';
import { EvilIcons,MaterialIcons,Ionicons,MaterialCommunityIcons, Feather,Entypo,FontAwesome } from '@expo/vector-icons';
import {GiftedChat,Bubble,Day} from 'react-native-gifted-chat';
export default class ChatBox extends React.Component {
  static navigationOptions = {
    title: "Chat",
    header:null
  }
  constructor(props) {
    super(props);
    this.state = {
      query : ' ',
      messages: [],
      resp: 'Hello!\nType your query to convert the currency :)',
      onTyping:''
    };
  }

  componentDidMount () {
    this.setState({
      messages : [
        {
          _id: Math.round(Math.random() * 1000000),
          text: this.state.resp,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
            avatar: require('../Assets/bot1.png')
          },
        }
      ]
    })
  }
  handleQuery = async() => {
    console.log(this.state.query)
    var url = "https://api.dialogflow.com/v1/query?v=20150910";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
          /* Shubham's bot*/   "Authorization": "Bearer 368069f780a149fea41071b9e756d504",
          /* Anakin's bot*/ //  "Authorization": "Bearer e5b2af61428143da80e7a57380c63af4"
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
      if(responseJson.result.fulfillment.speech === "" || responseJson.result.fulfillment.speech === undefined )
      {
        this.setState({resp:"The bot seems to be experiencing technical difficulties : "+responseJson.status});
      }
      else
      {
      this.setState({resp:responseJson.result.fulfillment.speech});
      }
      console.log(responseJson)
      console.log(this.state.resp)
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
              avatar:require('../Assets/bot1.png')
            },
          }),
        };
      });
    }

    renderBubble(props) { 
      return ( <Bubble {...props} 
      wrapperStyle={{
          left: {
            backgroundColor: '#008542',
          },
          right: {
            backgroundColor: '#007AFF'
          }
        }}
      textStyle={{
        left:{
          color:'#fff'
        },
      }} />
      )}
      renderDay(props) {
        return <Day {...props} textStyle={{color: 'black'}}/>
      }
  render() {
    const { navigate } = this.props.navigation;
    const { messages } = this.state;
    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
    return ( 
 <View style={styles.container}>
 <Header style={{backgroundColor:'#276971'}} noShadow={true} >
 <Left style={{flex:1}}><Thumbnail style={{width:60,height:60,borderRadius:60/2}} source={require('../Assets/ownlogo6.png')} /></Left>
 <Body style={{flex:1,justifyContent:'center',alignItems:'center'}}><Title>CConvert</Title></Body>
 <Right style={{flex:1}}>
  <Button transparent 
onPress={() => navigate("Welcome", {screen: "Welcome"})} >
            <MaterialCommunityIcons name='logout-variant' size={35} />
          
          </Button>
          
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
              avatar:require('../Assets/user1.png')
            }
          }
renderBubble = {this.renderBubble}
renderDay={this.renderDay}

/> 
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28D49A',
    
  },
});