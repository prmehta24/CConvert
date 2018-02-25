import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, View,TextInput,KeyboardAvoidingView,Alert  } from 'react-native';
import { Container,Card,CardItem,Left,Right, Header, Content,Footer, Form, Item, Input,Label,Icon,Button,Text ,H1,Body,Title,Thumbnail} from 'native-base';
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
  //  title: "Login",
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
            //"email": "mail"
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
        Alert.alert("Please wait for sometime");
        else
        Alert.alert("Error: "+responseJson.message);
      }
      else
      {
     // this.setState({isLoggedIn:true})
      
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
      /*<KeyboardAvoidingView  style={styles.container} behavior="padding">
        
        <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(text) => this.setState({username:text})}
        />
          <TextInput
         style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({password:text})}
        />
        <View  style={{paddingBottom:10}}>
        <Button
  onPress={() => { this.handleLoginPressed()
   // if(this.state.isLoggedIn == true) 
    }}
  title="Login"
  color="#841584"
/>
</View>
<Button
  onPress={() => navigate("SignUp", {screen: "SignUp"})}
  title="Sign Up"
  color="#841554"
 
  
/>
<View style={{ height: 60 }} />
</KeyboardAvoidingView>*/

<Container style={{height:Expo.Constants.statusBarHeight}} >
{ this.state.fontLoaded ? (
<Header  style={{backgroundColor:'#276971'}} >
 <Body style={{flex:1,justifyContent:'center',alignItems:'center'}}><Title>Welcome to CConvert</Title></Body>
</Header> ):null}
{ this.state.fontLoaded ? (
<Content contentContainerStyle={{flex:1,justifyContent: 'center',backgroundColor:'#28D49A'}}>

<Card style={{flex:0,padding:10,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >

<Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Thumbnail large source={require('./logo.png')}/></Item>
<Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Text>Convert your Currency</Text></Item>
<Item rounded={true} style={{backgroundColor:'white',marginBottom:10}} >
<FontAwesome name='user' size={25} style={{marginLeft:10}} />
  
  <Input placeholder= "Username" onChangeText={(text) => this.setState({username:text})} />
</Item>
<Item fixedLabel rounded last style={{backgroundColor:'white',marginBottom:10}} >
<FontAwesome name='lock' size={25} style={{marginLeft:10}}  />
  <Input secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({password:text})}/>

</Item>

<Item style={{ justifyContent: 'center',borderColor:'transparent'}}>
<Button  rounded style={{padding:10,marginBottom:10}}
onPress={() => { this.handleLoginPressed()
   
    }}>
            <Entypo name='login' size={20} />
            <Text>Login   </Text>
          </Button>
         
         </Item>
         <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Text>Don't have account yet?</Text></Item>
         <Item style={{ justifyContent: 'center',borderColor:'transparent',marginBottom:10}}>
         <Button rounded style={{padding:10}}
          onPress={() => navigate("SignUp", {screen: "SignUp"})}
          >
          <MaterialIcons name='person-add' size={20} />
            <Text>Sign Up</Text>
            
          </Button>
         </Item>
         <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Text style={{fontSize:9}}>Version 1.0  Build  24/2/18</Text></Item>
         </Card>
        

</Content>
):null}
</Container>

    );
  }
}