import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Bottomnavbar from '../../Components/Bottomnavbar'
import Topnavbar from '../../Components/Topnavbar'
import SocietyPosts from '../../Components/SocietyPosts';
import Societycard from '../../Cards/Societycard';


const SocietiesList = ({navigation}) => {

    
    
    const [keyword, setkeyword] = useState('')
    const [loading, setloading] = useState(false)
    const [Society_data, setsocietydata] = useState([])
    const [error, seterror] = useState(null)

    const getsocieties = async () => {
        // if(keyword.length > 0){

        
        setloading(true)
        fetch('https://sociolums-backend.up.railway.app/searchsociety', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword: keyword
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                setsocietydata([])
                seterror(data.error)
                setloading(false)
            }
            else if(data.message === "Society Found"){
                seterror(null)
                setsocietydata(data.society)
                setloading(false)
            }
            
        })
        .catch(err=>{
            setsocietydata([])
            setloading(false)
        })
    // }
    // else{
    //     setsocietydata([])
    //     seterror(null)
    // }

    }

    useEffect(() => {
        getsocieties()
    }, [keyword])

  return (
    <View style= {styles.container}>
        <StatusBar />
        <Topnavbar navigation={navigation}/>
        <Bottomnavbar navigation={navigation} page={"SocietiesList"}/>
      
        <TextInput placeholder='Search Societies' style={styles.searchbar} 
        onChangeText={(text)=>setkeyword(text)}></TextInput>
    
        {
            loading ?
                <ActivityIndicator size="large" color="white"></ActivityIndicator>
            :
                <>
                {
                    error ?
                    <Text style={styles.formHead}>{error}</Text>
                    :
                    <ScrollView style={styles.societylist}>
                    {
                        Society_data.map((item, index) => {
                            return <Societycard style={styles.soc_card} key={item.Society_email} society={item} navigation={navigation}/>
                        })
                    }
                    </ScrollView>
                }
                </>
        }

    </View>
  )
}

export default SocietiesList

const styles = StyleSheet.create({
  containerFull: {
        width: '100%',
        height: '100%',
        backgroundColor: '#B48BCD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formHead: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor: 'white',
    },
    container: {
        width: '100%',
        height: '100%',
        //backgroundColor: '#B48BCD',
        backgroundColor: '#CBA5B6',
        //paddingVertical: 100,
        paddingTop: 85,
    },
    searchbar: {
        marginVertical: 40,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // marginTop: 10,
        fontSize: 17,
        alignSelf: 'center',
    },
    societylist: {
        
        width: '90%',
        // marginTop: 20,
        alignSelf: 'center',
    },
})