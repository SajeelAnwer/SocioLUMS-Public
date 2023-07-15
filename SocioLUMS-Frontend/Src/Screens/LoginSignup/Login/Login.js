import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation, route}) {
  const {account_type} = route.params
        //console.log(account_type)
  //temp variables to store and handle checks:
  const [temp, settemp] = useState('')
  let rollnumber = temp;

 
  
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false)

  var email = rollnumber + "@lums.edu.pk";

  

  const handleLogin = () => {
    if(email == "" || password == "" || account_type == ""){
      alert("Please specify all feilds")
    }
    else{
      setloading(true)
      fetch('https://sociolums-backend.up.railway.app/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_email: email,
          password: password,
          account_type: account_type,
          rollnumber: rollnumber
        })
      })
      .then(res => res.json())
      .then(
        async data => {
          if(data.error === "Invalid rollnumber"){  //checks 8 digit
            setloading(false)
            alert('Please enter a registered LUMS rollnumber')
          }
          else if(data.error === "Invalid email"){  //checks wrong rollnumber or pass but with 8 digits
            setloading(false)
            alert("Invalid rollnumber or password")
          }
          else if(data.message === "Signed in successfully"){
            setloading(false)
            await AsyncStorage.setItem('student', JSON.stringify(data)) //saves msg token user: id,email,acctype in Async storage
            //console.log("here:" ,account_type)
            navigation.navigate('StudentMain', {data})
          }
          else{
            setloading(false)
            alert("Invalid rollnumber or password")
          }
        })
    }

  }
  
  // const navigateToFP_Email =  () => { navigation.navigate('FP_Email') }


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../../assets/splash.png')} resizeMode="cover"  style={styles.background}>
        
        <View style={styles.logoContainer}>
          <Image source={require('../../../../assets/SocioLUMS.png')} style={styles.logo}/>
          <Text style={styles.welcome}>SocioLUMS</Text>
        </View>
        
        <View style={styles.form}>

          <Text style={styles.prompt}>LUMS ID</Text>
            <TextInput style={styles.input} placeholder="e.g: 24xxxxxx" placeholderTextColor="gray"
              onChangeText={text => settemp(text)}/>
          
          <Text style={styles.prompt}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="gray"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}/>

          <TouchableOpacity onPress={() => navigation.navigate('FP_Email')}>
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 6,
    //   height: 8,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
