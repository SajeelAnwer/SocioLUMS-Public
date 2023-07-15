import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sponsor_Changedescription({navigation}) {
    
    const [loading, setloading] = useState(false);

    const [Sponsor_description, setdesc] = useState('')
    
    
    const handlechangedesc = () => {
        if(!Sponsor_description){
            alert('Please add all the fields')
        }
        else{
            setloading(true)
            AsyncStorage.getItem('sponsor').then(data => {
                fetch('https://sociolums-backend.up.railway.app/sponsorchangedescription', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Sponsor_description: Sponsor_description,
                        Sponsor_email: JSON.parse(data).user.Sponsor_email,
                      })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message === "Description updated successfully"){
                        alert('Sponsor Description has been updated successfully')
                        AsyncStorage.removeItem('sponsor')
                        setloading(false)
                        navigation.navigate('Splash')
                    }
                    else if(data.error == "Invalid Credetials"){
                        alert('Invalid Credentials')
                        setloading(false)
                        navigation.naviigate('Splash')
                    }
                    else{
                        setloading(false)
                        alert('Please Try Again')
                    }
                })
                .catch(err => {
                    setloading(false)
                    alert('Something went wrong')
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
              change Description
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Description"
              placeholderTextColor="silver"
              onChangeText={text => setdesc(text)}
              multiline= {true}
              numberOfLines={5}
            />

          </View>
          
            {
              loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
              :
              <TouchableOpacity style={styles.button} onPress={()=>handlechangedesc()}>
                <Text style={styles.buttonText}>Change Description</Text>
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
