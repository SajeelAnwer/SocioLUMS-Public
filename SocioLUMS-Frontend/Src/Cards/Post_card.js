import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Post_card = (
    {
        name,
        dp,
        pimage,
        pdesc,
        plikes,
        pcomments,
    }
) => {
    const [Isliked, setIsliked] = useState(false)
    const [showComments, setshowComments] = useState(false)
  return (
    <View style={styles.container}>
        <View style={styles.top_portion}> 
            <Image source={{uri: dp}} style={styles.dp}></Image>
            <Text style={styles.name}>{name}</Text>
        </View>

        <Image source={{uri: pimage}} style={styles.pimage}></Image>

        <View style={styles.bottom_portion}>
            {
                Isliked ? 
                    <View style={styles.likeIconCount}>
                        
                        <AntDesign name="heart" size={24} color="black" style={styles.heart} onPress={()=>{
                            setIsliked(false)
                        }}/>
                        <Text style={styles.liked}>{plikes.length + 1 + " Likes"}</Text>
                    </View> 
                    :
                    <View style={styles.likeIconCount}>
                        <AntDesign name="hearto" size={24} color="black" style={styles.unheart} onPress={()=>{
                            setIsliked(true)
                        }}/>
                        <Text style={styles.notliked}>{plikes.length + " Likes"}</Text>
                    </View>
            }

            <View style={styles.commenticon}>
                <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" style={styles.unheart} onPress={
                    () => {
                        setshowComments(!showComments)
                    }
                }/>
                <Text style={styles.liked}>{"Questions"}</Text>
            </View>
            
        </View>

        {
            showComments == true &&
            <View style={styles.commentbox}>
                {
                    pcomments.map((item, index)=>{
                        return(
                            <View style={styles.comments} key={item.comment_id}>
                                <Text style={styles.username}>{item.comment_name + ":"}</Text>
                                <Text style={styles.commenttext}>{item.comment}</Text>
                            </View>
                        )
                    })
                }
            </View>
        }

    </View>
  )
}

export default Post_card

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        // height: 400,
        borderRadius: 10,
        marginVertical: 5,
        overflow: 'hidden',
        //borderTopColor: 'white',
        //borderBottomColor: 'white',
        borderColor: 'white',
        borderWidth: 1.5,
    },
    top_portion: {  //s1
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B48BCD',
        //backgroundColor: '#99157c',
        padding: 10
    },
    dp: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: 'white',
        marginLeft: 2
    },
    name: {
        color: 'white',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    pimage: {
        width: '100%',
        aspectRatio: 1,
    },
    bottom_portion: {   //s2
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#B48BCD',
        padding: 10,
        alignItems: 'center',
    },
    likeIconCount: {    //s21
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    unheart: {
        color: 'white',
        fontSize: 25,
    },
    notliked: {
        color: 'white',
        marginLeft: 5,
        fontSize: 15
    },
    heart: {
        color: '#cd5447',
        fontSize: 25,
    },
    liked: {
        color: 'white',
        marginLeft: 5,
        fontSize: 15
    },
    commenticon: {  //s22
        marginLeft: 50,
        flexDirection: 'row',

    },
    commentbox: {   //s3
        width: '100%',
        backgroundColor: '#B48BCD',
        paddingBottom: 5,
    },
    comments: {     //s31
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
    },
    username: {
        color: '#99157c',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    commenttext: {
        color: 'white',
        marginLeft: 5
    },
})