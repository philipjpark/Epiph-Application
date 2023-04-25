import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
// import { Link } from 'react-router-dom'
import Home from './pages/Home'
import DetailPost from './pages/DetailPost';

const App = () => {

  const posts = [
      {'id':'1', 
      'title': 'Deep Pockets 💰',
      'author':'Philip Park', 
      'description': 'An app that suggests ways to invest penny investments in non-traditional ways.'},
      {'id':'2', 
      'title': "I'm studying... T-shirt Company 👕",
      'author':'Philip Park',
      'description': 'A clothing brand that reps the classes you have completed or are taking to show the world you are a studying fiend'},
  ]
 
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path: "/home",
      element:<Home />
    },
    {
      path: "/detail/:id",
      element:<DetailPost data={posts}/>
      // element: ({id}) => <DetailPost id={id} />
    }
  ]);

  return ( 
    <div className="App">
      {element}
    </div>
  );
}

export default App;
