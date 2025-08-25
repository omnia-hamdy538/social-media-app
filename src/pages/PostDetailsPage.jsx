
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../services/PostsServices';
import Post from '../Component/Post';
import LoadingScreen from './LoadingScreen';
export default function PostDetailsPage() {
  
 const {id}=useParams()
  // console.log(id);
  
    const [post,setPost]=useState(null)

    async function getSinglePost(){

        const response =await getSinglePostApi(id)
        console.log(response);
        if(response.message=="success")
        {
            setPost(response.post);
        }
        
    }
    useEffect(()=>{
        getSinglePost()
    },[])



  return (
    <div className='max-w-3xl mx-auto'>
      {post?<Post post={post}/>:<LoadingScreen/>}
    </div>
  )
}
