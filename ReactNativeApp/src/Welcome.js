import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet,Image } from 'react-native';
import { Container,Item } from 'native-base'
const { width } = Dimensions.get('window');
function OfflineSign() {
  return (
    <Container>
    <Item style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    {/* <Image source={require('../Assets/back.jpg')} blurRadius={ 2 }  /> */}
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
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { 
    color: '#fff'
  }
});
export default Welcome