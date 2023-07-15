import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import Bottomnavbar from '../../Components/Bottomnavbar'
import Topnavbar from '../../Components/Topnavbar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummy_dp from '../../../assets/dummy_dp.png'

const User_profile = ({navigation}) => {
    const handlelogout = () => {
        AsyncStorage.removeItem('student').then(()=>{
            navigation.navigate('Splash')
        })
    }
    const changepasswords = () => {
        navigation.navigate('Changepasswords')
    }

    const changename = () => {
        navigation.navigate('Changename')
    }

    const changedp = () => {
        navigation.navigate('Changedp')
    }


    const [studentdata, setstudentdata] = React.useState(null)
  
    useEffect(()=>{
        AsyncStorage.getItem('student') //Asyncstorage will have local msg token user: id,email,type
        .then(async (value) => {

            fetch('https://sociolums-backend.up.railway.app/studentdata', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  student_email: JSON.parse(value).user.student_email,
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === "Student found"){
                    setstudentdata(data.student)    //studentdata will have id,type,pass,dp,email,fname,lname from db
                }
            })
            .catch(err => navigation.navigate('Splash'))
        })
        .catch(err => navigation.navigate('Splash'))
    },[])

    //console.log("studentdata: ", studentdata)



    const data = {
        user_email: "24100221@lums.edu.pk",
        user_name: "Sajeel Anwer",
        user_dp: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEUohv+72P+/2//C3f8Pf/89kP8gg/+Kuf9sqP88jv+Dtf8Zgf8jhP+VwP+cxP9Nl/+hyP/I4f91rf+pzf9bnv+31v+my/80i/8siP9+sv9ppv9GlP+v0f9Smv+PvP9lo/81ZPuBAAACKklEQVR4nO3a4ZKaMBRA4UBiFBJdcFWsVff937KwFgiCS9yObaDn+8l4Z3IkKDgKAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfBn79IjWL1jHy5ht3JDKZ8Kq3b4ZyRevXuAfMot3GTVin0Jz3DgjMuxCa344i/UrVKcojqZSqH6eO4EehbrIuiMhF1q97C7Wo1CVF200kUJrLvu7xY4WmuRw/56EW6jttbfYkcLyou29JcEWfn7e91f7ZaG5v2hDLtRiPbTYrwqtSYdHgixUH9HQCXQKrWl93r6ot/ODkSALs+Gz0RbaYrNunMpE0/vUDbpQrx+cjvYcJrK9kUvLQr2dVKG1+/HC9lBVKNTh0bsSYqHQOycgOvgUisIpjLPQC4Vq9qnc6NRd+8PCdp/K9+TDGQmzsN6n8X6nzNKrUJjbPo3jrdGr4At/71N5Lb8ZtWehSKrXyawoRyZQWO3T+Hypnu69C8t9Gken6gWTKLQiTm+/XngXCnXeHG/X5BQKy8T61HgXNr/oTKOw8UxhPTKLwu49zd3I9AttkW1q2WqOhf1ni+7IDApHRigMC4VDIxSGZbjQOvojcyi8vDWSXuIcChe5rOXLWX7j/w/3pRRSGBAKKaTw36NwBoVX2coH7tpS0xtZ5c5I8IW2SBz1UedQ0X+4OLojx7+63O8Y+9/e8//rAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgG34BSb8cFkfMnG4AAAAASUVORK5CYII=",

    }


  return (
    <View style= {styles.container}>
        <StatusBar />
        <Topnavbar navigation={navigation}/>
        <Bottomnavbar navigation={navigation} page={"User_profile"}/>

        {
            studentdata ?
            <View>
            <View style={styles.c}>
                <View style={styles.c1}>
                    {
                        studentdata && studentdata.student_dp && studentdata.student_dp.length > 0 ?
                            <Image style={styles.dp} source={{uri: studentdata.student_dp}} ></Image>
                        :
                            <Image style={styles.dp} source={dummy_dp} ></Image>
                    }
                    
                    <View>
                        <Text style={styles.name}>{studentdata.student_firstname + " " + studentdata.student_lastname}</Text>
                        <Text style={styles.email}>{studentdata.student_email}</Text>
                    </View>
                </View>
                <View style={styles.hr80}></View>
            </View>

            <View style={styles.d}>
                
    
                <TouchableOpacity style={styles.button} onPress={()=>changedp()}>
                    <Text style={styles.buttonText}>Update Display Picture</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} onPress={()=>changename()}>
                    <Text style={styles.buttonText}>Update Name</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={()=>changepasswords()}>Update Password</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={()=>handlelogout()}>Log out</Text>
                </TouchableOpacity>
            </View>
            </View>
            :
                <ActivityIndicator size="large" color="white"></ActivityIndicator>
        }
        
    </View>
  )
}

export default User_profile

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
        marginTop: 25,
        width: '100%',
        // flexDirection: 'row',
        alignItems: 'center',

    },
    d: {
        width: '100%',
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
        marginTop: 30,
        marginBottom: 10,
        alignSelf: 'center',
    },
    email: {
        color: 'gray',
        fontSize: 15,
    },
    hr80: {
        width: '0%',
        height: 0,
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
        marginVertical: 15,
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
