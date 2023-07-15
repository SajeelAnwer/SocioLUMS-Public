import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SU_successful({navigation}) {

  const navigateToLogin =  () => { navigation.navigate('Loginaccounttype') }

  return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../../assets/splash.png')} resizeMode="cover" style={styles.background}>
          
          <View style={styles.form}>
            <Text style={styles.prompt}>Account created successfully</Text>

            <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
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
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: '30%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 6,
          height: 8,
        },
      },
      buttonText: {
        color: '#99157c',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
      },
    });
