import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Sponsor_FP_Verificationcode({navigation,route}) {

    const {Sponsor_email, verificationcode} = route.params
    
    const [code, setcode] = useState('');
    const [loading, setloading] = useState(false);
    

    const handleverificationcode = () => {

      if(code != verificationcode){
        alert('Invalid Verification Code')
      }
      else if(code == verificationcode){
        setloading(true)

        //navigate to Society newp
        navigation.navigate('Sponsor_FP_NewPassword', {
          Sponsor_email: Sponsor_email,
        })
      }
      else{
        alert("Please Try Again")
      }
       
    }


    
    return (
      <View style={styles.container}>
        <ImageBackground 
            source={require('../../../../assets/splash.png')} 
            resizeMode="cover" 
            style={styles.background}>
            <View style={styles.form}>
                <Text style={styles.prompt}>
                    A verification code has been sent to your email
                </Text>
            
                <TextInput
                style={styles.input}
                placeholder="Enter code"
                placeholderTextColor="silver"
                onChangeText={text => setcode(text)}
                value={code}
                />

            </View>

            {
              loading ?
                <ActivityIndicator size="large" color="white"></ActivityIndicator>
              :
               <TouchableOpacity style={styles.button} onPress = {handleverificationcode}>
               <Text style={styles.buttonText}>Next</Text>
               </TouchableOpacity>
            } 

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
  