import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import Button from "react-bootstrap/Button";
export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                {!user ? <Link to="/login">Login</Link> : <Link to="/createpost">Create Post</Link>}
            </div>
            
            <div className ="user">
                {
                    user && (
                        <>
                            <p><em>{user?.displayName}</em></p>
                            <img src={user?.photoURL || ""} width="20" height="20" />
                            
                            <Button variant="outline-light" size= "sm" onClick={signUserOut}>Log Out</Button>
                            
                        </>
                    )
                }
                
            </div>
        </div>
        

    );
};