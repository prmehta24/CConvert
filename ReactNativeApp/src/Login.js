import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, View,TextInput,KeyboardAvoidingView,Alert  } from 'react-native';
import { Container, Header, Content,Footer, Form, Item, Input,Label,Icon,Button,Text } from 'native-base';
import { EvilIcons,MaterialIcons,Ionicons,MaterialCommunityIcons, Feather,Entypo } from '@expo/vector-icons';
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
	  	isLoggedIn : false,
	  	username : '',
      password : '',
	  }
  }
  static navigationOptions = {
  //  title: "Login",
   header:null,
  }
  handleLoginPressed = async() => {
    const { navigate } = this.props.navigation
    
    
    var url = "https://auth.animosity52.hasura-app.io/v1/login";

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

<Container style={styles.container}>

<Content contentContainerStyle={{flex:1,justifyContent: 'center'}}>

<Form style={styles.form} >
<Item fixedLabel rounded={true} style={{backgroundColor: 'white'}}>
  <Label  style={{padding: 10}}>Username</Label>
  <Input onChangeText={(text) => this.setState({username:text})} />
</Item>
<Item fixedLabel rounded last style={{backgroundColor: 'white'}}>
  <Label  >Password</Label>
  <Input secureTextEntry={true}  onChangeText={(text) => this.setState({password:text})}/>
</Item>

<Item  style={{paddingTop:10, justifyContent:'center',borderColor:'transparent'}}>
<Button style={{padding:20}} rounded
onPress={() => { this.handleLoginPressed()
   
    }}>
            <Entypo name='login' size={20} />
            <Text>Login</Text>
          </Button>
          <Button style={{padding:20}} rounded 
          onPress={() => navigate("SignUp", {screen: "SignUp"})}
          >
          <MaterialIcons name='person-add' size={20} />
            <Text>Sign Up</Text>
            
          </Button>
         </Item>
         </Form>

</Content>
</Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    backgroundColor: '#28D49A',
   // alignItems: 'center',
   // justifyContent: 'center',
   // padding:10,
  },
  form:{
  //  flex: 1,
   
  //  alignItems: 'center',
  //  justifyContent: 'center',
    padding:10,
  },
});
