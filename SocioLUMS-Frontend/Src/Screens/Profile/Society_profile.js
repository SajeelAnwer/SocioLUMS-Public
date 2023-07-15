import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native'
import React, {useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummy_dp from '../../../assets/dummy_dp.png'
import dummy_cvr from '../../../assets/dummy_cover.png'
import SocietyBotnav from '../../Components/SocietyBotnav'
import Society_Topnav from '../../Components/Society_Topnav'

const Society_profile = ({navigation}) => {
    

    const [societydata, setsocietydata] = React.useState(null)
  
        useEffect(()=>{
        AsyncStorage.getItem('society') //Asyncstorage will have local msg token user: id,email,type
        .then(async (value) => {

            fetch('https://sociolums-backend.up.railway.app/societydata', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  Society_email: JSON.parse(value).user.Society_email,
                })
            })
            .then(res => res.json())
            .then(data => {
                
                if(data.message === "Society found"){
                    //console.log("here: ",data)
                    setsocietydata(data.society)    //societydata will have id,type,pass,dp,email,name,desc,cvr from db
                }
                else{
                  //console.log("erro")
                }
            })
            .catch(err => navigation.navigate('Splash'))
        })
        .catch(err => navigation.navigate('Splash'))
    },[])

    //console.log("societydata: ", societydata)
    //here: societydata has the all data from db of loggedin email so we can use it for front end
    // dp, cvr, email, name, desc and in future posts too



    //show cover photo on the screen if none then dummy cover if yes then cover from db just like display picture
  return (
    <View style= {styles.container} >
        <StatusBar />
        <Society_Topnav navigation={navigation}/>
        <SocietyBotnav navigation={navigation} page={"Society_profile"}/>

        {
          societydata ?

            <ScrollView>

<View style={styles.c1}>
              <View   >

                {
                  societydata && societydata.Society_dp && societydata.Society_dp.length > 0 ?
                  <Image style={styles.profilepic} source={{ uri: societydata.Society_dp }} />
                  :
                  <Image style={styles.profilepic} source={dummy_dp} />
                }
              </View>
                  
                


                <Text style={styles.txt}>{societydata.Society_name}</Text>

                <View  style={styles.hr80}></View>

                {
                  societydata && societydata.Society_description && societydata.Society_description.length > 0 &&
                  <Text style={styles.description}>{societydata.Society_description}</Text>
                }
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Societysettings')}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Society_postmain')}>
                    <Text style={styles.buttonText} >Make a post</Text>
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

export default Society_profile

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CBA5B6',
    paddingVertical: 50,
},
c1: {
    // marginVertical: 50,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
},
profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,

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
    paddingHorizontal: 20,
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
    width: '0%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#e9dcf6',
    color: '#e9dcf6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    // marginBottom: 10,
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
})


  