import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView, Button} from 'react-native'
import React, {useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummy_dp from '../../../assets/dummy_dp.png'
import SocietyBotnav from '../../Components/SocietyBotnav'
import Society_Topnav from '../../Components/Society_Topnav'
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';

const Society_otherprofile = ({navigation, route}) => {
    
    const {society} = route.params  //id name email dp
    // console.log(society)
    const [societydata, setsocietydata] = React.useState(null)
    
    const loaddata = ()=>{
        fetch('https://sociolums-backend.up.railway.app/getsocietydata',{
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Society_email: society.Society_email
            })
        })
        .then(res => res.json())
        .then(data=> {
            if(data.message === "Society Found"){
                setsocietydata(data.society)
            }
            else{
                alert('Society not Found')
                navigation.navigate('SocietiesList')
            }
        })
        .catch(err=>{
            alert('Something went wrong')
            navigation.navigate('SocietiesList')
        })

    }

    useEffect(()=>{
        loaddata()
    },[])

    
    
    
    
    //console.log("societydata: ", societydata)
    //here: societydata has the all data from db of loggedin email so we can use it for front end
    // dp, cvr, email, name, desc and in future posts too


    //show cover photo on the screen if none then dummy cover if yes then cover from db just like display picture
  return (
    <View style= {styles.container}>
        <StatusBar />
        <Topnavbar navigation={navigation}/>
        <Bottomnavbar navigation={navigation} page={"Society_profile"}/>

        {
          societydata ?

            <ScrollView>
              
            <View style={styles.c1}>

                {
                    societydata && societydata.Society_dp && societydata.Society_dp.length > 0 ?
                      <Image style={styles.profilepic} source={{ uri: societydata.Society_dp }} />
                    :
                      <Image style={styles.profilepic} source={dummy_dp} />
                }
                
                <View style={styles.pills}>
                  <Text style={styles.txt}>{societydata.Society_name}</Text>
                  
                </View>
                <View style={styles.hr80}></View>

                {
                  societydata && societydata.Society_description && societydata.Society_description.length > 0 &&
                  <Text style={styles.description}>{societydata.Society_description}</Text>
                }
                <TouchableOpacity style={styles.button} onPress={()=>{
                      navigation.navigate('MessagePage', {soc_id: societydata.Society_email, soc_name: societydata.Society_name, soc_dp: societydata.Society_dp, mongoid: societydata._id})
                    }}>
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
                
            </View>

            {
              societydata && societydata.Society_posts && societydata.Society_posts.length > 0 ?
                <View style={styles.c1}>
                  <View style={styles.c13}>
                    {
                      societydata.Society_posts?.map(
                        (item) => {
                          return (
                            <Image key={item.post_image} style={styles.postpic} source={{ uri: item.post_image}}/>
                          )
                        })
                    }
                  </View>
                </View>
              :
                <View style={styles.c2}>
                  <Text style={styles.txt1}>You have not posted anything yet</Text>
                </View>
            }
            
            </ScrollView>
          :
            <ActivityIndicator size="large" color="white"></ActivityIndicator>
        }
        
    </View>
)}

export default Society_otherprofile

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CBA5B6',
    paddingVertical: 50,
},
c1: {
  marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',

},
profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 50
},
txt: {
  color: 'white',
  fontSize: 30,
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 0,
  alignSelf: 'center',
},
txt1: {
    color: 'white',
    fontSize: 20,
},
txt2: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
  margin: 10,
  backgroundColor: '#111111',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20
},
c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
},
c111: {
    alignItems: 'center',
},
vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white'
},
description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 0,
    backgroundColor: '#B48BCD',
    width: '100%',
    padding: 10,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 20
},
postpic: {
    width: '30%',
    height: 120,
    margin: 5
},
c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center'
},
c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
},
refresh: {
    position: 'absolute',
    top: 50,
    right: 5,
    zIndex: 1,
},
hr80: {
    width: '00%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#e9dcf6',
    color: '#e9dcf6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
},
buttonText:{
  alignSelf: 'center',
  fontWeight: 'bold',
},
coverpic: {
  width: '50%',
  height: 20,
  marginTop: 10,
  marginBottom: 20,
  zIndex: -1
},
pills: {
  // align horizontal:
  flexDirection: 'row',

},
})

