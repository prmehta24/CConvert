import React from 'react';
import { StyleSheet, Text, View,NetInfo,Dimensions,Image,ImageBackground } from 'react-native';
import { Container,Item,Thumbnail,Card,Button } from 'native-base'
var {height, width} = Dimensions.get('window');
export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      isConnected : true,
      isClusterReady:false,
      resp:"Bot : Not ready",
      hasuraMsg:"Hasura server : Not ready"
    };
  }
  componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    this.handleLoginPressed();
    this.handleQuery();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  handleLoginPressed = async() => {
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
      console.log(responseJson.auth_token)
      if(responseJson.auth_token === undefined)
      {
        if(responseJson.message === "cluster is processing action: waking" || responseJson.status === "waking")
        {
        this.setState({isClusterReady:false})
        this.setState({hasuraMsg:"Hasura server : Not ready"});
      }
      }
      else
      {
    this.setState({hasuraMsg:"Hasura server: Ready"})
      }
      console.log(this.state.hasuraMsg)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleQuery = async() => {
    var url = "https://api.dialogflow.com/v1/query?v=20150910";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer e5b2af61428143da80e7a57380c63af4"
        }
    };
    
    var body = {
            "lang": "en",
            "query" :"Convert 1 rupee to dollars",
            "sessionId":"ed49f385-decb-4859-bebd-1dd6b842ac1c",
            "timezone":"America/Los_Angeles"
    };
    
    requestOptions.body = JSON.stringify(body);
    
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
     if(responseJson.result.fulfillment.speech === "Please provide a valid input")
     this.setState({resp:"Bot : Not ready"});
     else
     this.setState({resp:"Bot : Ready"});
      })
    .catch((error) => {
      console.log(error);
    });
  }

  enter = async() =>{
    return (
          <Stacks />
          );
  }
 render() {
  const { navigate } = this.props.navigation
   if (!this.state.isConnected) {
    return (
      <Container>
      <Item>
      <ImageBackground source={require('../Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height}}>
      <Item style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
      </Item>
      <Card transparent style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('../Assets/logo.png')}/>
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
    return (
      <Container>
      <Item>
      <ImageBackground source={require('../Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height}}>
  <Card transparent style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('../Assets/logo.png')}/>
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
        <Text style={styles.appText}> {this.state.hasuraMsg} </Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
          <Text style={styles.appText}> {this.state.resp}  </Text>
        </Item>
        <Item style={{justifyContent:'center'}} >
        <Button style={{padding:10,marginBottom:10}}
            onPress={() => navigate("Login", {screen: "Login"})}>
            <Text>GO</Text>
          </Button>
          </Item>
      </Card>
      </ImageBackground> 
          </Item>
      </Container>
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
    textDecorationColor:'#fff',
    textDecorationStyle:'double',
    fontSize:16
  },
  headText: {
    fontWeight:'bold',
    textAlign:'center',
    textDecorationColor:'#fff',
    textDecorationStyle:'double',
    fontSize:30
  },
  statusText: {
    fontWeight:'bold',
    textAlign:'center',
    textDecorationColor:'#fff',
    textDecorationStyle:'double',
    fontSize:16
  },
  statusHeadText: {
    fontWeight:'bold',
    textAlign:'center',
    textDecorationColor:'#fff',
    textDecorationStyle:'double',
    fontSize:24
  }
});

