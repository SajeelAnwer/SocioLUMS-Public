import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SponsorLogin({navigation, route}) {
  const {account_type} = route.params
  
  //temp variables to store and handle checks:
  const [temp, settemp] = useState('')
  //let rollnumber = temp;

 
  
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false)

  let email = temp;

  

  const handleLogin = () => {
    if(email == "" || password == ""){
      alert("Please specify all feilds")
    }
    else{
      setloading(true)
      fetch('https://sociolums-backend.up.railway.app/loginsponsor', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Sponsor_email: email,
          password: password,
          account_type: account_type,
        })
      })
      .then(res => res.json())
      .then(
        async data => {
            if(data.error === "Invalid Email Address"){
                setloading(false)
                alert('Please enter a valid Email Address not associated with LUMS')
            }
            else if(data.error === "Invalid email"){  //user not registered
                setloading(false)
                alert("Invalid email or password")
            }
            else if(data.message === "Signed in successfully"){
                setloading(false)
                await AsyncStorage.setItem('sponsor', JSON.stringify(data)) //saves msg token user: id,email,acctype in Async storage
                navigation.navigate('SponsorMain', {data})
            }
            else{
                setloading(false)
                alert("Invalid email or password")
            }
        })
    }

  }
  
  const navigateToFP_Email =  () => { navigation.navigate('Sponsor_FP_email') }


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../../assets/splash.png')} resizeMode="cover"  style={styles.background}>
        
        <View style={styles.logoContainer}>
          <Image source={require('../../../../assets/SocioLUMS.png')} style={styles.logo}/>
          <Text style={styles.welcome}>SocioLUMS</Text>
        </View>
        
        <View style={styles.form}>

          <Text style={styles.prompt}>Sponsor Email</Text>
            <TextInput style={styles.input} placeholder="Enter Sponsor Email" placeholderTextColor="gray"
              onChangeText={text => settemp(text)}/>
          
          <Text style={styles.prompt}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="gray"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}/>

          <TouchableOpacity onPress={navigateToFP_Email}>
            <Text style={{color: 'white', textAlign: 'right', marginBottom: 10, textDecorationLine: 'underline'}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          {
            loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
            :
              <TouchableOpacity style={styles.button} onPress={()=>handleLogin()}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>  
          }

        </View>
         
      </ImageBackground>
      <StatusBar style="auto" />
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  logo: {
    width: 40,
    height: 50,
    marginRight: 5,
  },
  welcome:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    width:'90%',
    borderRadius: 10,
    padding: 20,
    opacity: 0.8,
    marginTop: 100,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#99157c',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  prompt: {
    color: 'white',
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
  },
  hr80: {
    width: '80%',
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 20,
  }
});
