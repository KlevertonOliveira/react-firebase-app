import { useState } from "react";
import {useHistory} from 'react-router-dom';
import { savePost } from "../services/firestore";
import { Input, Button } from "antd";
import { Title } from "./Title";
const {TextArea} = Input;

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const history = useHistory();

    const handleSubmit = async() => {
        await savePost(title, content);
        alert('Post successfully created!')
        history.push('/');
    }

    return (
        <div className='create_post_container'>
            <section className="page-header_container">
                <Title title="Create Post"/>
            </section>

            <section className='new_post_container'>
                <div className="new_post">
                    <div className="new_post_title">
                        <h2>Post Title</h2>

                        <div className="new_post_title_input">
                            <Input value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="new_post_content">
                        <h2>Post Content</h2>

                        <div className="new_post_content_input">
                            <TextArea rows={10} value={content} onChange={(e)=>setContent(e.target.value)} required/>
                        </div>
                    </div>


                    <div className="new_post_submit">
                        <Button type="primary" size='large' onClick={handleSubmit}>Create Post</Button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default CreatePost;