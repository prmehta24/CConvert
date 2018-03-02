import React from 'react';
import { StyleSheet, Text, View,NetInfo,Dimensions,Image,Platform,AppRegistry,ImageBackground,ScrollView,Alert } from 'react-native';
import { Container,Item,Thumbnail,Card,Button,Content,Header } from 'native-base'
import { EvilIcons,MaterialIcons,Ionicons,MaterialCommunityIcons, Feather,Entypo,FontAwesome,Octicons } from '@expo/vector-icons';
import TimerMixin from 'react-timer-mixin';
import {Screen} from '@shoutem/ui'

mixins: [TimerMixin];
export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      isConnected : true,
      isClusterReady:false,
      resp:"Bot : Not ready",
      hasuraMsg:"Hasura server : Not ready",
      NetworkStatus:"Network : Online",
     
    };
  
  }

componentDidMount() {

    this.interval = setInterval(() => {
        console.log("Hi");
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    if (this.state.isConnected){
      this.setState({NetworkStatus:"Network : Online"});
    this.handleLoginPressed();
    this.handleQuery();}
    else
    {
      this.setState({NetworkStatus:"Network : Offline"}); 
      this.setState({hasuraMsg:"Hasura server : Not ready"});
      this.setState({resp:"Bot : Not ready"});
    }
    }, 6000); //6 seconds
}
  


  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
      this.setState({NetworkStatus:"Network : Online"});
    } else {
      this.setState({ isConnected });
      this.setState({NetworkStatus:"Network : Offline"}); 
    }
  };

  checkconditions = async => {
    const { navigate } = this.props.navigation

    if((this.state.isConnected)&&(this.state.hasuraMsg === "Hasura server: Ready")&&(this.state.resp === "Bot : Ready"))
    {
      navigate("Login", {screen: "Login"})
    }
    else
    {
      Alert.alert("Either the Network, Server or Bot are offline.");
    }
  }
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
  const Green = <Octicons style={{color:"#008542"}}name="primitive-dot" size={30}/>;
  const Red = <Octicons style={{color:"#D84F57"}} name="primitive-dot" size={30}/>;
  const GreenNet = <MaterialCommunityIcons  style={{color:"#66E771"}} name="access-point-network" size={30}/>;
  const RedNet = <MaterialCommunityIcons  style={{color:"#D84F57"}} name="access-point-network" size={30}/>
  const GreenServer = <MaterialCommunityIcons style={{color:"#66E771"}} name="server" size={30}/>;
  const RedServer = <MaterialCommunityIcons style={{color:"#D84F57"}} name="server" size={30}/>;
  const GreenBot = <MaterialCommunityIcons style={{color:"#66E771"}} name="robot" size={30}/>
  const RedBot = <MaterialCommunityIcons style={{color:"#D84F57"}} name="robot" size={30}/>
  
    return (
     /*<Container style={{flex:1}} >
      <Item>
      <Item style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
      </Item>
  <Card transparent style={{flex:1,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}} >
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
      <Card style={{flex:1,top:70,marginLeft:10,marginRight:10,backgroundColor:'transparent'}}>
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
     
          </Item>
      </Container>*/
    
    <ImageBackground style={{flex: 1,width: null,height: null,flexDirection:'column'}} blurRadius={4} imageStyle={{resizeMode: 'stretch',backgroundColor: 'rgba(0,0,0,0.1)'}} source={require('../Assets/back2v3.jpg')}     >
       <ScrollView >
       <Card transparent style={{flex:1,backgroundColor:'transparent'}} >
        <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent',paddingTop:30}}>
        <Thumbnail large source={require('../Assets/logo.png')}/>
        </Item>
        <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.headText}>CConvert</Text>
        </Item>
        <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.appText}> A one-stop solution for all your currency exchange dilemmas  </Text>
        </Item>
      </Card>
      <Item style={{flex:1,justifyContent:'center',marginBottom:10,marginTop:10,borderColor:'transparent'}} >
        <Button rounded style={{paddingLeft:60,paddingRight:60}}
            onPress={() => { this.checkconditions()
   
  }}>
            <Text>Try Me</Text>
          </Button>
          </Item>
      <Card style={{flex:1,backgroundColor:'transparent',alignItems:'flex-start',marginLeft:10,marginRight:10}}>
      
      {/* <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        <Text style={styles.statusHeadText}>Status</Text>
        </Item> */}
        <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        {this.state.NetworkStatus === "Network : Online" ? GreenNet : RedNet }<Text style={styles.statusText}> {this.state.NetworkStatus} </Text>
        </Item>
        <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        {this.state.hasuraMsg === "Hasura server: Ready" ? GreenServer : RedServer }<Text style={styles.statusText}> {this.state.hasuraMsg} </Text>
        </Item>
        <Item style={{flex:1,justifyContent:'center',marginBottom:10,borderColor:'transparent'}}>
        {this.state.resp === "Bot : Ready" ? GreenBot : RedBot }<Text style={styles.statusText}> {this.state.resp}  </Text>{/* <Octicons style={{color:"#008542"}}name="primitive-dot" size={30}/> */}
        </Item>
        
      </Card>
      <Item style={{flex:0,justifyContent:'center',marginBottom:5,borderColor:'transparent',alignItems:'flex-end',marginTop:10}}><Text style={{fontSize:9}}>Version 1.0  Build  24/2/18</Text></Item>
      </ScrollView>
     </ImageBackground>
 
  
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
    flex:1,   
    position: 'absolute',
    top: 30
  },
  offlineText: { 
    color: '#fff'
  },
  appText: {
    fontWeight:'bold',
    textAlign:'center',
    color:'#141526',
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
    color:'#000080',
    fontFamily:'sans-serif-medium',
    textDecorationStyle:'double',
    fontSize:24
  }
});

