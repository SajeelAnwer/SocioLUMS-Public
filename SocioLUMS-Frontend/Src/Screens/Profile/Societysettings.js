import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import SocietyBotnav from '../../Components/SocietyBotnav'
import Society_Topnav from '../../Components/Society_Topnav'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Societysettings = ({navigation}) => {
    const handlelogout = () => {
        AsyncStorage.removeItem('society').then(()=>{
          navigation.navigate('Splash')
        })
    }
    const handlechangepassword = () => {
        navigation.navigate('Society_Changepassword')
    }
    const changename = () => {
        navigation.navigate('Society_Changename')
    }
    const changedp = () => {
        navigation.navigate('Society_Changedp')
    }
    const changecover = () => {
        navigation.navigate('Society_Changecover')
    }
    const changedescription = () => {
        navigation.navigate('Society_Changedescription')
    }

  return (
    <View style= {styles.container}>
        <StatusBar />
        <Society_Topnav navigation={navigation}/>
        <SocietyBotnav navigation={navigation} page={"Society_profile"}/>

        <View style={styles.d}>
                <TouchableOpacity style={styles.button} onPress={()=>changedescription()}>
                    <Text style={styles.buttonText}>Update Description</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>changecover()}>
                    <Text style={styles.buttonText}>Update Cover Photo</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} onPress={()=>changedp()}>
                    <Text style={styles.buttonText}>Update Display Picture</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} onPress={()=>changename()}>
                    <Text style={styles.buttonText}>Update Name</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} onPress={()=>handlechangepassword()}>
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={()=>handlelogout()}>Log out</Text>
                </TouchableOpacity>
            </View>
    </View>
  )
  
}

export default Societysettings

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        //backgroundColor: '#B48BCD',
        backgroundColor: '#CBA5B6',
        //paddingVertical: 50,
        paddingTop: 0,
    },
    c: {
        width: '100%',
        alignItems: 'center',
    },
    c1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    d: {
        width: '100%',
        paddingTop: 100,
        alignItems: 'center',
    },
    dp: {
        width: 120,
        height: 120,
        borderRadius: 75,
        marginTop: 120,
        marginLeft: 10,
        
    },
    name : {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 130,
        marginLeft: 20,
        
    },
    email: {
        color: 'gray',
        fontSize: 15,
        marginLeft: 20,
    },
    hr80: {
        width: '80%',
        height: 1,
        backgroundColor: 'white',
        marginVertical: 20,
    },
    desc: {
        color: 'gray',
        fontSize: 15,
        marginLeft: 20,
    },
    button: {
        width: '80%',
        backgroundColor: '#e9dcf6',
        color: '#e9dcf6',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'purple',
        fontSize: 18,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },

})