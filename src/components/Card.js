import React from 'react';
import { useState, useEffect } from 'react';
import './Card.css';
import more from '../assets/more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client';


const Card = (props) =>  {
  const [count, setCount] = useState(0)
  // const [created_at, setCreated_at] = useState(null);

  const updateCount = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from('Posts')
      .update({ likeCount: count + 1 })
      .eq('id', props.id);

    if (error) {
      console.error(error);
    } else {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    const getLikeCount = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('likeCount')
        .eq('id', props.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCount(data.likeCount);
      }
    };

    getLikeCount();
  }, [props.id]);

  // useEffect(() => {
  //   const date = new Date(props.created_at);
  //   const formattedDate = date.toLocaleDateString();
  //   setCreated_at(formattedDate);
  // }, [props.created_at]);

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"Idea by: " + props.author}</h3>
          {/* <p className="description">{props.description}</p> */}
          <p className="created_at">{"Created on: " + new Date(props.created_at).toLocaleString()}</p>
          {/* <p>{"Created at: " + props.created_at}</p> */}
          <div className="buttonContainer">
            <Link to={'detail/'+ props.id}><button className="detailButton">Details</button></Link>
            <button className="likeButton" onClick={updateCount} >👍 Like: {count}</button>
          </div>
      </div>
  );
};

export default Card;