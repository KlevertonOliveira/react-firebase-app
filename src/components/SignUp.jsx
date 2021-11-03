import { Button } from "antd";
import { useRef, useState } from "react";
import { Title } from "./Title"
import { Link, useHistory} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export const SignUp = () =>{
    
    const {signUp, currentUser} = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        console.log(email, password, passwordConfirm);

        if(email === '' || password === '' || passwordConfirm ===''){
            return alert('Please, make sure to fill in all fields.');
        }
        
        else if (password !== passwordConfirm){
            return alert(`Passwords do not match.`);
        }
        
        else{
            try{
                setLoading(true);
                await signUp(email, password);
                history.push('/');
            }
            catch(error){
                alert('Failed to create an account.');
            }

            setLoading(false);
        }
    }

    return (
        <>
            <div className='signup_container'>
                <header>
                    <Title title="Sign Up"/>
                </header>
                <strong>Email:</strong>{currentUser}
            </div>

            <div>
                <section className='new_post_container'>
                    <div className="new_post">
                        <div className="new_post_title">
                            <h2>Email</h2>

                            <div className="new_post_title_input">
                                <input type="email" ref={emailRef} required/>
                            </div>
                        </div>

                        <div className="new_post_content">
                            <h2>Password</h2>

                            <div className="new_post_content_input">
                                <input type="password" ref={passwordRef} required/>
                            </div>
                        </div>

                        <div className="new_post_content">
                            <h2>Confirm Password</h2>

                            <div className="new_post_content_input">
                                <input type="password" ref={passwordConfirmRef} required/>
                            </div>
                        </div>


                        <div className="new_post_submit">
                            <Button type="primary" size='large' disabled={loading} onClick={handleSubmit}>Sign Up</Button>
                        </div>

                        <div className="new_post_submit">
                            <p>
                               Already have an account? &nbsp;
                                <Link to='/login'>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}