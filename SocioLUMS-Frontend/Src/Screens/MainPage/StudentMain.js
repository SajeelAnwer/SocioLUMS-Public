import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Bottomnavbar from '../../Components/Bottomnavbar'
import Topnavbar from '../../Components/Topnavbar'
import SocietyPosts from '../../Components/SocietyPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentMain = ({navigation}) => {
  const [studentdata, setstudentdata] = React.useState(null)
  const [societiesdata, setsocietiesdata] = React.useState([])
  const [loading, setloading] = React.useState(false)
  
  useEffect(()=>{
    AsyncStorage.getItem('student')
    .then(data => {
      
      setstudentdata(JSON.parse(data))  //studentdata will have local msg token user: id,email,type
    })
    .catch(err => alert(err))
  },[])
  //console.log("studentdata: ", studentdata)

  
  

  return (
    <View style= {styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} page={"StudentMain"}/>
      
      <SocietyPosts />

      <Bottomnavbar navigation={navigation} page={"StudentMain"}/>
      
    </View>
  )
}

export default StudentMain

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
