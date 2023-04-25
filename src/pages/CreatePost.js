import { useState } from "react";
import './CreatePost.css';
import { supabase } from '../client';
// import FileUpload from '../components/FileUpload';

// console.log(supabase)

const CreatePost = () => {
    const [post, setPost] = useState({title: "", author: "", description: ""});
    // const [post, setPost] = useState({title: "", author: "", description: "", image_url: "" });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {...prev, [name]: value}
        });
    }

    // const createPost = async (event) => {
    //     event.preventDefault();

    //     const {error} = await supabase
    //         .from('Posts')
    //         .insert({title: post.title, author: post.author, description: post.description})
    //         .select();

    //     if (error) {
    //         console.log(error);
    //         return;
    //     }
    //     window.location = "/";
    // }

    const createPost = async (event) => {
        event.preventDefault();
    
        const { error } = await supabase.from('Posts').insert(post).select();
    
        if (error) {
          console.log(error);
          return;
        }
        window.location = '/';
      };

    return (
        <div className="CreatePost">
            <h2>Share your idea to find collaborators!</h2>
            <form>
                <label htmlFor="title">Idea Name</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/><br />
                <br/>

                <label htmlFor="author">Ideator</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange}/><br />
                <br/>

                <label htmlfor="description">What's the idea?</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                {/* <br/>
                <FileUpload onUploadComplete={(url) => setPost((prev) => ({ ...prev, image_url: url }))} />
                <br/>
                <br/> */}
                <br/>
                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost