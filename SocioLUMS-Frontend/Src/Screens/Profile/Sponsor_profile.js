import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native'
import React, {useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummy_dp from '../../../assets/dummy_dp.png'
import SponsorBotnav from '../../Components/SponsorBotnav'
import Sponsor_Topnav from '../../Components/Sponsor_Topnav'

const Sponsor_profile = ({navigation}) => {
    
    const [sponsordata, setsponsordata] = React.useState(null)
    //console.log(sponsordata)
        useEffect(()=>{
        AsyncStorage.getItem('sponsor') //Asyncstorage will have local msg token user: id,email,type
        .then(async (value) => {

            fetch('https://sociolums-backend.up.railway.app/sponsordata', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  Sponsor_email: JSON.parse(value).user.Sponsor_email,
                })
            })
            .then(res => res.json())
            .then(data => {
                
                if(data.message === "Sponsor found"){
                    //console.log("here: ",data)
                    setsponsordata(data.sponsor)    //societydata will have id,type,pass,dp,email,name,desc,cvr from db
                }
                else{
                  console.log("error here")
                }
            })
            .catch(err => navigation.navigate('Splash'))
        })
        .catch(err => navigation.navigate('Splash'))
    },[])

  

  return (
    <View style= {styles.container}>
        <StatusBar />
        <Sponsor_Topnav navigation={navigation}/>
        <SponsorBotnav navigation={navigation} page={"Sponsor_profile"}/>

        {
          sponsordata ?

            <ScrollView>
              
            <View style={styles.c1}>

                {
                    sponsordata && sponsordata.Sponsor_dp && sponsordata.Sponsor_dp.length > 0 ?
                      
                      <Image style={styles.profilepic} source={{ uri: sponsordata.Sponsor_dp }} />
                    :
                      <Image style={styles.profilepic} source={dummy_dp} />
                }
                

                <Text style={styles.txt}>{sponsordata.Sponsor_name}</Text>

                <View style={styles.hr80}></View>

                {
                  sponsordata && sponsordata.Sponsor_description && sponsordata.Sponsor_description.length > 0 &&
                  <Text style={styles.description}>{sponsordata.Sponsor_description}</Text>
                }
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Sponsorsettings')}>
                    <Text style={styles.buttonText} >Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Sponsor_postmain')}>
                    <Text style={styles.buttonText} >Make a post</Text>
                </TouchableOpacity>
            </View>

            {
              sponsordata && sponsordata.Sponsor_posts && sponsordata.Sponsor_posts.length > 0 ?
                <View style={styles.c1}>
                 
                  <View style={styles.c13}>
                    {
                      sponsordata.Sponsor_posts?.map(
                        (item) => {
                          return (
                            <Image key={item.post_image} style={styles.postpic} source={{ uri: item.post_image }}/>
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
)
}

export default Sponsor_profile

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
},
buttonText:{
  alignSelf: 'center',
  fontWeight: 'bold',
},
    

})

