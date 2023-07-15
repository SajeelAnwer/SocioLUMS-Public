import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Bottomnavbar = ({navigation, page}) => {
  return (
    <View style={styles.container}>
      {
        page === "SocietyMain" ?
          <Entypo name="home" size={26} color="black" style={styles.activeicon1} 
          onPress={()=>navigation.navigate('SocietyMain')}/>
        :
          <Entypo name="home" size={26} color="black" style={styles.icon1} 
          onPress={()=>navigation.navigate('SocietyMain')}/>
      }
      
      {
        page === "Society_profile" ?
          <FontAwesome5 name="user" size={26} color="black" style={styles.activeicon1} 
          onPress={()=>navigation.navigate('Society_profile')}/>
        :
          <FontAwesome5 name="user" size={26} color="black" style={styles.icon1} 
          onPress={()=>navigation.navigate('Society_profile')}/>
      }

    </View>
  )
}

export default Bottomnavbar

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#CBA5B6',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    paddingVertical: 7, 
    alignItems: 'center'   
  },
  icon1: {
    color: 'white',
    fontSize: 30
  },
  activeicon1: {
    backgroundColor: 'white',
    borderRadius: 50,
    fontSize: 20,
    padding: 10,
  }
})