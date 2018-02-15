import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView,Alert,Switch } from 'react-native';
import { Container, Header, Content, Form, Item, Input,Right,Icon } from 'native-base';
export default class SignUp extends React.Component {
  
  constructor(props){
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
	  	isLoggedIn : false,
	  	username : ' ',
      password : ' ',
      email : ' ',
      authToken:' ',
      showPassword: true,
	  }
  }
  static navigationOptions = {
    title: "Sign Up"
  }
 

  handleSignupPressed = async() => {
    const { navigate } = this.props.navigation
    
      var url = "https://auth.animosity52.hasura-app.io/v1/signup";
  
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
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
  

  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
      <Item>
         <Input
          style={{height: 40}}
          placeholder="Username"
         returnKeyLabel = {"next"} 
         onChangeText={(text) => this.setState({username:text})}
        />
        </Item>
        <Item>
          <Input
         style={{height: 40}}
          placeholder="Set Password"
          secureTextEntry={this.state.showPassword}
          onChangeText={(text) => this.setState({password:text})}
        />
         <Switch
          onValueChange={this.toggleSwitch}
          value={!this.state.showPassword}
        /> 
        </Item>
        <Item>
          <Input
          style={{height: 40}}
          placeholder="e-mail ID"
          onChangeText={(text) => this.setState({email:text})}
          keyboardType="email-address" />
          
          </Item>
          <Text>












            </Text>
    <Button
  onPress={() => { 
    {
    this.handleSignupPressed()
    
    //if(this.state.isLoggedIn === true) 
   // {
  //    console.log("isLoggedIn: "+this.state.isLoggedIn);
   //             
   // }
              }}}
  title="Register"
  color="#841584"
  
/>
<View style={{ height: 60 }} />
</KeyboardAvoidingView>
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
