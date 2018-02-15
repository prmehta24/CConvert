import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,KeyboardAvoidingView,Alert,Switch  } from 'react-native';
import { Container, Header, Content, Form, Item, Input,Right,Icon } from 'native-base';
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
	  	isLoggedIn : false,
	  	username : '',
      password : '',
      showPassword: true,
	  }
  }
  static navigationOptions = {
    title: "Login"
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
          onChangeText={(text) => this.setState({username:text})}
        />
        </Item>
        <Item>
          <Input
         style={{height: 40}}
          placeholder="Password"
          secureTextEntry={this.state.showPassword}
          onChangeText={(text) => this.setState({password:text})}
        />
         <Switch
          onValueChange={this.toggleSwitch}
          value={!this.state.showPassword}
        /> 
        </Item>
        <View  style={{paddingBottom:10}}>
        <Text>







          </Text>
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
</KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   // alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});
