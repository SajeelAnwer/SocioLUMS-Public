import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Society_Changepassword({navigation}) {
    
    const [loading, setloading] = useState(false);

    const [oldpassword, setoldpassword] = useState('')
    const [password, setPassword] = useState('');
    const [Password_2, setPassword_2] = useState('');
    
    const handlepasswordchange = ()=>{
        if(!oldpassword || !password || !Password_2){
            alert('Please add all the fields')
        }
        else if(password !== Password_2){
            alert('new password must match re-entered password')
        }
        else{
            setloading(true)
            AsyncStorage.getItem('society').then(data => {
                fetch('https://sociolums-backend.up.railway.app/societychangepassword',{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldpassword: oldpassword,
                        password: password,
                        Society_email: JSON.parse(data).user.Society_email,
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message === "Passsword changed successfully"){
                        alert('Password changed successfully')
                        AsyncStorage.removeItem('society')
                        setloading(false)
                        navigation.navigate('Splash')
                    }
                    else{
                        setloading(false)
                        alert('Wrong password')
                    }
                })
            })
          
        }     
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/splash.png')}
          resizeMode="cover"
          style={styles.background}>
            
          <View style={styles.form}>
          <Text style={styles.prompt}>
              Enter your old Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="silver"
              secureTextEntry = {true}
              onChangeText={text => setoldpassword(text)}
            />

            <Text style={styles.prompt}>
              Enter your new Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="silver"
              secureTextEntry = {true}
              onChangeText={text => setPassword(text)}
            />

            <Text style={styles.prompt}>
              Re-Enter your new Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="silver"
              secureTextEntry = {true}
              onChangeText={text => setPassword_2(text)}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Society_FP_email')}>
              <Text style={{color: 'white', textAlign: 'right', marginBottom: 10, textDecorationLine: 'underline'}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          
            {
              loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
              :
              <TouchableOpacity style={styles.button} onPress={()=>handlepasswordchange()}>
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
