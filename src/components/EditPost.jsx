import { useEffect, useState } from "react";
import { useParams, useHistory} from 'react-router-dom';
import { editPost, getPost } from "../services/firestore";
import { Input, Button } from "antd";
import { Title } from "./Title";
const {TextArea} = Input;

const EditPost = () => {

    const {id} = useParams();
    const history = useHistory();

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const [post, setPost] = useState('');

    useEffect(()=>{
        const retrievePost = async() =>{
            setPost(await getPost(id));
        }

        retrievePost();
    }, [id])

    useEffect(()=>{
        setNewTitle(post.title);
        setNewContent(post.content);
    }, [post.content, post.title])



    const handleSubmit = async() => {
        if(newTitle === post.title && newContent === post.content){
            return alert("No changes detected.");
        }

        await editPost(id, newTitle, newContent);
        alert("Post has been edited succesfully!");
        history.push('/');
    }

    return (
        <div className='create_post_container'>
            <section className="page-header_container">
                <Title title="Edit Post"/>
            </section>

            <section className='new_post_container'>
                <div className="new_post">
                    <div className="new_post_title">
                        <h2>Post Title</h2>

                        <div className="new_post_title_input">
                            <Input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="new_post_content">
                        <h2>Post Content</h2>

                        <div className="new_post_content_input">
                            <TextArea rows={10} value={newContent} onChange={(e)=>setNewContent(e.target.value)} required/>
                        </div>
                    </div>


                    <div className="new_post_submit">
                        <Button type="primary" size='large' onClick={handleSubmit}>Edit Post</Button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default EditPost;