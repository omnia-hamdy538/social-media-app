import axios from "axios";
const baseUrl="https://linked-posts.routemisr.com/";


export  function addComment(commentContent,postId){
    return axios.post(baseUrl +"comments",
            {
                content:commentContent,
                post:postId
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
}





// export  function deleteCommentApi(commentId){
//     return axios.delete(baseUrl+"comments/"+ commentId,{
//             headers:{
//                 token:localStorage.getItem("token")
//             }
//         })
// }





// export  function updateCommentApi(commentId,newCommentContent){
//     return axios.put(baseUrl+"comments/"+ commentId,{
//             content:newCommentContent
//        },{
//             headers:{
//                 token:localStorage.getItem("token")
//             }
//         })
// }








// export async function addComment(commentContent,postId){
//     try{
//         const {data}=await axios.post(baseUrl +"comments",
//             {
//                 content:commentContent,
//                 post:postId
//             },{
//                 headers:{
//                     token:localStorage.getItem("token")
//                 }
//             })
//             return data;
//     }
//     catch(error){
//         return error.response ? error.response.data.error : error.message;
//     }
// }





export async function deleteCommentApi(commentId){
    try{
       const{data}= await axios.delete(baseUrl+"comments/"+ commentId,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }catch(error){
        return error.response ? error.response.data.error : error.message;
    }
}





export async function updateCommentApi(commentId,newCommentContent){
    try{
       const{data}= await axios.put(baseUrl+"comments/"+ commentId,{
            content:newCommentContent
       },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }catch(error){
        return error.response ? error.response.data.error : error.message;
    }
}







