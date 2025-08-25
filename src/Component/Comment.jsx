import React, { useContext, useState } from 'react'
import CardHeader from '../Post/CardHeader'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, addToast} from "@heroui/react";
import { authContext } from '../contexts/AuthContext';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { deleteCommentApi, updateCommentApi } from '../services/CommentServices';
import CardDropDown from './CardDropDown';
import ModalComponant from './ModalComponant';
import { queryClient } from '../App';

export default function Comment({comment}) {
  const{userData}=useContext(authContext)
  const[isCommentDelete,setIsCommentDelete]=useState(false)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const[isUpdateMode,setIsUpdateMode]=useState(false)
  const[newCommentContent,setNewCommentContent]=useState(comment.content)
  const[isUpdating,setIsUpdating]=useState(false)

  async function deleteComment(onClose){
    setIsCommentDelete(true)
    
    const response =await deleteCommentApi(comment._id);
    console.log(response);
    if(response.message=="success")
    {
      await queryClient.invalidateQueries(["posts"]);
      setIsCommentDelete(false)
      
      onClose()
      addToast({
        title:"comment deleted successfully",
        timeout:2000,
        color:"success"

      })
    }
    
  }

  async function updateComment(){
    setIsUpdating(true)
    const response =await updateCommentApi(comment._id,newCommentContent);
    console.log(response);
    if(response.message =="success")
    {
        await queryClient.invalidateQueries(["posts"]),
        
        setIsUpdating(false)
        setIsUpdateMode(false);

    }
    

  }

  return (
    <div>
        <div>
        {/* <div className="flex">
        <img onError={(e)=>e.target.src=userPhoto} className=" rounded-full w-10 h-10 mr-3" src={comment.commentCreator.photo} alt />
        <div>    
            <h3 className="text-md font-semibold ">{comment.commentCreator.name}</h3>
            <p className="text-xs text-gray-500">{comment.createdAt}</p>
        </div>
        </div> */}
        <div className="w-full h-16 flex items-center justify-between ">
          <CardHeader avatar={comment.commentCreator.photo} header={comment.commentCreator.name} subHeader={comment.createdAt}/>
         {
         comment.commentCreator._id == userData?._id && < CardDropDown setIsUpdateMode={setIsUpdateMode} onOpen={onOpen}/>
         }
      </div>
      
        {
          isUpdateMode?
            <div className='ps-12 py-2'>
                    <Input  variant="bordered" onChange={(e)=>setNewCommentContent(e.target.value)} value={newCommentContent}/>
                    <div className="flex justify-end gap-2 mt-2">
                    <Button onPress={()=>setIsUpdateMode(false)} variant="bordered" color="default ">cancel</Button>
                    <Button isDisabled={newCommentContent.trim().length<2} isLoading={isUpdating} onPress={updateComment} color="primary">update</Button>
                    </div>
              </div>
          :
            <p className='ps-12 py-2'>{comment.content}</p>
        }

        </div>


         <ModalComponant  onOpenChange={onOpenChange} isOpen={isOpen} deleteFunction={deleteComment} isDeleteState={isCommentDelete}/>

    </div>
  )
}
