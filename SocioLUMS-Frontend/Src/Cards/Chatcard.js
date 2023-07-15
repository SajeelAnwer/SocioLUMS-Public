import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Chatcard = ({chat}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: chat.society_dp}} style={styles.dp}></Image>
      <View style={styles.c1}>
        <Text style={styles.name}>{chat.society_name}</Text>
        <Text style={styles.lasttext}>{chat.last_message}</Text>
      </View>
    </View>
  )
}

export default Chatcard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
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