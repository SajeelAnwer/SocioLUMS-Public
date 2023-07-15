import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SU_verificationcode({navigation, route}) {
    const {student_email, verificationcode, student_firstname, student_lastname, password, account_type} = route.params

    const [code, setcode] = useState('');
    const [loading, setloading] = useState(false);
    
    const handleverificationcode = () => {
      if(code != verificationcode){
        alert('Invalid Verification Code')
      }
      else if(code == verificationcode){
        setloading(true)

        fetch('https://sociolums-backend.up.railway.app/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student_email: student_email,
            student_firstname: student_firstname,
            student_lastname: student_lastname,
            password: password,
            account_type: account_type
          })
        })
        .then(res => res.json()).then(
          data => {
            if(data.message === "Account registered successfully"){
              setloading(false)
              alert(data.message)
              navigation.navigate('SU_successful')
            }
            else{
              setloading(false)
              alert("Account not registered. Please try again")
            }
          }
        )
        //navigation.navigate('SU_successful')
      }
      else{
        alert("Please Try Again")
      }
       
    }

    //const navigateToSU_successful =  () => { navigation.navigate('SU_successful')  }

    
    return (
      
      <View style={styles.container}>
        <ImageBackground source={require('../../../../assets/splash.png')} resizeMode="cover" style={styles.background}>
        <Image
          source={require('../../../../assets/SocioLUMS.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>SocioLUMS</Text>
          
          <View style={styles.form}>
            <Text style={styles.prompt}>A Code has been sent to your email</Text>
            <TextInput style={styles.input} placeholder="Enter 6 digit code" placeholderTextColor='white'
              onChangeText={(text) => {setcode(text)}}/>
          </View>

          {
            loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
            :
              <TouchableOpacity style={styles.button} onPress = {() => handleverificationcode() }>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
          }         

        </ImageBackground>
      </View>
    );

    }


    const styles = StyleSheet.create({
      container: {
        marginTop: -100,
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
        width: 200,
        height: 200,
        // marginTop: 50,
        marginBottom: -10,
      },
      title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 0,
        // marginTop: 20,
        color: 'white',
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
        marginVertical: 40,
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
        borderColor: 'white',
        color:'white',
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
