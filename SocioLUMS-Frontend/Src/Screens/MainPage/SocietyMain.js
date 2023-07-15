import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import SocietyBotnav from '../../Components/SocietyBotnav'
import Society_Topnav from '../../Components/Society_Topnav'
import SocietyPosts from '../../Components/SocietyPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocietyMain = ({navigation}) => {
  const [societydata, setsocietydata] = React.useState(null)
  
  useEffect(()=>{
    AsyncStorage.getItem('society')
    .then(data => {
      
      setsocietydata(JSON.parse(data))  //societydata will have local msg token user: id,email,type
    })
    .catch(err => alert(err))
  },[])

  //console.log("societymaindata: ", societydata)


  return (
    <View style= {styles.container}>
      <StatusBar />
      <Society_Topnav navigation={navigation} page={"SocietyMain"}/>
      
      <SocietyPosts />

      <SocietyBotnav navigation={navigation} page={"SocietyMain"}/>
    </View>
  )
}

export default SocietyMain

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
  paddingBottom:50
},
})
