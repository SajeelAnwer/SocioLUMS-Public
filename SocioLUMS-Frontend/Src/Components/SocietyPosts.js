import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post_card from '../Cards/Post_card'

const SocietyPosts = ({navigation}) => {
    //email, name, dp, postimage, postdesc, postlikes, postcomments
    
    // const [societiesdata, setsocietiesdata] = React.useState([])
    //let societiesdata = []
    const [societiesdata, setSocietiesdata] = useState([]);
    const [loading, setloading] = React.useState(false)
    const [error, seterror] = React.useState(null)

    const loaddata = async ()=>{
        // setloading(true)
        fetch('https://sociolums-backend.up.railway.app/societiesdata',{
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data=>{
            if(data.error){
                console.log("here")
                seterror(data.error)
            }
            else if(data.message === "Society Found"){
                //console.log(data.soc_data)
                seterror(null)
                // setsocietiesdata(data.soc_data)
                setSocietiesdata(data.soc_data);
                //societiesdata = data.soc_data
            }
        })
        .catch(err=>{
            console.log("here2")
            // setsocietiesdata([])
            setloading(false)
        })
    }
  
    useEffect(()=>{
      loaddata()
    },[])

    

  return (

    <ScrollView style={styles.container}>
      {
        societiesdata.reverse().map((item) => {
            return item.Society_posts.reverse().map((value)=>{
                return(
                    <Post_card 
                        key={item.Society_email}
                        name={item.Society_name}
                        dp={item.Society_dp}
                        pimage={value.post_image}
                        pdesc={value.post_desc}
                        plikes={value.post_likes}
                        pcomments={value.post_comments}
                    />
                )
            })
        })
      }
    </ScrollView>
  )
}

export default SocietyPosts

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
    }
})