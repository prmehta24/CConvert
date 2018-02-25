import React, { PureComponent } from 'react';
import { View, Text, NetInfo, StyleSheet,Image,ImageBackground,Dimensions } from 'react-native';
import { Container,Item } from 'native-base'

var {height, width} = Dimensions.get('window');

function OfflineSign() {
  return (
    <Container>
    <Item>
    <ImageBackground source={require('../Assets/back.jpg')} blurRadius={ 4 } style={{width:width, height: height}}>
    <Item style={styles.offlineContainer}>
    <Text style={styles.offlineText}>No Internet Connection</Text>
    </Item>
    </ImageBackground> 
        </Item>
    </Container>
  );
}
class Welcome extends PureComponent {
  render() {
      return <OfflineSign />;
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
  }
});
export default Welcome