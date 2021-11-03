import { collection, doc, addDoc, getDocs, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { database } from '../libs/firebaseConfig';

export const savePost = async(title, content) => {
    try{
        const docRef = await addDoc(collection(database, "posts"), {
            title,
            content
        });
        
        console.log("Document written with ID: ", docRef.id);

    }catch(error){
        console.log("Error adding document: ", error);
    }
}

export const getAllPosts = async() => {
    try{
        let postsList = [];
    
        const allPosts = await getDocs(collection(database, "posts"));
    
        allPosts.forEach((doc)=>{
            let post = {
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
            }
    
            return postsList.push(post);
        })
    
        return postsList;

    }catch(error){
        console.log(error);
    }
}

export const getPost = async(id) => {
    const postRef = doc(database, "posts", id);

    const post = await getDoc(postRef);

    if(post.exists){
        return {
            id: post.id,
            title: post.data().title,
            content: post.data().content,
        }

    }else{
        console.log("No such document!");
    }
}

export const deletePost = async(id) =>{
    try{
        const postRef = doc(database, "posts", id);
        return await deleteDoc(postRef);
    }catch(error){
        return error;
    }
    
}

export const editPost = async(id, title, content) =>{
    try{
        const postsRef = collection(database, "posts");
        return (
            await setDoc(doc(postsRef, id), 
                {
                    title, 
                    content
                }
            )
        );
    }catch(error){
        return error;
    }
}