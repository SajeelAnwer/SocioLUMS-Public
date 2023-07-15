import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import dummy_dp from '../../assets/dummy_dp.png'

const Societycard = ({society, navigation}) => {
    //console.log(society.society_name)
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Society_otherprofile', {society: society})}>
        <View style={styles.container}>
        {
            society.Society_dp ?
            <Image source={{uri: society.Society_dp}} style={styles.dp}></Image>
            :
            <Image source={dummy_dp} style={styles.dp}></Image>
        }
        
        <View style={styles.c1}>
            <Text style={styles.name}>{society.Society_name}</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}

export default Societycard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dp: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    name: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    c1: {
        marginLeft: 10,
    },
    lasttext: {
        color: 'black',
        fontSize: 15
    }
})