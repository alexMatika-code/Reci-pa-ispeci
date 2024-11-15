import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {BsGithub, BsGoogle} from "react-icons/bs";
import RecipeCard from "../components/RecipeCard.jsx";


// eslint-disable-next-line react/prop-types
const SignInPage = ({signInSubmit}) => {
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
    const googleLogin = () => {
        window.location.href = 'api/oauth2/authorization/google'
    }
    const githubLogin = () => {
        window.location.href = 'api/oauth2/authorization/github'
    }
    return (
        <div className={"d-flex justify-content-center align-items-center"} style={{height : "100vh", backgroundColor: "whitesmoke"}}>
            <form className={'w-25 form-group'} onSubmit={submitForm}>
                <h5 className={"mb-5"}>Please login to your account</h5>

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
                <div className="w-100">
                    <button className="w-100 btn btn-primary btn-sm">Sign in</button>
                </div>

                <div className="mt-4 d-flex">
                    <div className={"align-self-start"}>
                        <div className={"d-flex align-items-center justify-content-between gap-1"}>
                            <input type={"checkbox"} className={"mr-2"}/>
                            Remember me
                        </div>
                    </div>
                    <div className={"ms-auto"}>
                        <p>Not a member? <Link to={'/sign-up'}>Sign up!</Link></p>
                    </div>
                </div>
                <div className="text-center ">
                    <p>or sign up with:</p>

                    <button onClick={googleLogin} className="btn btn-link btn-floating mx-1">
                        <BsGoogle size={35}/>
                    </button>

                    <button onClick={githubLogin} className="btn btn-link btn-floating mx-1">
                        <BsGithub size={35}/>
                    </button>
                </div>
            </form>
        </div>

    );
};

export default SignInPage;
