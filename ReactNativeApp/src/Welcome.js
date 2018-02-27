import React from 'react';
import { StyleSheet, Text, View,NetInfo,Dimensions,Image,ImageBackground,Platform } from 'react-native';
import { Container,Item,Thumbnail,Card,Button } from 'native-base'
import TimerMixin from 'react-timer-mixin';
var {height, width} = Dimensions.get('window');
const dim = Dimensions.get('screen');
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
mixins: [TimerMixin];
export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      isConnected : true,
      isClusterReady:false,
      resp:"Bot : Not ready",
      hasuraMsg:"Hasura server : Not ready",
      orientation: Platform.isPortrait ? 'portrait' : 'landscape'
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
          orientation: Platform.isPortrait ? 'portrait' : 'landscape'
      });
  });
  }

componentDidMount() {

    this.interval = setInterval(() => {
        console.log("Hi");
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    if (this.state.isConnected){
    this.handleLoginPressed();
    this.handleQuery();}
    }, 6000); //6 seconds
}
  
  // componentWillMount() {
  //   NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  //   this.handleLoginPressed();
  //   this.handleQuery();
  // }

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
            /* Shubham's bot*/   "Authorization": "Bearer 368069f780a149fea41071b9e756d504",
          /* Anakin's bot*/ //  "Authorization": "Bearer e5b2af61428143da80e7a57380c63af4"
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
      <Container style={{flex:1, }}>
      <Item>
      <ImageBackground source={require('../Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height,alignSelf:"auto" }}>
      <Item style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
      </Item>
      <Card transparent style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('../Assets/logo.png')}/>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.headText}>CCONVERT</Text>
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
      <Container style={{flex:1}} >
      <Item>
      <ImageBackground source={require('../Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height}}>
  <Card transparent style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('../Assets/logo.png')}/>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.headText}>CCONVERT</Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.appText}> Interact with chatbot to easily convert 120+ currencies  </Text>
        </Item>
      </Card>
      <Card style={{flex:0,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}}>
      <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.statusHeadText}>STATUS</Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.statusText}> {this.state.hasuraMsg} </Text>
        </Item>
        <Item style={{justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
          <Text style={styles.statusText}> {this.state.resp}  </Text>
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
    color:'#fff',
    textDecorationStyle:'double',
    fontSize:16
  },
  headText: {
    fontWeight:'bold',
    textAlign:'center',
    color:'#000080',
    textDecorationStyle:'double',
    fontFamily:'notoserif',
    fontSize:30
  },
  statusText: {
    fontWeight:'bold',
    textAlign:'center',
    //color:'#32CD32',
    textDecorationStyle:'double',
    fontFamily:'sans-serif-thin',
    fontSize:20
  },
  statusHeadText: {
    fontWeight:'bold',
    textAlign:'center',
    color:'#5c0815',
    fontFamily:'sans-serif-medium',
    textDecorationStyle:'double',
    fontSize:24
  }
});

