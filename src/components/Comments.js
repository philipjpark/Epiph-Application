import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import './Comments.css';
// import { useHistory } from 'react-router-dom';

// console.log(supabase)

const Comments = ({ postId }) => {
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [comments, setComments] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    async function fetchComments() {
      const { data: comments, error } = await supabase
        .from("Comments")
        .select("*")
        // .eq("id", postId);
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setComments(comments);
      }
    }
    fetchComments();
  }, [postId]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setNewComment( (prev) => {
        return {...prev, [name]: value}
    });
  }

  const createNewComment = async (event) => {
    event.preventDefault();

    const {error} = await supabase
        .from('Comments')
        .insert({author: newComment.author, content: newComment.content, post_id: postId })
        .select();

    if (error) {
        console.log(error);
        return;
    }
    setNewComment({ author: '', content: '' });

    window.location = `/detail/${postId}`;
    // window.location = "/detail/{id}";
    // window.location = `/detail/${id}`;
    // // Use history.push to navigate programmatically
    // history.push(`/detail/${postId}`);
  }

  return (
    <div className="Comments">
    <div class="line-container"></div>
      <h2>Comments on the idea</h2>
      <ul style={{ marginRight: "0.5em" }}>
        {comments.map(comment => (
          <li key={comment.id}>
            <h3>{comment.author}</h3>
            <p>{new Date(comment.created_at).toLocaleString()}</p><br />
            <p>{comment.content}</p>
            <div class="comments-line-container"></div>
          </li>
        ))}
      </ul>

      <h2>Leave a comment</h2>
      <form onSubmit={createNewComment}>
        <label>
          Comment
          <textarea rows="5" name="content" id="content" value={newComment.content} onChange={handleChange} required></textarea>
        </label>
        <br />
        <label>
          Name
          <input type="text" name="author" id="name" value={newComment.author} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Submit Comment</button>
      </form>

    </div>
  );
};

export default Comments;