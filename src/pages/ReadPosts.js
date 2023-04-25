import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [showNoIdeas, setShowNoIdeas] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('descending');

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setPosts(data);
            setShowNoIdeas(data.length === 0);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = () => {
        setSortOrder(sortOrder === 'descending' ? 'ascending' : 'descending');
      };
    
    const sortPosts = (a, b) => {
        if (sortOrder === 'ascending') {
            return a.likeCount - b.likeCount;
        } else {
            return b.likeCount - a.likeCount;
        }
    };
    
    const sortedPosts = filteredPosts.sort(sortPosts);
            
    return (
        <div className="OuterReadPosts">
        <h2 className="ReadPostsHeader">🌎 Explore the World of Ideas!</h2>
        <h4 className="ReadPostsSubHeader">Browse through the ideas below and upvote your favorites.<br /> 
            Click on an idea for more details. Give feedback or leave a message to colloaborate with an ideator!<br />
            You can also make edits to your ideas by clicking on the vertical ellipsis. <br />
            Let's start creating amazing things together! </h4>
        
        <input
            type="text"
            className="search"
            placeholder="Search by title"
            onChange={handleSearch}
        />

        <div className="SortBy">
            <span>Click to sort the ideas by like count. See who has the most upvotes or downvotes!</span>
            <button className="sort" onClick={handleSort}>
                {sortOrder === 'descending' ? '👍 Like Count' : '👎 Like Count'}
                {/* {sortOrder === 'ascending' ? '👍 Like Count' : '👎 Like Count'} */}
            </button>
        </div>

        <div className="ReadPosts">
            {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              description={post.description}
              likeCount={post.likeCount}
              created_at={post.created_at}
            />
            ))
            ) : (
            showNoIdeas && (
            <div className="NoIdeas">
                <h2>{'No Ideas Yet 😞'}</h2>
            </div>
            )
            )}
        </div>
    </div>
    );
};

export default ReadPosts;