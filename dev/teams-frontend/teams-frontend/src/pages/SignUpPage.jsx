import {Link, useNavigate} from "react-router-dom";
import {BsGithub, BsGoogle} from "react-icons/bs";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const SignUpPage = ({signUpSubmit}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            password
        }
        signUpSubmit(user);
        return navigate('/');
    }

    return (
        <div className={"d-flex justify-content-center align-items-center"}
             style={{height: "100vh", backgroundColor: "whitesmoke"}}>
            <form className={'w-25 m-auto'} onSubmit={submitForm}>
                <h5 className={"mb-4"}>Create new account</h5>
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
                    <input type="email"
                           id="form2Example2"
                           className="form-control"
                           placeholder="Email address"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-outline mb-4">
                    <input type="password"
                           id="form2Example3"
                           className="form-control"
                           placeholder="Password"
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className={"w-100"}>
                    <button className="btn btn-primary btn-sm mb-4 w-100">Sign up</button>
                </div>

                <div className="text-center">
                    <p>Already have an account? <Link to={'/sign-in'}>Sign in!</Link></p>


                    <p>or sign up with:</p>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <BsGoogle size={35}/>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <BsGithub size={35}/>
                    </button>
                </div>
            </form>
        </div>

    );
};

export default SignUpPage;
