import { useEffect, useState } from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';

import {Card, Button} from 'antd';

import { deletePost, getPost } from '../services/firestore';
import { AiTwotoneEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';
import { Title } from './Title';

const PostSlug = () => {

    const {id} = useParams();
    const history = useHistory();

    const [post, setPost] = useState('');

    const removePost = async(id) =>{
        await deletePost(id);
        alert('Post successfully deleted!');
        history.push('/');
    }

    useEffect(()=>{
        const retrievePost = async() =>{
            setPost(await getPost(id));
        }

        retrievePost();

    }, [id])

    return (
        <>
            <Title title={post.title} onBack/>

            <article>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                >
                    <p>{post.content}</p>

                </Card>
            </article>

            <section>
                
                <Button>
                    <Link to={`/edit-post/${id}`}>
                        <AiTwotoneEdit />
                    </Link>
                </Button>

                <Button onClick={()=>removePost(id)}>
                    <IoTrashBin />
                </Button>

            </section>
        </>
    )
}

export default PostSlug;