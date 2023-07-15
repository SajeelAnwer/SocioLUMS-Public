import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Changename({navigation}) {
    
    const [loading, setloading] = useState(false);

    const [student_firstname, setfirstname] = useState('')
    const [student_lastname, setlastname] = useState('');
    const [password, setpassword] = useState('');
    
    const handlechangename = () => {
        if(!student_firstname || !student_lastname || !password){
            alert('Please add all the fields')
        }
        else{
            setloading(true)
            AsyncStorage.getItem('student').then(data => {
                fetch('https://sociolums-backend.up.railway.app/changename', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        student_firstname: student_firstname,
                        student_lastname: student_lastname,
                        password: password,
                        student_email: JSON.parse(data).user.student_email,
                      })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.error === "Wrong password"){
                        alert('Password Incorrect')
                        setloading(false)
                    }
                    else if(data.message === "Name changed successfully"){
                        alert('Your name has been changed successfully')
                        AsyncStorage.removeItem('student')
                        setloading(false)
                        navigation.navigate('Splash')
                    }
                    else{
                        setloading(false)
                        alert('Something went wrong')
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
              Enter new First Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter First name"
              placeholderTextColor="silver"
              onChangeText={text => setfirstname(text)}
            />

            <Text style={styles.prompt}>
              Enter new Last Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Last name"
              placeholderTextColor="silver"
              onChangeText={text => setlastname(text)}
            />

            <Text style={styles.prompt}>
              Enter your Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="silver"
              secureTextEntry = {true}
              onChangeText={text => setpassword(text)}
            />
          </View>
          
            {
              loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
              :
              <TouchableOpacity style={styles.button} onPress={()=>handlechangename()}>
                <Text style={styles.buttonText}>Change Name</Text>
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
