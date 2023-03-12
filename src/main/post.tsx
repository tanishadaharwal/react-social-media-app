import {Post as IPost} from "./main";
import {doc, addDoc, getDocs, deleteDoc, collection, query, where} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db , auth} from "../config/firebase";
import { useEffect, useState } from "react";

interface Props {
    post : IPost;
}
interface Likes {
    userId: string;
}

export const Post = (props : Props) => {
    const [user] = useAuthState(auth);
    const {post} = props;
    const navigate = useNavigate();
    const likesRef = collection(db, "likes");
    const [likes, setLikes] = useState<Likes[] | null>(null);
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const getLikes = async () => {
        const data= await getDocs(likesDoc);
        setLikes(data?.docs.map((doc) => ({userId: doc.data().userId})));
    };
    
    

    
    const addLike = async () => {
        await addDoc(likesRef, {userId : user?.uid, postId: post.id
            
        });

        
        getLikes();


    };
    const hasUserLiked = likes?.find((like) => 
        like.userId === user?.uid
    );
    const removeLike = async () => {
        const likeToDeleteQuery = query(likesRef,
             where("postId", "==", post.id),
             where("userId", "==", user?.uid));
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
        await deleteDoc(likeToDelete);
        getLikes();
    }
    
    useEffect(() => {
        getLikes();
    }, []);
    return (
        <div>
            <div className="title"><h1>{post.title}</h1></div>
            <div className="postBody"><p>{post.description}</p></div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={!hasUserLiked ? addLike : removeLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button> 
                {likes && <p>Likes : {likes?.length}</p>}

            </div>
            <br></br>
        </div>
    )
}