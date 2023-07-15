import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../Firebase/config'
import * as ImagePicker from 'expo-image-picker'

export default function Sponsor_postmain({navigation}) {
    
    const [loading1, setloading1] = useState(false);
    const [loading2, setloading2] = useState(false);

    const [post_image, setpostimage] = useState('')
    const [post_description, setdesc] = useState('')
    
    const pickimage = async () => {
        setloading1(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,5],
            quality: 1,
        })
        // console.log(result)
        if(!result.canceled){
            const source = {uri: result.uri}    //this uri will have local directory link. problem is: if files deleted from local to uri wont find the image
            
            const response = await fetch(result.uri);
            const blob = await response.blob();
            const filename = result.uri.substring(result.uri);

            //uploading on firebase or anyother cloud storage so if uri fetched again to uploaded ho image.
            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
            const url = await snapshot.ref.getDownloadURL();

            setloading1(false)
            setpostimage(url);
        }
        else{
            setloading1(false)
            setpostimage(null)
        }
    }

    const handleupload = () =>{
        if(!post_image || !post_description){
            alert('Please add all the fields')
        }
        else{
            AsyncStorage.getItem('sponsor').then(data =>{
                setloading2(true)
                fetch('https://sociolums-backend.up.railway.app/sponsoruploadpost',{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Sponsor_email: JSON.parse(data).user.Sponsor_email,
                        post_image: post_image,
                        post_description: post_description,
                    })
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.message === "Post made successfully"){
                        alert('post added successfully')
                        setloading2(false)
                        navigation.navigate('Splash')
                    }
                    else{
                        alert('Something went wrong, Please try again')
                        setloading2(false)
                    }
                })
            })
        }
        
    }


    

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/splash.png')} resizeMode="cover" style={styles.background}>
            
            {
                loading1 ?
                    <ActivityIndicator size="large" color="white"></ActivityIndicator>
                :
                    <>
                        <Text style={styles.buttonText}>Add Image</Text>
                         {
                            post_image ?
                                <TouchableOpacity onPress={()=>pickimage()}>
                                    <Image source={{uri:post_image}} style={{width:200, height:300, marginVertical: 10}} ></Image>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity style={styles.button} onPress={()=>pickimage()}>
                                    <Text style={styles.buttonText}>Upload</Text>
                                </TouchableOpacity>
                         }
                    </>
            }



            <View style={styles.form}>
                <Text style={styles.prompt}> Add Post Description </Text>
                <TextInput style={styles.input} placeholder="Enter Description" placeholderTextColor="silver"
                onChangeText={text => setdesc(text)} multiline= {true} numberOfLines={3}/>

            </View>
          
            {
                loading2 ?
                    <ActivityIndicator size="large" color="white"></ActivityIndicator>
                :
                    <TouchableOpacity style={styles.button} onPress={()=>handleupload()}>
                        <Text style={styles.buttonText}>Upload the post</Text>
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
