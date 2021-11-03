import {Card, Button} from 'antd';
import {Link} from 'react-router-dom';

import {AiTwotoneEdit} from 'react-icons/ai';
import {IoTrashBin} from 'react-icons/io5';

const Post = ({id, title, content, removePost}) => {

    return (
        <article>
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title={title}
                extra={<Link to={`/post/${id}`}>Read More</Link>}
            >

                <p>
                    {content.length > 500 ? `${content.substring(0, 500)}...` : content}
                </p>
                <section className='post_buttons'>

                    <Button>
                        <Link to={`/edit-post/${id}`}>
                            <AiTwotoneEdit />
                        </Link>
                    </Button>

                    <Button onClick={()=>removePost(id)}>
                        <IoTrashBin />
                    </Button>

                </section>
            </Card>
        </article>
    )
}

export default Post;