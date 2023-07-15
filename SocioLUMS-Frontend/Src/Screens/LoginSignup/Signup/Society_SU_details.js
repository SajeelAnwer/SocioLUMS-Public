import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Society_SU_details({navigation, route}) {

  //temp vars to handle chekcs of lums email:
  
  const [temp, settemp] = useState('')
  //let rollnumber = temp;

  //console.log(rollnumber)

  const {account_type} = route.params
  const [societyname, setSocietyname] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setloading] = useState(false);

  let email = temp;
  
    // let start = email.length - 12;
    // console.log(email.substring(start,email.length))

  const handleSignup = () => {
    
    if(societyname == '' || email == ''|| pass == '') {
      alert("Please add all fields")
    }
    
    else {
      setloading(true);
      fetch('https://sociolums-backend.up.railway.app/verifysociety', { // Add IP
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Society_name: societyname,
          Society_email: email,
          password: pass,
        })
      })
      .then(res => res.json()).then(
        data => {
          if(data.error === "Invalid Email Address"){
            setloading(false)
            alert('Please enter a valid LUMS Society Email: xxxxxxxx@lums.edu.pk')
          }
          if(data.error === "User already exists") {
            alert('Society Account already exists')
            setloading(false)
          }
          else if(data.message === "Verification code has been sent to your email"){
            setloading(false)
            alert("Verification code has been sent to " + data.Society_email);
            navigation.navigate('Society_SU_verificationcode', {
              Society_email: data.Society_email,
              verificationcode: data.verificationcode,
              Society_name: societyname,
              password: pass,
              account_type: account_type
            })
          }


        })
    }

}
  
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../../assets/splash.png')} resizeMode="cover"  style={styles.background}>

        <View style={styles.logoContainer}>
          <Image source={require('../../../../assets/SocioLUMS.png')} style={styles.logo}/>
          <Text style={styles.welcome}>SocioLUMS</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.prompt}>Society Name</Text>
            <TextInput style={styles.input} placeholder="Enter Society name" placeholderTextColor="gray"
              onChangeText = {(text) => {setSocietyname(text)}}/>


          <Text style={styles.prompt}>Society Email</Text>
            <TextInput style={styles.input} placeholder="Enter LUMS Society Email" placeholderTextColor="gray"
              onChangeText = {(text) => {settemp(text)}}/>


          <Text style={styles.prompt}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter new password" placeholderTextColor="gray"
              secureTextEntry={true}
              onChangeText = {(text) => {setPass(text)}}/>

          {
            loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
            :
              <TouchableOpacity style={styles.button} onPress={() => handleSignup()}>
                <Text style={styles.buttonText}>Sign Up</Text>
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
    top: 40,
    left: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
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
    marginTop: 5,
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
  },
  buttonText: {
    color: '#99157c',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17
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
  }
});
