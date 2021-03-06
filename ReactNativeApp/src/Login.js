import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, View,TextInput,KeyboardAvoidingView,Alert,ScrollView  } from 'react-native';
import { Container,Card,CardItem,Left,Right, Header, Content,Footer, Form, Item, Input,Label,Icon,Button,Text ,H2,Body,Title,Thumbnail} from 'native-base';
import { EvilIcons,MaterialIcons,Ionicons,MaterialCommunityIcons, Feather,Entypo,FontAwesome } from '@expo/vector-icons';
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
	  	isLoggedIn : false,
	  	username : '',
      password : '',
      fontLoaded: false
	  }
  }
  static navigationOptions = {
   header:null,
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  this.setState({ fontLoaded: true });
  }
  handleLoginPressed = async() => {
    const { navigate } = this.props.navigation
    
    
    var url = "https://auth.hundred76.hasura-app.io/v1/login";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    
    var body = {
        "provider": "username",
        "data": {
            "username": this.state.username,
            "password": this.state.password,
        }
    };
    
    requestOptions.body = JSON.stringify(body);
    
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      
      if(responseJson.auth_token === undefined)
      {
        if(responseJson.message === "cluster is processing action: waking" || responseJson.status === "waking")
        Alert.alert("The server seems to be offline.");
        else
        Alert.alert("Error: "+responseJson.message);
      }
      else
      {      
      navigate("ChatBox", {username:this.state.username})
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    const { navigate } = this.props.navigation
    
    return (
<Container style={{height:Expo.Constants.statusBarHeight}} >
{ this.state.fontLoaded ? (
  <Header  style={{backgroundColor:'#276971'}} >
  <Left style={{flex:1}}><Thumbnail style={{width:60,height:60,borderRadius:60/2}} source={require('../Assets/ownlogo6.png')} /></Left>
   <Body style={{flex:1,justifyContent:'center',alignItems:'center'}}><Title>CConvert</Title></Body>
   <Right style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    
            
    </Right>
  </Header>  ):null}
{ this.state.fontLoaded ? (
<Content contentContainerStyle={{flex:1,backgroundColor:'#28D49A'}}>

<ScrollView>
<View style={{flex:1,marginTop:30,justifyContent:'center',marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >

<Item style={{justifyContent:'center',marginBottom:30,borderColor:'transparent'}}><H2>Convert your currency</H2></Item>
<Item rounded={true} style={{backgroundColor:'white',marginBottom:10,marginLeft:20,marginRight:20}} >
<FontAwesome name='user' size={25} style={{marginLeft:10}} />
  
  <Input placeholder= "Username" onChangeText={(text) => this.setState({username:text})} />
</Item>
<Item fixedLabel rounded last style={{backgroundColor:'white',marginBottom:10,marginLeft:20,marginRight:20}} >
<FontAwesome name='lock' size={25} style={{marginLeft:10}}  />
  <Input secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({password:text})}/>

</Item>

<Item style={{ justifyContent: 'center',borderColor:'transparent',marginBottom:30}}>
<Button  rounded style={{padding:10,marginBottom:10}}
onPress={() => { this.handleLoginPressed()
   
    }}>
            <Entypo name='login' size={20} />
            <Text>Login   </Text>
          </Button>
         
         </Item>
         <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Text>Don't have an account yet?</Text></Item>
         <Item style={{ justifyContent: 'center',borderColor:'transparent',marginBottom:10}}>
         <Button rounded style={{padding:10}}
          onPress={() => navigate("SignUp", {screen: "SignUp"})}
          >
          <MaterialIcons name='person-add' size={20} />
            <Text>Sign Up</Text>
            
          </Button>
         </Item>
         
         </View>
         </ScrollView>
         

</Content>
):null}
</Container>

    );
  }
}
