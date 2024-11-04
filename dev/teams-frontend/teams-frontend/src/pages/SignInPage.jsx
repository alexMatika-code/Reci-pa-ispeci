import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";


// eslint-disable-next-line react/prop-types
const SignInPage = ({ signInSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        const user = {
            username,
            password
        }
        signInSubmit(user);
        return navigate('/');
    }

    return (
        <form className={'w-25 m-auto'} onSubmit={submitForm}>
            <div className="form-outline mb-4">
                <input type="username"
                       id="form2Example1"
                       className="form-control"
                       placeholder="Username"
                       required
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className="form-outline mb-4">
                <input type="password"
                       id="form2Example2"
                       className="form-control"
                       placeholder="Password"
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

            <div className="text-center">
                <p>Not a member? <Link to={'/sign-up'}>Sign up!</Link></p>
                <p>or sign up with:</p>

                <button  type="button" className="btn btn-link btn-floating mx-1">
                    <BsGoogle size={35} />
                </button>

                <button  type="button" className="btn btn-link btn-floating mx-1">
                    <BsGithub size={35} />
                </button>
            </div>
        </form>
    );
};

export default SignInPage;
