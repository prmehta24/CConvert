import React from 'react';
import { StyleSheet,View,TextInput,KeyboardAvoidingView,Alert,ScrollView } from 'react-native';
import { Container,Card,CardItem,Left,Right, Header, Content,Footer, Form, Item, Input,Label,Icon,Button,Text ,H2,Body,Title,Thumbnail} from 'native-base';
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
	  }
  }
  static navigationOptions = {
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
        else{
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
<Left style={{flex:1}}><Thumbnail style={{width:60,height:60,borderRadius:60/2}} source={require('../Assets/ownlogo6.png')} /></Left>
 <Body style={{flex:1,justifyContent:'center',alignItems:'center'}}><Title>CConvert</Title></Body>
 <Right style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  
          
  </Right>
</Header> 

<Content contentContainerStyle={{flex:1,backgroundColor:'#28D49A'}}>
<ScrollView>
<View style={{flex:1,marginTop:30,justifyContent:'center',marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
<Item style={{justifyContent:'center',marginBottom:30,borderColor:'transparent'}}><H2>Open your account</H2></Item>
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
          <Entypo name='login' size={20} />
            <Text>Login      </Text>
            
          </Button>
         </Item>
         
         </View>
        
</ScrollView>
</Content>

</Container>



);
  }
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10,
  },
});