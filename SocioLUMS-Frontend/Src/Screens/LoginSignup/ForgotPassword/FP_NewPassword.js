import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FP_NewPassword({navigation,route}) {
    
    const {student_email} = route.params
    const [loading, setloading] = useState(false);

    const [Password, setPassword] = useState('');
    const [Password_2, setPassword_2] = useState('');
    const handlenewpassword = () => {
      // handle login logic here

      if (Password == '') {

        alert("please add all fields")

      } else if (Password!=Password_2) {
        alert("Paswords don't match. Pleae try again")
      

      } else {
        // console.log(email)
        setloading(true);
        fetch('https://sociolums-backend.up.railway.app/forgotpassword', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // student_firstname: firstname,
            // student_lastname: lastname,
            student_email: student_email,
            password: Password
          })
        })
        .then(res => res.json()).then(
          data => {
            // console.log(email)
            if(data.error === "Invalid Email") {
              alert('Invalid Email')
              setloading(false)
              console.log("user does not exist")
            }
            else if(data.message === "Pasword changed sucessfully!"){
              setloading(false)
              alert(data.message);
              navigation.navigate('FP_Passwordchanged', {
                student_email: data.student_email,
                verificationcode: data.verificationcode,
                // student_firstname: firstname,
                // student_lastname: lastname,
                // password: pass,
                // account_type: account_type
              })
            }
  
  
          })
      }
       
    }

    // const navigateToFP_Passwordchanged =  () => { navigation.navigate('FP_Passwordchanged')  }

    
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../../assets/splash.png')}
          resizeMode="cover"
          style={styles.background}>
          <View style={styles.form}>
            <Text style={styles.prompt}>
              Enter your new Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="silver"
              secureTextEntry = {true}
              onChangeText={text => setPassword(text)}
              value={Password}
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
              value={Password_2}
            />
          </View>
            {
              loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
              :
              <TouchableOpacity style={styles.button} onPress = {handlenewpassword}>
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
