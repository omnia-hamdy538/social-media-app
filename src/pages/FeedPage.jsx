import React, { useEffect, useMemo, useState } from 'react'
// import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
// import { counterContext } from '../contexts/CounterContext'
import { deletePostApi, getAllPostsApi } from '../services/PostsServices'
import LoadingScreen from './LoadingScreen'
import Post from '../Components/Post'
import CreatePost from '../Post/CreatePost'
import { useQuery } from '@tanstack/react-query'
import {addToast, Button, Spinner} from "@heroui/react";
import useFetch from '../Hooks/useFetch'
export default function FeedPage() {
  // const {counter,setCounter}=useContext(counterContext)
  // const[isLoading,setIsLoading]=useState(true)
  // const [posts,setPosts]=useState([]);


  // async function getAllPosts(){
  //   const response =await getAllPostsApi()
  //   // setIsLoading(false)
  //   if(response.message == "success")
  //   {
  //     setPosts(response.posts)
  
  //   }
    
  // }

  

  const {data,refetch,isFetching,isLoading,isError,error}=useQuery({
    queryKey:["posts"],
    queryFn:getAllPostsApi ,
    select:(data) => data.data.posts,
    // retry:1
    retry:function (failureCount,error){
      console.log(failureCount);
      return failureCount !=3
    },
    retryDelay:function(failureCount){
      console.log( failureCount*2000)
      return failureCount*1000 
    },
    // retryOnMount:false,
    // refetchOnReconnect:true,
    // refetchOnMount:true,
    // refetchOnWindowFocus:true, 
    // refetchIntervalInBackground:false,
  //  refetchInterval:10000,
    // staleTime:5000,
    // gcTime:5000
  })
    console.log(data);



     async function deletePost(onClose,postId,setIsloading){
        setIsloading(true)
            const response =await deletePostApi(postId);

            console.log(response);
            
            if(response.message=="success")
            {
                await refetch();
                setIsloading(false)
                
                 addToast({
                  color:"success",
                  title:"post deleted successfully",
                  timeout:2000,

                 }) ;
                 onClose();
            }
            
        } 


  // useEffect(()=>{
  //   getAllPosts()
  // },[])







// const products = useFetch()
// console.log(products);




// const [count1, setCount1] = useState(0)
// const [count2, setCount2] = useState(0)
// const [even, seteven] = useState(false);
// useMemo(()=>{
//   seteven(count2&2==0)
// },[count2])
// useEffect(()=>{
//   seteven(count2%2==0)
// },[count2])
// function isEven(){
//   console.log("call");
  
//   return count2%2==0
// }
  return (
    // <div className='grid gap-3 max-w-2xl mx-auto'>
    //     <div className='grid grid-cols-2 text-center'>
    //       <div>
    //         <h1>{count1}</h1>
    //         <Button onClick={()=>setCount1(count1+1)}>increase</Button>
    //       </div>
    //        <div>
    //         <h1>{count2}</h1>
    //         <h1>counter 2 is : {even?"even" : "odd"}</h1>
    //         <Button onClick={()=>setCount2(count2+1)}>increase</Button>
    //        </div>
    //     </div>
 
    // </div>



    <div className='grid gap-3 max-w-2xl mx-auto'>
       
       <CreatePost getAllPosts={refetch}/>
        {isFetching && !isLoading && <Spinner className=' bg-gray-50  px-10 py-2 rounded-full shadow-2xl' />}
        
        {
        isLoading?<LoadingScreen/> :
        isError?
        !isFetching?
        <div className='text-center'> 
          <h1 className='text-danger  py-10'>{error.message}</h1>
          <Button onPress={refetch}>Retry</Button>
        </div>:"":
            data?.map((post) => 
            <Post 
            // getAllPosts={refetch} 
              // callback={ refetch}
              deletePost={deletePost}
              key={post.id}
              post={post}
              commentsLimit={1}/>
    )
//         data?.data.posts.map((post) => <Post getAllPosts={getAllPosts} callback={ getAllPosts} key={post.id} post={post} commentsLimit={1}/>
// )
      }
      


      
    </div>
  )
}
