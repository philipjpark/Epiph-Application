import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailPost.css";
import { supabase } from "../client";
import Comments from "../components/Comments";

const DetailPost = (props) => {
  const { id } = useParams();
  const [post, setPost] = useState({ id: null, title: "", author: "", description: "" });

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
        console.log(post);
      } else {
        setPost({});
      }
    }
    fetchPost();
  }, [id, post]);

  return (
    <div className="DetailPost">
      <h2>Feeling Inspired?</h2>
      <h4>Help shape an idea by sharing your knowledge and leave an email to collaborate with the ideator.</h4>
      <div className="PostContainer">
        <ul>
          <li>
            <h3>Idea Name: </h3>
            <p>{post.title}</p>
          </li>
          <li>
            <h3>Ideator: </h3>
            <p>{post.author}</p>
          </li>
          <li>
            <h3>Details: </h3>
            <p>{post.description}</p>
          </li>
        </ul>
      </div>
        <Comments postId={id} />
    </div>
  );
  
};

export default DetailPost;