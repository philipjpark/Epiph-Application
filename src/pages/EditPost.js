import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'


const EditPost = () => {
  const {id} = useParams();
  const [post, setPost] = useState({id: null, title: "", author: "", description: ""});

  const handleChange = (event) => {
      const {name, value} = event.target;
      setPost( (prev) => {
          return {
              ...prev,
              [name]:value,
          }
      });
  }

  useEffect(() => {
      async function fetchPost() {
        const { data: posts, error } = await supabase
          .from("Posts")
          .select("*")
          .eq("id", id)
          .single();
    
        if (error) {
          console.log(error);
          return;
        }
    
        if (posts) {
          setPost(posts);
        } else {
          setPost({});
        }
      }
    
      fetchPost();
    }, [id]);
      
  const updatePost = async (event) => {
      event.preventDefault();

      const { error } = await supabase
      .from("Posts")
      .update({title: post.title, author: post.author, description: post.description})
      .eq("id", id);

      if (error) {
          console.log(error);
          return;
      }
      window.location = "/";
  }

  const deletePost = async (event) => {
      event.preventDefault();
      const { error } = await supabase
      .from("Posts")
      .delete()
      .eq("id", id);

      if (error) {
          console.log(error);
          return;
      }
      window.location = "/";
  }

  return (
    <div className="EditPost">
      <h2>Make edits to your ideas!</h2>
      <form>
          <label htmlFor="title">Idea Name</label> <br />
          <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/><br />
          <br/>

          <label htmlFor="author">Ideator</label><br />
          <input type="text" id="author" name="author" value={post.author} onChange={handleChange}/><br />
          <br/>

          <label htmlFor="description">What's the idea?</label><br />
          <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
          </textarea>
          <br/>
          <input type="submit" value="Submit" onClick={updatePost} />
          <br></br>
          <button className="deleteButton" onClick={deletePost}>Delete</button>
      </form>
    </div>
  )
}

export default EditPost