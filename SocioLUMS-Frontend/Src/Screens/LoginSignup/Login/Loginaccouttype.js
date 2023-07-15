import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Loginaccounttype({navigation}) {  
  
  const [accountType, setAccountType] = useState('');

  const handleaccounttype = () => {
    if(accountType == ""){
      alert("Please Specify Your Account Type")
    }
    else if(accountType == "Student"){
      navigation.navigate('Login', {
        account_type: accountType
      })
    }
    else if(accountType == "Society"){
      navigation.navigate('Society_login', {
        account_type: accountType
      })
    }
    else if(accountType == "Sponsor"){
      navigation.navigate('Sponsor_login', {
        account_type: accountType
      })
    }
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/splash.png')}
        resizeMode="cover" 
        style={styles.background}>
        
        <Text style={styles.title}>SocioLUMS</Text>
        <Image source={require('../../../../assets/SocioLUMS.png')} style={styles.logo}/>

        <View style={styles.form}>
          
          <Text style={styles.prompt}>Account Type</Text>
          <Picker
            selectedValue={accountType}
            onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}
            style={[styles.picker, styles.pickerContainer]} placeholderTextColor="Account type">
            
            <Picker.Item label="Select your account type" value="" />
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Society" value="Society" />
            <Picker.Item label="Sponsor" value="Sponsor" />
          </Picker>

          <TouchableOpacity style={styles.button} onPress={handleaccounttype}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>    
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 20,
    color: 'white',
  },
  logo: {
    width: 350,
    height: 250,
    marginBottom: 230,
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
    // // elevation: 5,
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
