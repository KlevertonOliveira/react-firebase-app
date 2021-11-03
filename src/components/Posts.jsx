import React, { useEffect, useState } from 'react';

import Post from './Post';

import {useHistory} from 'react-router-dom';

import { deletePost, getAllPosts } from '../services/firestore';

import { useAuth } from '../contexts/AuthContext';

import {PageHeader, Button} from 'antd';

const Posts = () => {

    const {currentUser, logout} = useAuth();

    const [posts, setPosts] = useState([]);

    const history = useHistory();

    const removePost = async(id) =>{
        await deletePost(id);
        setPosts(await getAllPosts());
    }

    useEffect(()=>{
        const getPosts = async() =>{
            try{
                setPosts(await getAllPosts());
            }catch(error){
                console.log(error);
            }
        }

        getPosts();
    },[])

    const handleLogout = async() => {
        try{
            await logout();
            history.push('/login');
        }
        catch(error){
            alert('Failed to log out.')
        }
    }

    return (
        <div className='posts_container'>
            <strong>Email</strong> {currentUser.email}
            <section className="page-header_container">
            <PageHeader
                style={{border: '2px solid rgb(235, 237, 240)'}}
                title={Posts}
                extra={
                    <Button onClick={handleLogout}>Logout</Button>
                }
            />
            </section>

            <section className='articles_container'>
                {posts.length > 0 &&
                    posts.map((article, index)=>{
                        return(
                            <Post key={index} id={article.id} title={article.title} content={article.content} removePost={removePost}/>
                        )
                    })
                }
                
            </section>
        </div>
    )
}

export default Posts;