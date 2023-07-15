import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FP_Passwordchanged({navigation}) {

    const navigateToSplash =  () => { navigation.navigate('Splash')  }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../../assets/splash.png')}
          resizeMode="cover"
          style={styles.background}>
          <View style={styles.form}>
            <Text style={styles.prompt}>
              Password changed successfully
            </Text>
            <TouchableOpacity style={styles.button} onPress={navigateToSplash}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>            
        </ImageBackground>
      </View>
    );

    }


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
      },
      logo: {
        width: 120,
        height: 120,
      },
      welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
      },
      form: {
        width: '80%',
        backgroundColor: 'indigo',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginTop: 150,
      },
      prompt: {
        alignSelf:'center',
        margin: 15,
        marginLeft: 0,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFF',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        color: 'white',
      },
      buttonContainer:{
          margin:25,
          width: '40%',
          backgroundColor:'white',
          paddingVertical :15,
          borderRadius :50,
          alignSelf:'center',
       },
      button: {
        backgroundColor: '#f2f2f2',
        borderRadius: 500,
        padding: 10,
        marginTop: 10,
        width: '25%',
        alignSelf: 'center',
      },
      buttonText:{
          textAlign:'center',
          color:'black',
          paddingHorizontal: 15,
       }
    });
