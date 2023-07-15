import { StyleSheet, Text, View, StatusBar, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import React, {useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const socket = io('https://sociolums-backend.up.railway.app/')

const MessagePage = ({navigation, route}) => {
    const {soc_id, soc_name, soc_dp, mongoid} = route.params;
    const [studentdata, setStudentdata] = React.useState(null);
    const [societydata, setSocietydata] = React.useState(null);
    const [room_id, setRoom_id] = React.useState(null);
    const [chat, setChat] = React.useState('');
    useEffect(() => {
        loaddata()
    }, [])

    const loaddata = async () => {
        AsyncStorage.getItem('student') //Asyncstorage will have local msg token user: id,email,type
        .then(async (value) => {
            fetch('https://sociolums-backend.up.railway.app/studentdata', {
                method: 'POST',
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
                    setStudentdata(data.student)    //studentdata will have id,type,pass,dp,email,fname,lname from db
                    fetch('https://sociolums-backend.up.railway.app/getsocietydata',{
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Society_email: soc_id
                        })
                    })
                    .then(res => res.json())
                    .then(async data=> {
                        if(data.message === "Society Found"){
                            // console.log("Society: ", data.society)
                            setSocietydata(data.society)
                            setRoom_id(JSON.parse(value).user.student_email + soc_id)
                            socket.emit('join_room', {room_id: room_id, student_email: JSON.parse(value).user.student_email, soc_email: soc_id})
                            // socket.emit({student_email: JSON.parse(value).user.student_email,soc_email: soc_id,  room_id: room_id, message: 'join_room'})
                            
                            // loadmessages(room_id)
                        }
                        else{
                            alert('Society not Found')
                            navigation.navigate('SocietiesList')
                        }
                    })
                }
                else{
                    alert('Session Expired')
                    navigation.navigate('Splash')
                }
            })
        })}

    return (
        <View style={styles.container}>
            <View style={styles.s1}>
                {
                    societydata?.Society_dp?<Image source={ {uri: societydata?.Society_dp}} style={styles.dp}/> : <Image style={styles.dp}/>
                }
                
                    <Text style={styles.name}>{societydata?.Society_name}</Text> 
                
            </View>
            <View style={styles.sbottom}>
                <TextInput style={styles.sbottominput} placeholder='Type a message'></TextInput>
                <Text style={styles.send}>Send</Text>
            </View>
        </View>
    )
}

export default MessagePage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor:'#CBA5B6',
    },
    dp: {  
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: 'purple',
    },
    s1:{
        width: '100%',
        marginTop: 60,
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name:{
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sbottom:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginLeft: 10,
        position: 'absolute',
        bottom: 10,
    },
    sbottominput:{
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '75%',
        fontSize: 20,
        backgroundColor: 'white',
    },
    send:{
        height: 45,
        padding: 10,
        marginHorizontal: 10,
        fontSize: 15,
        color: 'white',
        backgroundColor: 'purple',
        borderRadius: 30,
    }
})