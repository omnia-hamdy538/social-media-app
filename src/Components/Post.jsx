import React, { useContext, useState } from 'react'
import Comment from './Comment'
import CardHeader from '../Post/CardHeader'
import PostBody from '../Post/PostBody'
import PostFooter from '../Post/PostFooter'
import PostActions from '../Post/PostActions'
import { Button, Input } from '@heroui/react'
import { addComment } from '../services/CommentServices'
import CreatePost from '../Post/CreatePost'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { authContext } from '../contexts/AuthContext'
// import { deletePostApi } from '../services/PostsServices'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import CardDropDown from './CardDropDown'
import ModalComponant from './ModalComponant'
import  {useMutation} from "@tanstack/react-query"
import { queryClient } from '../App'
export default function Post({post,commentsLimit,deletePost}) {
    const[visibleComment,setVisibleComment]=useState(2)
    const[isloading,setIsloading]=useState(false)
    const[commentContent,setCommentContent]=useState("")
    // const[isCommentSubmit,setIsCommentSubmit]=useState(false)
    const {userData}=useContext(authContext)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const{mutate:handleAddComment,isPending}=useMutation({
        mutationFn:()=> addComment(commentContent,post._id),
        onSuccess :(data)=> {
            console.log(data);
             setCommentContent("")
            //  callback()
                queryClient.invalidateQueries(["posts"])
        },
        onError:(error) => {
            console.log(error);
            
        },

    })

    function handleLoadMoreComments(){
        setIsloading(true);
        setTimeout(()=>{
            setVisibleComment(visibleComment+2)
            setIsloading(false)
        },200)
       
    }
    // async function handleCommentSubmit(){
    //     // console.log(commentContent);
    //     // setIsCommentSubmit(true)
    //     // const response=await addComment(commentContent,post.id);
    //     // console.log(response);
    //     // await callback()
    //     // setCommentContent("")
    //     // setIsCommentSubmit(false)
        
    // }


  return (
        <div>
           
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
    <div className="w-full h-16 flex items-center justify-between ">
        {/* <div className="flex">
        <img className=" rounded-full w-10 h-10 mr-3" src={post.user.photo} alt />
        <div>    
            <h3 className="text-md font-semibold ">{post.user.name}</h3>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
        </div>
        </div> */}
        <CardHeader avatar={post.user.photo} header={post.user.name} subHeader={post.createdAt}/>
    
        {
         post.user._id==userData?._id && <CardDropDown onOpen={onOpen}/>
        }
    </div>

    {/* {post.body && <p>{post.body}</p>}
    {post.image && <img src={post.image} className='w-full h-100 object-cover mt-2' alt="" />} */}
    <PostBody caption={post.body} image={post.image}/>

    {/* <div className="w-full h-8 flex items-center px-3 my-3">
        <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
        <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
        </div>
        <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
        <svg className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
        </div>
        <div className="w-full flex justify-between">
        <p className="ml-3 text-gray-500">8</p>
        <p className="ml-3 text-gray-500">{post.comments.length} comment</p>
        </div>
    </div> */}
<PostFooter numOfComments={post.comments.length}/>
    {/* <div className="grid grid-cols-3 w-full px-5 my-3 border-t border-divider pt-4">
        <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
        <span className="font-semibold text-lg text-gray-600">Like</span></button>
        <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        <span className="font-semibold text-lg text-gray-600">Comment</span></button>
        <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
        <span className="font-semibold text-lg text-gray-600">Share</span></button>
    </div> */}
    <PostActions postId={post.id}/>
        {/* {post.comments[0] && <Comment comment={post.comments[0]}/>} */}
        <div className="flex my-4">
            <Input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} className='pe-0' variant="bordered" placeholder='comment...'
                onKeyDown={(e)=> {
                if(e.key=="Enter")
                {
                    handleAddComment()
                }
            }}/>
            <Button isDisabled={commentContent.trim().length<2}  isLoading={isPending} onPress={handleAddComment} className='text-white bg-blue-600 hover:bg-blue-700'>comment</Button> 
        
        </div>
        {post.comments.slice(0,commentsLimit ?? visibleComment).map((comment)=> <Comment  key={comment._id} comment={comment}/>)}
        {!commentsLimit && post.comments.length > visibleComment && <Button isLoading={isloading} onPress={()=> handleLoadMoreComments()} className='block mx-auto' variant='faded'>see more!</Button>}

    </div>

          {/* <Button onPress={onOpen}>Open Modal</Button> */}
         <ModalComponant 
         onOpenChange={onOpenChange}
          isOpen={isOpen} 
          deleteFunction={()=>deletePost(onclose,post._id,setIsloading)}
           isDeleteState={isloading}/>


    </div>
  )
}
