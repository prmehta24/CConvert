import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView,Alert } from 'react-native';
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


  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
         <TextInput
          style={{height: 40}}
          placeholder="Username"
         // value={this.state.uname} 
         returnKeyLabel = {"next"} 
         onChangeText={(text) => this.setState({username:text})}
        />
          <TextInput
         style={{height: 40}}
          placeholder="Set Password"
          value={this.state.pass} 
          onChangeText={(text) => this.setState({password:text})}
        />
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
