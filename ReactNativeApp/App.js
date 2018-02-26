import React from 'react';
import { StyleSheet, Text, View,NetInfo,Dimensions,Image,ImageBackground } from 'react-native';
import { Container,Item,Thumbnail,Card } from 'native-base'
import {Stacks} from './src/Stack.js';
import Welcome from './src/Welcome.js'
var {height, width} = Dimensions.get('window');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isConnected : true,
      isClusterReady:false
    };
  }
  componentWillMount() {
    this.loadFonts();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    this.handleLoginPressed();
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  handleLoginPressed = async() => {
    //const { navigate } = this.props.navigation
    
    
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
            "username": "Kavya12",
            "password": "Kavya123@#",
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
        this.setState({isClusterReady:false})
        else
        Alert.alert("Error: "+responseJson.message);
      }
      else
      {
    //  // this.setState({isLoggedIn:true})
      
    //   navigate("ChatBox", {username:this.state.username})
    this.setState({isClusterReady:true})
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

 render() {
   if (!this.state.isReady) {
     return <Expo.AppLoading />;
   }
   if (!this.state.isConnected) {
    return (
      <Container>
      <Item>
      <ImageBackground source={require('./Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height}}>
      <Item style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
      </Item>
      <Card transparent style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('./Assets/logo.png')}/>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.headText}>CConvert</Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.appText}> Interact with chatbot to easily convert 120+ currencies  </Text>
        </Item>
      </Card>
      </ImageBackground> 
          </Item>
      </Container>
    );
  }
  if (this.state.isConnected && !this.state.isClusterReady) {
    return (
      <Container>
      <Item>
      <ImageBackground source={require('./Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height}}>
      <Card transparent style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('./Assets/logo.png')}/>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.headText}>CConvert</Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.appText}> Interact with chatbot to easily convert 120+ currencies  </Text>
        </Item>
      </Card>
      <Card style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}}>
      <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.headText}>STATUS</Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.appText}> Hasura server : Not Ready  </Text>
        </Item>
      </Card>
      </ImageBackground> 
          </Item>
      </Container>
    );
  }

     return (
       <Stacks/>
       );
 }

}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    top: 30
  },
  offlineText: { 
    color: '#fff'
  },
  appText: {
    fontWeight:'bold',
    textAlign:'center',
    //fontFamily:''
    //fontVariant:'small-caps',
    textDecorationColor:'#fff',
    textDecorationStyle:'double',
    fontSize:16
  },
  headText: {
    fontWeight:'bold',
    textAlign:'center',
    //fontFamily:''
    //fontVariant:'small-caps',
    textDecorationColor:'#fff',
    textDecorationStyle:'double',
    fontSize:28
  }
});

