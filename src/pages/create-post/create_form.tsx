import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {} from "yup";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateFormData {
    title: string,
    description:string,
}
export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),

    });
    const {register, handleSubmit, formState: {errors} }= useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });
    const postsRef = collection(db, "posts");
    const Submit = async (data :CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            title: data.title,
            description : data.description,
            username : user?.displayName,
            userId: user?.uid,
        })

        navigate("/");


    };
    return (
        <form onSubmit={handleSubmit(Submit)}>
            <input type="text" placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder="What's on your mind ?" {...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="submit" className="submitForm"/>
        </form>
    )
}