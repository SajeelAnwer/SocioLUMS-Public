import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import SponsorBotnav from '../../Components/SponsorBotnav'
import Sponsor_Topnav from '../../Components/Sponsor_Topnav'
import SocietyPosts from '../../Components/SocietyPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SponsorMain = ({navigation}) => {
  const [sponsordata, setsponsordata] = React.useState(null)
  
  useEffect(()=>{
    AsyncStorage.getItem('sponsor')
    .then(data => {
      
      setsponsordata(JSON.parse(data))  //sponsordata will have local msg token user: id,email,type
    })
    .catch(err => alert(err))
  },[])

  //console.log("sponsormaindata: ", sponsordata)


  return (
    <View style= {styles.container}>
      <StatusBar />
      <Sponsor_Topnav navigation={navigation} page={"SponsorMain"}/>
      
      <SocietyPosts />

      <SponsorBotnav navigation={navigation} page={"SponsorMain"}/>

    </View>
  )
}

export default SponsorMain

const styles = StyleSheet.create({
  containerFull: {
    width: '100%',
    height: '100%',
    backgroundColor: '#B48BCD',
    alignItems: 'center',
    justifyContent: 'center'
},
formHead: {
  fontSize: 30,
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  // backgroundColor: 'white',
},
container: {
  width: '100%',
  height: '100%',
  //backgroundColor: '#B48BCD',
  backgroundColor: '#CBA5B6',
  //paddingVertical: 100,
  paddingTop: 85,
  paddingBottom: 50
},
})
