import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


// update the All chats society navigation
const Sponsor_Topnav = ({navigation, page}) => {
  return (
    <View style = {styles.container}>

      <Image source={require('../../assets/SocioLUMS.png')} style = {styles.logo1}></Image>
        <Text style={styles.welcome}>SocioLUMS</Text>
        
        {
            page === "SponsorMain" &&
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" style={styles.icon1} onPress={
                () => navigation.navigate('Allchats_society')}/>
        }
        

      
    
    </View>
  )
}

export default Sponsor_Topnav

const styles = StyleSheet.create({
    logo1: {
        height: 50,
        resizeMode: 'contain',
        width: 60
    },
    
    icon1: {
        color: 'white',
        fontSize: 30,
        width: 50
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 5,
        //paddingVertical: 10,
        top: 25,
        position: 'absolute',
        zIndex: 100,
        backgroundColor: '#CBA5B6',
        
    },
    welcome:{
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      paddingRight: 120 
    },
    
})