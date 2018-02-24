import React from 'react';
import { StyleSheet,View,TextInput,KeyboardAvoidingView,Alert } from 'react-native';
import { Container,Card,CardItem,Left,Right, Header, Content,Footer, Form, Item, Input,Label,Icon,Button,Text ,H1,Body,Title,Thumbnail} from 'native-base';
import { EvilIcons,MaterialIcons,Ionicons,MaterialCommunityIcons, Feather,Entypo,FontAwesome } from '@expo/vector-icons';
export default class SignUp extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
	  	isLoggedIn : false,
	  	username : ' ',
      password : ' ',
      email : ' ',
      authToken:' ',
      // loading: true,
      // error: false,
      // posts: [],
	  }
  }
  static navigationOptions = {
    title: "Sign Up",
    header:null,
  }
 

  handleSignupPressed = async() => {
    const { navigate } = this.props.navigation
    
      var url = "https://auth.hundred76.hasura-app.io/v1/signup";
  
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
        Alert.alert("Error: "+responseJson.message);
        else{
      //  this.setState({isLoggedIn:true})
       // Alert.alert("Success")
       navigate("Login", {screen: "Login"})

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

<Header  style={{backgroundColor:'#276971'}} >
 <Body style={{flex:1,justifyContent:'center',alignItems:'center'}}><Title>Welcome to CConvert</Title></Body>
</Header> 

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
onPress={() => { this.handleSignupPressed()
   
    }}>
            <Entypo name='add-user' size={20} />
            <Text>Register</Text>
          </Button>
         
         </Item>
         <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Text>Already have an account?</Text></Item>
         <Item style={{ justifyContent: 'center',borderColor:'transparent',marginBottom:10}}>
         <Button rounded style={{padding:10}}
          onPress={() => navigate("Login", {screen: "Login"})}
          >
          <Entypo name='back' size={20} />
            <Text>Back   </Text>
            
          </Button>
         </Item>
         <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}><Text style={{fontSize:9}}>Version 1.0  Build  24/2/18</Text></Item>
         </Card>
        

</Content>

</Container>



);
  }
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});
