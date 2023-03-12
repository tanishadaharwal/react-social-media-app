import {auth, provider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
export const Login = () => {

    const navigate = useNavigate();
    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/');
    };

    return (
        <div> 
            <h2> Welcome! Sign In With Google To Continue</h2>
            <Button variant="primary" onClick={signInWithGoogle}>Sign In</Button>
        </div>
        
    )
}