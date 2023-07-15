import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../Firebase/config'
import * as ImagePicker from 'expo-image-picker'

export default function Sponsor_Changedp({navigation}) {
    
    const [loading, setloading] = useState(false);
    const [Sponsor_dp, setsponsor_dp] = useState('');

    const pickimage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        })
        // console.log(result)
        if(!result.canceled){
            const source = {uri: result.uri}    //this uri will have local directory link. problem is: if files deleted from local to uri wont find the image
            setsponsor_dp(source);
            const response = await fetch(result.uri);
            const blob = await response.blob();
            const filename = result.uri.substring(result.uri);

            //uploading on firebase or anyother cloud storage so if uri fetched again to uploaded ho image.
            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
            const url = await snapshot.ref.getDownloadURL();

            return url
        }
        else{
            return null
        }
    }

    const handlechangedp = () => {
        AsyncStorage.getItem('sponsor').then(data => {
            setloading(true)
            pickimage()
            .then(url => {
                if(url){
                    fetch('https://sociolums-backend.up.railway.app/sponsorchangedp', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Sponsor_email: JSON.parse(data).user.Sponsor_email,
                            Sponsor_dp: url,
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.message == "Image uploaded successfully"){
                            alert('Your Display Picture has been changed successfully')
                            AsyncStorage.removeItem('sponsor')
                            setloading(false)
                            navigation.navigate('Splash')
                        }
                        else if(data.error == "Error in uploading"){
                            alert('Error in uploading')
                            setloading(false)
                        }
                    })
                }
                else{
                    alert('Please Select an Image')
                    setloading(false)
                }
            })
        })
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/splash.png')} resizeMode="cover" style={styles.background}>
            

          
            {
              loading ?
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
              :
              <TouchableOpacity style={styles.button} onPress={()=>handlechangedp()}>
                <Text style={styles.buttonText}>Upload</Text>
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
